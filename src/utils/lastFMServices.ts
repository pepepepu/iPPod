import { homeContent, type TrackItem } from '../content/homeContent';

interface LastFmImage {
  '#text': string;
  size: 'small' | 'medium' | 'large' | 'extralarge';
}

interface LastFmTrack {
  name: string;
  artist: {
    '#text': string;
  };
  album: {
    '#text': string;
  };
  image: LastFmImage[];
  url: string;
}

interface LastFmRecentTracksResponse {
  recenttracks?: {
    track?: LastFmTrack[] | LastFmTrack;
  };
}

export async function fetchLastFmCurrentTrack(): Promise<TrackItem> {
  const fallbackTrack: TrackItem = {
    ...homeContent.tracks[0],
    number: 'Faixa 01 de 01',
    isLiveNow: true,
  };

  const apiKey = import.meta.env.VITE_LASTFM_API_KEY as string | undefined;
  const username = import.meta.env.VITE_LASTFM_USERNAME as string | undefined;

  if (!apiKey || !username) {
    return fallbackTrack;
  }

  try {
    const endpoint = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(
      username
    )}&api_key=${encodeURIComponent(apiKey)}&format=json&limit=1`;

    const response = await fetch(endpoint);
    if (!response.ok) {
      return fallbackTrack;
    }

    const data = (await response.json()) as LastFmRecentTracksResponse;
    const rawTracks = data.recenttracks?.track;

    if (!rawTracks) {
      return fallbackTrack;
    }

    const latestTrack = Array.isArray(rawTracks) ? rawTracks[0] : rawTracks;

    if (!latestTrack || !latestTrack.name) {
      return fallbackTrack;
    }

    const extraLargeImg =
      latestTrack.image?.find((img) => img.size === 'extralarge')?.['#text'] ||
      latestTrack.image?.find((img) => img.size === 'large')?.['#text'] ||
      '';

    return {
      id: `lfm-latest-${latestTrack.name}`,
      number: 'Faixa 01 de 01',
      title: latestTrack.name,
      artist: latestTrack.artist?.['#text'] || 'Artista Desconhecido',
      album: latestTrack.album?.['#text'] || 'Single / Spotify',
      duration: 210,
      y2kGradient:
        'linear-gradient(135deg, #00f0ff 0%, #1362d6 52%, #090d16 100%)',
      coverUrl: extraLargeImg || undefined,
      isLiveNow: true,
      trackUrl: latestTrack.url,
    };
  } catch {
    return fallbackTrack;
  }
}