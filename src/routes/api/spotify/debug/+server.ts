import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export async function GET() {
    try {
        const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = env;

        const hasVars = {
            clientId: !!SPOTIFY_CLIENT_ID,
            clientSecret: !!SPOTIFY_CLIENT_SECRET,
            refreshToken: !!SPOTIFY_REFRESH_TOKEN,
            clientIdLen: SPOTIFY_CLIENT_ID?.length ?? 0,
            clientSecretLen: SPOTIFY_CLIENT_SECRET?.length ?? 0,
            refreshTokenLen: SPOTIFY_REFRESH_TOKEN?.length ?? 0
        };

        if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
            return json({ stage: 'missing_env', ...hasVars });
        }

        let tokenData: Record<string, unknown>;
        try {
            const credentials = btoa(`${SPOTIFY_CLIENT_ID.trim()}:${SPOTIFY_CLIENT_SECRET.trim()}`);
            const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${credentials}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    grant_type: 'refresh_token',
                    refresh_token: SPOTIFY_REFRESH_TOKEN.trim()
                })
            });
            tokenData = await tokenResponse.json();
        } catch (e) {
            return json({ stage: 'token_fetch_threw', error: String(e), hasVars });
        }

        if (!tokenData.access_token) {
            return json({ stage: 'token_failed', error: tokenData.error, description: tokenData.error_description, hasVars });
        }

        let recentStatus: number;
        let firstTrack: string | null = null;
        let tokenScope: unknown;
        try {
            const recentResponse = await fetch(
                'https://api.spotify.com/v1/me/player/recently-played?limit=1',
                { headers: { Authorization: `Bearer ${tokenData.access_token}` } }
            );
            recentStatus = recentResponse.status;
            tokenScope = tokenData.scope;
            if (recentResponse.ok) {
                const data = await recentResponse.json() as { items?: Array<{ track: { name: string } }> };
                firstTrack = data?.items?.[0]?.track?.name ?? null;
            } else {
                firstTrack = await recentResponse.text();
            }
        } catch (e) {
            return json({ stage: 'recent_fetch_threw', error: String(e), tokenScope: tokenData.scope, hasVars });
        }

        return json({ stage: 'done', tokenScope, recentStatus: recentStatus!, firstTrack, hasVars });
    } catch (e) {
        return json({ stage: 'outer_catch', error: String(e) });
    }
}
