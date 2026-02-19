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

        // 1. Try fetching 'currently-playing' for real-time status
        const currentResponse = await fetch(
            'https://api.spotify.com/v1/me/player/currently-playing',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        let track;
        let playedAt = new Date().toISOString(); // Default to 'now' for current track

        if (currentResponse.ok && currentResponse.status !== 204) {
            const data = await currentResponse.json();
            // Check if it's a track (episode type might differ)
            if (data.item && data.item.type === 'track') {
                track = data.item;
            }
        }

        // 2. Fallback to 'recently-played' if nothing is currently playing
        if (!track) {
            const recentResponse = await fetch(
                'https://api.spotify.com/v1/me/player/recently-played?limit=1',
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );

            if (recentResponse.ok) {
                const data = await recentResponse.json();
                if (data.items && data.items.length > 0) {
                    track = data.items[0].track;
                    playedAt = data.items[0].played_at;
                }
            }
        }

        if (!track) {
            return json(null);
        }

        return json({
            name: track.name,
            artist: track.artists.map((a: { name: string }) => a.name).join(', '),
            albumArt: track.album.images[0]?.url ?? null,
            url: track.external_urls.spotify,
            playedAt: playedAt
        });
    } catch {
        return json(null);
    }
}
