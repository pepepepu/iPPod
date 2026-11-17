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

interface ItunesTrackResult {
  previewUrl?: string;
  artworkUrl100?: string;
  trackViewUrl?: string;
}

interface ItunesSearchResponse {
  results?: ItunesTrackResult[];
}

const previewCache = new Map<
  string,
  { previewUrl?: string; coverUrl?: string }
>();

let cachedFallbackWavUrl: string | null = null;

function getFallbackSynthPreviewUrl(): string {
  if (cachedFallbackWavUrl) return cachedFallbackWavUrl;

  const sampleRate = 22050;
  const durationSeconds = 16;
  const numSamples = sampleRate * durationSeconds;
  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);

  const writeStr = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i += 1) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeStr(0, 'RIFF');
  view.setUint32(4, 36 + numSamples * 2, true);
  writeStr(8, 'WAVE');
  writeStr(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeStr(36, 'data');
  view.setUint32(40, numSamples * 2, true);

  const notes = [261.63, 329.63, 392.0, 523.25, 392.0, 329.63, 293.66, 440.0];

  for (let i = 0; i < numSamples; i += 1) {
    const t = i / sampleRate;
    const step = Math.floor(t * 4) % notes.length;
    const freq = notes[step];
    const localT = (t * 4) % 1;
    const env = Math.exp(-localT * 4.2);
    const bassFreq = step < 4 ? 130.81 : 146.83;

    const lead = Math.sin(2 * Math.PI * freq * t) * env * 0.24;
    const harmonic = Math.sin(2 * Math.PI * freq * 2 * t) * env * 0.08;
    const bass = Math.sin(2 * Math.PI * bassFreq * t) * 0.16;

    const sample = Math.max(-1, Math.min(1, lead + harmonic + bass));
    view.setInt16(44 + i * 2, sample * 32767, true);
  }

  const blob = new Blob([buffer], { type: 'audio/wav' });
  cachedFallbackWavUrl = URL.createObjectURL(blob);
  return cachedFallbackWavUrl;
}

async function fetchTrackAudioPreview(
  title: string,
  artist: string
): Promise<{ previewUrl?: string; coverUrl?: string }> {
  const cacheKey = `${artist.toLowerCase().trim()}::${title.toLowerCase().trim()}`;
  const cached = previewCache.get(cacheKey);
  if (cached) return cached;

  try {
    const query = encodeURIComponent(`${artist} ${title}`);
    const response = await fetch(
      `https://itunes.apple.com/search?term=${query}&media=music&entity=song&limit=1`
    );

    if (!response.ok) {
      return {};
    }

    const data = (await response.json()) as ItunesSearchResponse;
    const match = data.results?.[0];

    if (!match) {
      previewCache.set(cacheKey, {});
      return {};
    }

    const hiResArtwork = match.artworkUrl100
      ? match.artworkUrl100.replace('100x100bb', '600x600bb')
      : undefined;

    const result = {
      previewUrl: match.previewUrl,
      coverUrl: hiResArtwork,
    };

    previewCache.set(cacheKey, result);
    return result;
  } catch {
    return {};
  }
}

export async function fetchLastFmCurrentTrack(): Promise<TrackItem> {
  const fallbackTrack: TrackItem = {
    ...homeContent.tracks[0],
    number: 'Faixa 01 de 01',
    duration: 30,
    isLiveNow: true,
    previewUrl: getFallbackSynthPreviewUrl(),
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

    const artistName = latestTrack.artist?.['#text'] || 'Artista Desconhecido';
    const albumName = latestTrack.album?.['#text'] || 'Single / Spotify';

    const lastFmImg =
      latestTrack.image?.find((img) => img.size === 'extralarge')?.['#text'] ||
      latestTrack.image?.find((img) => img.size === 'large')?.['#text'] ||
      '';

    const isPlaceholderImg =
      !lastFmImg || lastFmImg.includes('2a96cbd8b46e442fc41c2b86b821562f');

    const previewData = await fetchTrackAudioPreview(
      latestTrack.name,
      artistName
    );

    return {
      id: `lfm-latest-${latestTrack.name}`,
      number: 'Faixa 01 de 01',
      title: latestTrack.name,
      artist: artistName,
      album: albumName,
      duration: 30,
      y2kGradient:
        'linear-gradient(135deg, #00f0ff 0%, #1362d6 52%, #090d16 100%)',
      coverUrl: !isPlaceholderImg ? lastFmImg : previewData.coverUrl,
      isLiveNow: true,
      trackUrl: latestTrack.url,
      previewUrl: previewData.previewUrl || getFallbackSynthPreviewUrl(),
    };
  } catch {
    return fallbackTrack;
  }
}