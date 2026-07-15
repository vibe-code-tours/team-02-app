"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PublicHeader from "@/components/layout/PublicHeader";
import Footer from "@/components/layout/Footer";
import MoodInput from "@/components/ui/MoodInput";
import SpotifyEmbed from "@/components/ui/SpotifyEmbed";
import type { CourseRecommendation } from "@/types";

type ViewMode = "input" | "loading" | "results";

interface CartItem {
  item: CourseRecommendation;
  quantity: number;
}

export default function SuggestionsPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>("input");
  const [mood, setMood] = useState("");
  const [recommendations, setRecommendations] = useState<CourseRecommendation[]>([]);
  const [playlistQuery, setPlaylistQuery] = useState("");
  const [spotifyUrl, setSpotifyUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("sonicsavor_cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("sonicsavor_cart", JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (dishName: string, delta: number) => {
    setCart(prev => {
      // Handle set menu specially
      if (dishName === "set-menu") {
        const existing = prev.find(c => c.item.dishName === "set-menu");
        if (existing) {
          const newQty = existing.quantity + delta;
          if (newQty <= 0) {
            return prev.filter(c => c.item.dishName !== "set-menu");
          }
          return prev.map(c =>
            c.item.dishName === "set-menu" ? { ...c, quantity: newQty } : c
          );
        } else if (delta > 0) {
          // Create a set menu item with all 3 courses
          const setMenuItem: CourseRecommendation = {
            course: "main",
            dishName: "AI Set Menu",
            cuisine: "Chef's Recommendation",
            description: recommendations.map(r => r.dishName).join(" + "),
            moodTags: ["set menu", "3-course"],
            icon: "🍽️",
          };
          return [...prev, { item: setMenuItem, quantity: 1 }];
        }
        return prev;
      }

      // Handle individual items
      const existing = prev.find(c => c.item.dishName === dishName);
      if (existing) {
        const newQty = existing.quantity + delta;
        if (newQty <= 0) {
          return prev.filter(c => c.item.dishName !== dishName);
        }
        return prev.map(c =>
          c.item.dishName === dishName ? { ...c, quantity: newQty } : c
        );
      } else if (delta > 0) {
        // Item doesn't exist and we're adding, create new cart item
        const item = recommendations.find(r => r.dishName === dishName);
        if (item) {
          return [...prev, { item, quantity: 1 }];
        }
      }
      return prev;
    });
  };

  const getCartItemQuantity = (dishName: string) => {
    const cartItem = cart.find(c => c.item.dishName === dishName);
    return cartItem ? cartItem.quantity : 0;
  };

  const getCartCount = () => {
    return cart.reduce((sum, c) => sum + c.quantity, 0);
  };

  const handleSubmit = async (submittedMood: string) => {
    setMood(submittedMood);
    setViewMode("loading");
    setError(null);

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood: submittedMood }),
      });

      if (!res.ok) {
        throw new Error("Failed to get recommendations");
      }

      const data = await res.json();
      setRecommendations(data.courses || []);
      setPlaylistQuery(data.playlistQuery || "");

      // Get Spotify embed URL
      if (data.playlistQuery) {
        try {
          const spotifyRes = await fetch(`/api/spotify?q=${encodeURIComponent(data.playlistQuery)}`);
          if (spotifyRes.ok) {
            const spotifyData = await spotifyRes.json();
            setSpotifyUrl(spotifyData.url || "");
          }
        } catch {
          // Spotify embed failed, but food recommendations still work
        }
      }

      setViewMode("results");
    } catch {
      setError("Failed to get recommendations. Please try again.");
      setViewMode("input");
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0E17]">
      <PublicHeader />

      <main className="max-w-4xl mx-auto px-4 pt-24 pb-20">
        {/* Header with Cart */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#F5F3F0]">AI Food Suggestions</h1>
            <p className="text-[#A7A4B8]">Tell us your mood, we&apos;ll suggest the perfect meal</p>
          </div>
          <button
            onClick={() => router.push("/cart")}
            className="relative p-3 bg-[#1A1926] rounded-xl border border-[#242334] hover:border-[#E85D04] transition-colors"
            aria-label="View cart"
          >
            <svg className="w-6 h-6 text-[#E85D04]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E85D04] text-[#F5F3F0] text-xs font-bold rounded-full flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </button>
        </div>

        {/* Input View */}
        {viewMode === "input" && (
          <div className="animate-[fadeIn_0.3s_ease-out]">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-[#E85D04]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-[#E85D04]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#F5F3F0] mb-2">How are you feeling?</h2>
              <p className="text-[#A7A4B8]">Tell us your mood and we&apos;ll suggest a 3-course meal</p>
            </div>

            <MoodInput onSubmit={handleSubmit} />

            {error && (
              <p className="text-[#E63946] text-sm text-center mt-4">{error}</p>
            )}

            {/* Mood Chips */}
            <div className="mt-8">
              <p className="text-sm text-[#A7A4B8] text-center mb-4">Or pick a mood:</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {[
                  { label: "Cozy", color: "bg-amber-500/20 hover:bg-amber-500 text-amber-400" },
                  { label: "Adventurous", color: "bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400" },
                  { label: "Romantic", color: "bg-pink-500/20 hover:bg-pink-500 text-pink-400" },
                  { label: "Energetic", color: "bg-orange-500/20 hover:bg-orange-500 text-orange-400" },
                  { label: "Nostalgic", color: "bg-purple-500/20 hover:bg-purple-500 text-purple-400" },
                  { label: "Chill", color: "bg-blue-500/20 hover:bg-blue-500 text-blue-400" },
                ].map((quickMood) => (
                  <button
                    key={quickMood.label}
                    onClick={() => handleSubmit(quickMood.label)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105 ${quickMood.color}`}
                  >
                    {quickMood.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Loading View */}
        {viewMode === "loading" && (
          <div className="animate-[fadeIn_0.3s_ease-out] bg-[#1A1926] rounded-2xl p-12 border border-[#242334] text-center" role="status" aria-live="polite">
            <div className="flex justify-center gap-2 mb-6">
              <div className="w-4 h-4 bg-[#E85D04] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="w-4 h-4 bg-[#E85D04] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
              <div className="w-4 h-4 bg-[#E85D04] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
            </div>
            <p className="text-[#F5F3F0] font-medium mb-2">Creating your perfect meal...</p>
            <p className="text-[#A7A4B8] text-sm">&quot;{mood}&quot;</p>
          </div>
        )}

        {/* Results View */}
        {viewMode === "results" && (
          <div className="space-y-6">
            {/* Mood header */}
            <div className="bg-[#1A1926] rounded-2xl p-6 border border-[#242334]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#A7A4B8]">Your mood</p>
                  <p className="text-lg font-semibold text-[#F5F3F0]">&quot;{mood}&quot;</p>
                </div>
                <button
                  onClick={() => setViewMode("input")}
                  className="px-4 py-2 border border-[#242334] hover:border-[#E85D04] text-[#A7A4B8] hover:text-[#F5F3F0] rounded-lg text-sm transition-all"
                >
                  Change Mood
                </button>
              </div>
            </div>

            {/* Set Menu */}
            <div className="animate-[fadeInUp_0.4s_ease-out] bg-[#1A1926] rounded-2xl p-6 border border-[#E85D04]">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-[#F5F3F0] mb-2">AI Recommended Set Menu</h3>
                <p className="text-[#A7A4B8] text-sm">Perfect 3-course meal for your mood</p>
              </div>

              {/* Course items with individual quantity controls */}
              <div className="grid gap-4 sm:grid-cols-3 mb-6">
                {recommendations.map((item, index) => (
                  <div
                    key={index}
                    className="animate-[fadeInUp_0.4s_ease-out] bg-[#0F0E17] rounded-xl p-4 border border-[#242334]"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Course badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-full bg-[#E85D04]/20 text-[#E85D04]">
                        {item.course === "starter" ? "Starter" : item.course === "main" ? "Main Course" : "Dessert"}
                      </span>
                      <span className="text-2xl">{item.icon}</span>
                    </div>

                    {/* Dish info */}
                    <h4 className="text-lg font-bold text-[#F5F3F0] mb-1">{item.dishName}</h4>
                    <p className="text-sm text-[#A7A4B8] mb-2">{item.cuisine}</p>
                    <p className="text-sm text-[#A7A4B8] mb-4 line-clamp-2">{item.description}</p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.dishName, -1)}
                        disabled={getCartItemQuantity(item.dishName) === 0}
                        className="w-10 h-10 rounded-lg font-medium bg-[#242334] hover:bg-[#E63946] disabled:opacity-30 disabled:hover:bg-[#242334] text-[#F5F3F0] transition-colors flex items-center justify-center"
                        aria-label="Decrease quantity"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 13H5v-2h14v2z"/>
                        </svg>
                      </button>
                      <span className="text-xl font-bold text-[#F5F3F0] w-8 text-center">
                        {getCartItemQuantity(item.dishName)}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.dishName, 1)}
                        className="w-10 h-10 rounded-lg font-medium bg-[#242334] hover:bg-[#2EC4B6] text-[#F5F3F0] transition-colors flex items-center justify-center"
                        aria-label="Increase quantity"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add All to Cart button */}
              {recommendations.length > 0 && (
                <button
                  onClick={() => {
                    // Add all recommended items to cart
                    recommendations.forEach(item => {
                      if (getCartItemQuantity(item.dishName) === 0) {
                        updateQuantity(item.dishName, 1);
                      }
                    });
                    router.push("/cart");
                  }}
                  className="w-full py-3 bg-[#E85D04] hover:bg-[#D45303] text-[#F5F3F0] font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                  Add All to Cart
                </button>
              )}
            </div>

            {/* Playlist suggestion */}
            {playlistQuery && (
              <div className="animate-[fadeInUp_0.5s_ease-out] bg-[#1A1926] rounded-2xl p-6 border border-[#1DB954]/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#1DB954]/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#1DB954]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#F5F3F0]">Matching Playlist</h3>
                    <p className="text-sm text-[#A7A4B8]">Music to match your mood &amp; meal</p>
                  </div>
                </div>

                {/* Embedded Spotify Player */}
                {spotifyUrl ? (
                  <SpotifyEmbed url={spotifyUrl} />
                ) : (
                  <div className="bg-[#0F0E17] rounded-xl p-6 text-center">
                    <p className="text-[#A7A4B8] text-sm mb-3">
                      Search on Spotify: <span className="text-[#1DB954] font-medium">&quot;{playlistQuery}&quot;</span>
                    </p>
                    <a
                      href={`https://open.spotify.com/search/${encodeURIComponent(playlistQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#1DB954] hover:bg-[#1DB954]/80 text-[#0F0E17] rounded-lg font-medium transition-all"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                      Open on Spotify
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* View Cart button */}
            <button
              onClick={() => router.push("/cart")}
              className="w-full py-3 bg-[#2EC4B6] hover:bg-[#2EC4B6]/80 text-[#0F0E17] font-semibold rounded-xl transition-all"
            >
              View Cart
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
