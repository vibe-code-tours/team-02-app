"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PublicHeader from "@/components/layout/PublicHeader";
import Footer from "@/components/layout/Footer";
import type { MenuItem, CourseRecommendation } from "@/types";

// Cart can hold either MenuItems (from /menu) or CourseRecommendations (from /suggestions)
type CartItemType = MenuItem | CourseRecommendation;

interface CartItem {
  item: CartItemType;
  quantity: number;
}

// Helper to get unique ID from either type
function getItemId(item: CartItemType): string {
  if ("id" in item) return item.id;
  if ("dishName" in item) return item.dishName;
  return "";
}

// Helper to get item name
function getItemName(item: CartItemType): string {
  if ("name" in item) return item.name;
  if ("dishName" in item) return item.dishName;
  return "";
}

// Helper to get emoji/icon
function getItemIcon(item: CartItemType): string {
  if ("emoji" in item) return item.emoji;
  if ("icon" in item) return item.icon;
  return "🍽️";
}

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("sonicsavor_cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("sonicsavor_cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev => {
      const updated = prev.map(c => {
        const itemIdentifier = getItemId(c.item);
        if (itemIdentifier === itemId) {
          const newQty = c.quantity + delta;
          return newQty > 0 ? { ...c, quantity: newQty } : c;
        }
        return c;
      }).filter(c => c.quantity > 0);
      return updated;
    });
  };

  const removeItem = (itemId: string) => {
    setCart(prev => prev.filter(c => getItemId(c.item) !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getSubtotal = () => {
    // Mock prices for now
    const prices: Record<string, number> = {
      starter: 12,
      main: 24,
      dessert: 10,
    };
    return cart.reduce((sum, c) => sum + (prices[c.item.course] || 15) * c.quantity, 0);
  };

  const getTax = () => {
    return getSubtotal() * 0.1;
  };

  const getTotal = () => {
    return getSubtotal() + getTax();
  };

  const handleCheckout = () => {
    // For now, just show confirmation
    alert("Order placed! 🎉\n\nYour order has been sent to the kitchen.");
    clearCart();
    router.push("/dashboard");
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#0F0E17] flex items-center justify-center">
        <div className="text-[#A7A4B8]">Loading cart...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0E17]">
      <PublicHeader />

      <main className="max-w-4xl mx-auto px-4 pt-24 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#F5F3F0]">Your Cart</h1>
            <p className="text-[#A7A4B8]">
              {cart.length === 0 ? "Your cart is empty" : `${cart.length} item(s) in your cart`}
            </p>
          </div>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-sm text-[#E63946] hover:text-[#E63946]/80 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          /* Empty State */
          <div className="bg-[#1A1926] rounded-xl p-12 border border-[#242334] text-center">
            <svg className="w-16 h-16 text-[#242334] mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            <p className="text-[#A7A4B8] mb-6">Your cart is empty. Add some delicious items!</p>
            <button
              onClick={() => router.push("/menu")}
              className="px-6 py-3 bg-[#E85D04] hover:bg-[#D45303] text-[#F5F3F0] rounded-xl font-medium transition-colors"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((cartItem, index) => (
                <div
                  key={getItemId(cartItem.item) || index}
                  className="bg-[#1A1926] rounded-xl p-4 border border-[#242334] flex gap-4"
                >
                  {/* Emoji */}
                  <div className="text-4xl flex-shrink-0">{getItemIcon(cartItem.item)}</div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-[#F5F3F0]">{getItemName(cartItem.item)}</h3>
                        <p className="text-sm text-[#A7A4B8] capitalize">{cartItem.item.course}</p>
                      </div>
                      <button
                        onClick={() => removeItem(getItemId(cartItem.item))}
                        className="text-[#A7A4B8] hover:text-[#E63946] transition-colors"
                        aria-label="Remove item"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                      </button>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => updateQuantity(getItemId(cartItem.item), -1)}
                        className="w-8 h-8 rounded-lg bg-[#242334] hover:bg-[#E85D04] text-[#F5F3F0] flex items-center justify-center transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 13H5v-2h14v2z"/>
                        </svg>
                      </button>
                      <span className="text-[#F5F3F0] font-medium w-8 text-center">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(getItemId(cartItem.item), 1)}
                        className="w-8 h-8 rounded-lg bg-[#242334] hover:bg-[#E85D04] text-[#F5F3F0] flex items-center justify-center transition-colors"
                        aria-label="Increase quantity"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                        </svg>
                      </button>
                      <span className="text-[#A7A4B8] text-sm ml-auto">
                        ${((cartItem.item.course === "starter" ? 12 : cartItem.item.course === "main" ? 24 : 10) * cartItem.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping */}
              <button
                onClick={() => router.push("/menu")}
                className="w-full py-3 border border-[#242334] hover:border-[#E85D04] text-[#A7A4B8] hover:text-[#F5F3F0] rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
                Continue Shopping
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#1A1926] rounded-xl p-6 border border-[#242334] sticky top-24">
                <h2 className="text-lg font-semibold text-[#F5F3F0] mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-[#A7A4B8]">
                    <span>Subtotal</span>
                    <span>${getSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#A7A4B8]">
                    <span>Tax (10%)</span>
                    <span>${getTax().toFixed(2)}</span>
                  </div>
                  <div className="border-t border-[#242334] pt-3 flex justify-between text-[#F5F3F0] font-semibold">
                    <span>Total</span>
                    <span>${getTotal().toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-[#2EC4B6] hover:bg-[#2EC4B6]/80 text-[#0F0E17] font-semibold rounded-xl transition-colors"
                >
                  Place Order
                </button>

                <p className="text-xs text-[#A7A4B8] text-center mt-4">
                  Your order will be sent to the kitchen
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
