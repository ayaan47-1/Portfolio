import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export async function GET() {
    const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = env;

    const hasVars = {
        clientId: !!SPOTIFY_CLIENT_ID,
        clientSecret: !!SPOTIFY_CLIENT_SECRET,
        refreshToken: !!SPOTIFY_REFRESH_TOKEN,
        clientIdLen: SPOTIFY_CLIENT_ID?.length ?? 0,
        refreshTokenLen: SPOTIFY_REFRESH_TOKEN?.length ?? 0
    };

    if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
        return json({ stage: 'missing_env', ...hasVars });
    }

    const credentials = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: SPOTIFY_REFRESH_TOKEN
        })
    });

    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) {
        return json({ stage: 'token_failed', status: tokenResponse.status, error: tokenData.error, hasVars });
    }

    const recentResponse = await fetch(
        'https://api.spotify.com/v1/me/player/recently-played?limit=1',
        { headers: { Authorization: `Bearer ${tokenData.access_token}` } }
    );
    const recentStatus = recentResponse.status;
    const recentData = recentResponse.ok ? await recentResponse.json() : await recentResponse.text();

    return json({
        stage: 'done',
        tokenScope: tokenData.scope,
        recentStatus,
        recentItems: Array.isArray(recentData?.items) ? recentData.items.length : 'N/A',
        firstTrack: recentData?.items?.[0]?.track?.name ?? null,
        hasVars
    });
}
