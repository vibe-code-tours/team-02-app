"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MENU_ITEMS } from "@/lib/menu-data";
import type { MenuItem } from "@/types";

type CourseType = "all" | "starter" | "main" | "dessert";

interface CartItem {
  item: MenuItem;
  quantity: number;
}

export default function MenuPage() {
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState<CourseType>("all");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
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

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev => {
      const existing = prev.find(c => c.item.id === itemId);

      if (existing) {
        // Item exists, update quantity
        const newQty = existing.quantity + delta;
        if (newQty <= 0) {
          // Remove item if quantity <= 0
          return prev.filter(c => c.item.id !== itemId);
        }
        return prev.map(c =>
          c.item.id === itemId ? { ...c, quantity: newQty } : c
        );
      } else if (delta > 0) {
        // Item doesn't exist and we're adding, create new cart item
        const item = MENU_ITEMS.find(i => i.id === itemId);
        if (item) {
          return [...prev, { item, quantity: 1 }];
        }
      }

      return prev;
    });
  };

  const getCartItemQuantity = (itemId: string) => {
    const cartItem = cart.find(c => c.item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const getCartCount = () => {
    return cart.reduce((sum, c) => sum + c.quantity, 0);
  };

  const filteredItems = selectedCourse === "all"
    ? MENU_ITEMS
    : MENU_ITEMS.filter(item => item.course === selectedCourse);

  const courses: CourseType[] = ["all", "starter", "main", "dessert"];

  return (
    <div className="min-h-screen bg-[#0F0E17] pt-16 pb-20 px-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header with Cart Button */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-[#F5F3F0]">Menu</h1>
            <p className="text-[#A7A4B8]">Browse our delicious food & drinks</p>
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

        {/* Course Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {courses.map((course) => (
            <button
              key={course}
              onClick={() => setSelectedCourse(course)}
              className={`px-4 py-2 rounded-lg capitalize whitespace-nowrap transition-all ${
                selectedCourse === course
                  ? "bg-[#E85D04] text-[#F5F3F0]"
                  : "bg-[#1A1926] text-[#A7A4B8] hover:bg-[#242334]"
              }`}
            >
              {course === "all" ? "All" : course === "starter" ? "Starters" : course === "main" ? "Mains" : "Desserts"}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`bg-[#1A1926] border rounded-xl p-5 transition-all cursor-pointer ${
                hoveredItem === item.id
                  ? "border-[#E85D04] scale-[1.02]"
                  : "border-[#242334]"
              }`}
            >
              {/* Course Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs px-2 py-1 rounded-full bg-[#242334] text-[#A7A4B8] capitalize">
                  {item.course}
                </span>
              </div>

              {/* Cuisine */}
              <span className="text-xs text-[#A7A4B8] block mb-1">
                {item.cuisine}
              </span>

              {/* Item Name */}
              <h3 className="text-lg font-semibold text-[#F5F3F0] mb-2">
                {item.name}
              </h3>

              {/* Mood Description */}
              <p className="text-sm text-[#A7A4B8] mb-3 line-clamp-2">
                {item.moodDescription}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {item.moodTags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded bg-[#9D4EDD]/20 text-[#9D4EDD]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Quantity Controls + Add to Cart */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQuantity(item.id, -1);
                    }}
                    disabled={getCartItemQuantity(item.id) === 0}
                    className="w-10 h-10 rounded-lg font-medium bg-[#242334] hover:bg-[#E63946] disabled:opacity-30 disabled:hover:bg-[#242334] text-[#F5F3F0] transition-colors flex items-center justify-center"
                    aria-label="Decrease quantity"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 13H5v-2h14v2z"/>
                    </svg>
                  </button>
                  <span className="text-lg font-bold text-[#F5F3F0] w-8 text-center">
                    {getCartItemQuantity(item.id)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQuantity(item.id, 1);
                    }}
                    className="w-10 h-10 rounded-lg font-medium bg-[#242334] hover:bg-[#2EC4B6] text-[#F5F3F0] transition-colors flex items-center justify-center"
                    aria-label="Increase quantity"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                  </button>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (getCartItemQuantity(item.id) > 0) {
                      // Already added via +/-, just show feedback
                      router.push("/cart");
                    }
                  }}
                  className={`flex-1 h-10 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                    getCartItemQuantity(item.id) > 0
                      ? "bg-[#2EC4B6] hover:bg-[#2EC4B6]/80 text-[#0F0E17]"
                      : "bg-[#E85D04] hover:bg-[#D45303] text-[#F5F3F0]"
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                  {getCartItemQuantity(item.id) > 0 ? "View Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#A7A4B8]">No items found for this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
