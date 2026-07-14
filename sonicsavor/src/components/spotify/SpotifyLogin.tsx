"use client";

import { useState, useEffect } from "react";
import { Music, LogOut } from "lucide-react";

interface SpotifyLoginProps {
  onConnectionChange: (connected: boolean) => void;
}

export default function SpotifyLogin({ onConnectionChange }: SpotifyLoginProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if Spotify is connected on mount
  useEffect(() => {
    fetch("/api/spotify/auth/token")
      .then((res) => {
        const connected = res.ok;
        setIsConnected(connected);
        onConnectionChange(connected);
      })
      .catch(() => {
        setIsConnected(false);
        onConnectionChange(false);
      })
      .finally(() => setIsLoading(false));
  }, [onConnectionChange]);

  // Handle OAuth callback — check for error in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");
    if (error) {
      console.error("[Spotify Login] OAuth error:", error);
      // Clean up URL
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  const handleConnect = () => {
    window.location.href = "/api/spotify/auth/login";
  };

  const handleDisconnect = async () => {
    await fetch("/api/spotify/auth/logout", { method: "DELETE" });
    setIsConnected(false);
    onConnectionChange(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-xs text-zinc-400 dark:text-stone-500">
        <div className="w-3 h-3 border border-zinc-300 border-t-zinc-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (isConnected) {
    return (
      <button
        type="button"
        onClick={handleDisconnect}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
          bg-green-50 text-green-700 hover:bg-green-100
          dark:bg-green-950/50 dark:text-green-400 dark:hover:bg-green-950
          transition cursor-pointer"
        aria-label="Disconnect Spotify"
      >
        <Music className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Connected</span>
        <LogOut className="w-3 h-3 opacity-50" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleConnect}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
        bg-[#1DB954] text-white hover:bg-[#1ed760]
        transition cursor-pointer"
      aria-label="Connect with Spotify"
    >
      <Music className="w-3.5 h-3.5" />
      <span className="hidden sm:inline">Connect Spotify</span>
    </button>
  );
}
