"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import SpotifyEmbed from "@/components/ui/SpotifyEmbed";

interface SpotifyPlayerProps {
  embedUrl: string;
  playlistId: string | null;
  isSpotifyConnected: boolean;
}

interface Track {
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
}

interface PlayerState {
  isPaused: boolean;
  isActive: boolean;
  currentTrack: Track | null;
  position: number;
  duration: number;
}

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: {
      Player: new (options: {
        name: string;
        getOAuthToken: (cb: (token: string) => void) => void;
        volume: number;
      }) => SpotifyPlayer;
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type SpotifyListener = (...args: any[]) => void;

  interface SpotifyPlayer {
    connect: () => Promise<boolean>;
    disconnect: () => void;
    addListener: (event: string, callback: SpotifyListener) => boolean;
    removeListener: (event: string, callback: SpotifyListener) => boolean;
    togglePlay: () => Promise<void>;
    previousTrack: () => Promise<void>;
    nextTrack: () => Promise<void>;
    seek: (positionMs: number) => Promise<void>;
    setVolume: (volume: number) => Promise<void>;
    getVolume: () => Promise<number>;
    getCurrentState: () => Promise<PlayerState | null>;
  }
}

export default function SpotifyPlayer({
  embedUrl,
  playlistId,
  isSpotifyConnected,
}: SpotifyPlayerProps) {
  const [player, setPlayer] = useState<SpotifyPlayer | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPaused: true,
    isActive: false,
    currentTrack: null,
    position: 0,
    duration: 0,
  });
  const [volume, setVolumeState] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Fetch token
  useEffect(() => {
    if (!isSpotifyConnected) return;
    fetch("/api/spotify/auth/token")
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) setToken(data.access_token);
      })
      .catch(() => {});
  }, [isSpotifyConnected]);

  // Load SDK script
  useEffect(() => {
    if (!isSpotifyConnected || sdkReady) return;

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => setSdkReady(true);
  }, [isSpotifyConnected, sdkReady]);

  // Initialize player
  useEffect(() => {
    if (!sdkReady || !token || player) return;

    const initPlayer = () => {
      const p = new window.Spotify.Player({
        name: "SonicSavor Web Player",
        getOAuthToken: (cb) => cb(token!),
        volume: 0.5,
      });

      p.addListener("ready", (data: { device_id: string }) => {
        console.log("[Spotify Player] Ready with Device ID", data.device_id);
        setDeviceId(data.device_id);
      });

      p.addListener("not_ready", (data: { device_id: string }) => {
        console.log("[Spotify Player] Device ID has gone offline", data.device_id);
      });

      p.addListener(
        "player_state_changed",
        (state: {
          track_window: { current_track: Track };
          paused: boolean;
          position: number;
          duration: number;
        } | null) => {
          if (!state) return;
          setPlayerState({
            isPaused: state.paused,
            isActive: true,
            currentTrack: state.track_window.current_track,
            position: state.position,
            duration: state.duration,
          });
        }
      );

      p.addListener("initialization_error", (data: { message: string }) => {
        console.error("[Spotify Player] Initialization error:", data.message);
      });

      p.addListener("authentication_error", (data: { message: string }) => {
        console.error("[Spotify Player] Authentication error:", data.message);
      });

      p.addListener("account_error", (data: { message: string }) => {
        console.error("[Spotify Player] Account error (Premium required):", data.message);
      });

      p.addListener("playback_error", (data: { message: string }) => {
        console.error("[Spotify Player] Playback error:", data.message);
      });

      p.connect().then((success) => {
        if (success) {
          console.log("[Spotify Player] Connected successfully");
          setPlayer(p);
        }
      });
    };

    if (window.Spotify) {
      initPlayer();
    } else {
      window.onSpotifyWebPlaybackSDKReady = initPlayer;
    }
  }, [sdkReady, token, player]);

  // Play playlist when device is ready
  const playPlaylist = useCallback(async () => {
    if (!deviceId || !playlistId || !token) return;

    try {
      await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: "PUT",
        body: JSON.stringify({
          context_uri: `spotify:playlist:${playlistId}`,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("[Spotify Player] Error playing playlist:", error);
    }
  }, [deviceId, playlistId, token]);

  // Auto-play when device becomes ready and playlist changes
  useEffect(() => {
    if (deviceId && playlistId && playerState.isActive) {
      playPlaylist();
    }
  }, [deviceId, playlistId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Progress bar update
  useEffect(() => {
    if (playerState.isPaused || !playerState.duration) return;

    const interval = setInterval(() => {
      setPlayerState((prev) => ({
        ...prev,
        position: Math.min(prev.position + 250, prev.duration),
      }));
    }, 250);

    return () => clearInterval(interval);
  }, [playerState.isPaused, playerState.duration]);

  // Not connected — show embed fallback
  if (!isSpotifyConnected || !token) {
    return <SpotifyEmbed url={embedUrl} />;
  }

  // SDK loading
  if (!sdkReady || !player) {
    return (
      <section className="w-full max-w-3xl mx-auto" aria-label="Spotify player loading">
        <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-stone-400 mb-3">
          Your Playlist
        </h2>
        <div className="rounded-xl border border-zinc-200 dark:border-stone-800 bg-zinc-50 dark:bg-stone-900 p-6 text-center">
          <div className="w-6 h-6 border-2 border-zinc-300 border-t-green-500 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-zinc-500 dark:text-stone-400">Connecting to Spotify...</p>
        </div>
      </section>
    );
  }

  const track = playerState.currentTrack;
  const progress = playerState.duration > 0 ? (playerState.position / playerState.duration) * 100 : 0;

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !playerState.duration) return;
    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const positionMs = Math.floor(percent * playerState.duration);
    player?.seek(positionMs);
    setPlayerState((prev) => ({ ...prev, position: positionMs }));
  };

  const handleVolumeToggle = async () => {
    if (isMuted) {
      await player?.setVolume(volume);
      setIsMuted(false);
    } else {
      const currentVolume = await player?.getVolume();
      if (currentVolume !== undefined) setVolumeState(currentVolume);
      await player?.setVolume(0);
      setIsMuted(true);
    }
  };

  return (
    <section className="w-full max-w-3xl mx-auto animate-[fadeIn_0.4s_ease-out]" aria-label="Spotify player">
      <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-stone-400 mb-3">
        Now Playing
      </h2>

      <div className="rounded-xl border border-zinc-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm overflow-hidden">
        {/* Track info */}
        <div className="flex items-center gap-4 p-4">
          {track?.album.images[0] && (
            <img
              src={track.album.images[0].url}
              alt={track.name}
              className="w-14 h-14 rounded-lg object-cover shadow-sm"
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-zinc-900 dark:text-[#F4F1EA] truncate">
              {track?.name || "No track playing"}
            </p>
            <p className="text-xs text-zinc-500 dark:text-stone-400 truncate">
              {track?.artists.map((a) => a.name).join(", ") || "—"}
            </p>
          </div>
          <button
            onClick={() => player?.disconnect()}
            className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-stone-300 transition cursor-pointer"
          >
            Disconnect
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-4 pb-2">
          <div
            ref={progressRef}
            className="relative h-1 bg-zinc-200 dark:bg-stone-700 rounded-full cursor-pointer group"
            onClick={handleProgressClick}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
          >
            <div
              className="absolute inset-y-0 left-0 bg-zinc-900 dark:bg-stone-200 rounded-full transition-[width] duration-200"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-zinc-900 dark:bg-stone-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `calc(${progress}% - 6px)` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-zinc-400 dark:text-stone-500 tabular-nums">
              {formatTime(playerState.position)}
            </span>
            <span className="text-[10px] text-zinc-400 dark:text-stone-500 tabular-nums">
              {formatTime(playerState.duration)}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 pb-4">
          <button
            onClick={() => player?.previousTrack()}
            className="p-2 text-zinc-600 hover:text-zinc-900 dark:text-stone-400 dark:hover:text-stone-200 transition cursor-pointer"
            aria-label="Previous track"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={() => player?.togglePlay()}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900 text-white dark:bg-stone-200 dark:text-stone-900 hover:scale-105 active:scale-95 transition cursor-pointer"
            aria-label={playerState.isPaused ? "Play" : "Pause"}
          >
            {playerState.isPaused ? (
              <Play className="w-5 h-5 ml-0.5" />
            ) : (
              <Pause className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={() => player?.nextTrack()}
            className="p-2 text-zinc-600 hover:text-zinc-900 dark:text-stone-400 dark:hover:text-stone-200 transition cursor-pointer"
            aria-label="Next track"
          >
            <SkipForward className="w-5 h-5" />
          </button>

          <button
            onClick={handleVolumeToggle}
            className="p-2 text-zinc-600 hover:text-zinc-900 dark:text-stone-400 dark:hover:text-stone-200 transition cursor-pointer"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
