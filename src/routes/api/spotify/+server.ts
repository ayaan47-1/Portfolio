import { json } from '@sveltejs/kit';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } from '$env/static/private';

async function getAccessToken(): Promise<string> {
    const credentials = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);

    const response = await fetch('https://accounts.spotify.com/api/token', {
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

    const data = await response.json();
    return data.access_token;
}

export async function GET() {
    try {
        const accessToken = await getAccessToken();

        const response = await fetch(
            'https://api.spotify.com/v1/me/player/recently-played?limit=1',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        if (!response.ok) {
            return json(null);
        }

        const data = await response.json();
        const item = data?.items?.[0];

        if (!item) {
            return json(null);
        }

        const track = item.track;

        return json({
            name: track.name,
            artist: track.artists.map((a: { name: string }) => a.name).join(', '),
            albumArt: track.album.images[0]?.url ?? null,
            url: track.external_urls.spotify,
            playedAt: item.played_at
        });
    } catch {
        return json(null);
    }
}
