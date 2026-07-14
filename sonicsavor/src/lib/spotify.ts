/**
 * Integrates with the Spotify Web API.
 * Uses Client Credentials Flow to authenticate and search for playlists.
 */

// Fallback embed playlist URL (e.g., Chill Lofi Beats / Acoustic)
const FALLBACK_SPOTIFY_EMBED_URL =
  "https://open.spotify.com/embed/playlist/37i9dQZF1DWXRqgorJj26U?utm_source=generator";

// Cached access token
let cachedToken: { token: string; expiresAt: number } | null = null;

/**
 * Gets a Spotify access token using Client Credentials Flow.
 * Caches the token until it expires.
 */
async function getAccessToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET must be set");
  }

  // Return cached token if still valid (with 60s buffer)
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) {
    return cachedToken.token;
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Spotify token request failed (${res.status}): ${body}`);
  }

  const data = await res.json();
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  console.log(`[Spotify] Access token obtained. Expires in ${data.expires_in}s.`);
  return cachedToken.token;
}

export interface SpotifySearchResult {
  embedUrl: string;
  playlistId: string;
  playlistName: string;
}

/**
 * Searches for a Spotify playlist matching a mood-driven query.
 * Returns the Spotify embed player URL and playlist ID.
 *
 * @param query Search query derived from user mood (e.g. "acoustic chill cozy evening")
 * @returns A promise resolving to SpotifySearchResult with embedUrl and playlistId.
 */
export async function searchSpotifyPlaylist(query: string): Promise<SpotifySearchResult> {
  console.log(`[Spotify] Searching playlist for query: "${query}"`);

  const fallbackId = "37i9dQZF1DWXRqgorJj26U";
  const fallback: SpotifySearchResult = {
    embedUrl: `${FALLBACK_SPOTIFY_EMBED_URL}`,
    playlistId: fallbackId,
    playlistName: "Chill Lofi Beats",
  };

  try {
    // 1. Get access token
    const token = await getAccessToken();

    // 2. Search for playlists
    const searchRes = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=playlist&limit=5`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!searchRes.ok) {
      const body = await searchRes.text();
      throw new Error(`Spotify search failed (${searchRes.status}): ${body}`);
    }

    const searchData = await searchRes.json();
    const playlists = searchData.playlists?.items;

    if (!playlists || playlists.length === 0) {
      console.warn(`[Spotify] No playlists found for "${query}". Using fallback.`);
      return fallback;
    }

    // 3. Pick the best playlist (first result)
    const playlist = playlists[0];
    const embedUrl = `https://open.spotify.com/embed/playlist/${playlist.id}?utm_source=generator`;

    console.log(`[Spotify] Found playlist: "${playlist.name}" (${playlist.id})`);
    return {
      embedUrl,
      playlistId: playlist.id,
      playlistName: playlist.name,
    };
  } catch (error) {
    console.error("[Spotify] Error searching playlist. Falling back to mock embed.", error);
    return fallback;
  }
}
