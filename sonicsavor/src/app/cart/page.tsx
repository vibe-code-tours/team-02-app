"use client";

import { useState } from "react";
import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";

interface CartItemType {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const INITIAL_CART: CartItemType[] = [
  { id: "ST001", name: "Mohinga", price: 8.5, quantity: 1 },
  { id: "MN001", name: "Mushroom Risotto", price: 16.0, quantity: 2 },
  { id: "DS002", name: "Tiramisu", price: 9.0, quantity: 1 },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItemType[]>(INITIAL_CART);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const handleRemove = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    // In real app, call API to create order
    alert("Order placed! (Demo)");
  };

  return (
    <main className="min-h-screen bg-[#0F0E17] pb-24">
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <svg
            className="w-6 h-6 text-[#E85D04]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
          <div>
            <h1 className="text-2xl font-bold text-[#F5F3F0]">Your Cart</h1>
            <p className="text-[#A7A4B8] text-sm">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <svg
              className="w-20 h-20 mx-auto text-[#242334] mb-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
            <p className="text-[#A7A4B8] text-lg mb-2">Your cart is empty</p>
            <p className="text-[#A7A4B8] text-sm">
              Add some delicious items from the menu
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Cart Items */}
            <div className="space-y-3">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemove}
                />
              ))}
            </div>

            {/* Order Summary */}
            <OrderSummary
              subtotal={subtotal}
              tax={tax}
              onCheckout={handleCheckout}
            />
          </div>
        )}
      </div>
    </main>
  );
}
