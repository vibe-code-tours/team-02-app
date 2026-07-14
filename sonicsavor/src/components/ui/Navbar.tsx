"use client";

import { useState, useEffect, type ReactNode } from "react";
import { Sun, Moon, LogOut } from "lucide-react";

interface NavbarProps {
  onLogout: () => void;
  rightSlot?: ReactNode;
}

export default function Navbar({ onLogout, rightSlot }: NavbarProps) {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem("sonicsavor-theme");
    if (stored) {
      setDarkMode(stored === "dark");
    } else {
      setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    setMounted(true);
  }, []);

  // Apply dark mode to <html>
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("sonicsavor-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("sonicsavor-theme", "light");
    }
  }, [darkMode, mounted]);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-stone-800 dark:bg-stone-950/80">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-stone-50 font-[family-name:var(--font-display)]">
          SonicSavor
        </span>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Spotify slot */}
          {rightSlot}

          {/* Dark mode toggle */}
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:text-stone-500 dark:hover:bg-stone-800 dark:hover:text-stone-200 transition cursor-pointer"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={onLogout}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-200 transition cursor-pointer"
            aria-label="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </nav>
  );
}
