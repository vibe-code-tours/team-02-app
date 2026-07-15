"use client";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({
  id,
  name,
  price,
  quantity,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex items-center gap-4 bg-[#1A1926] border border-[#242334] rounded-xl p-4">
      {/* Item Image Placeholder */}
      <div className="w-16 h-16 bg-[#242334] rounded-lg flex items-center justify-center flex-shrink-0">
        <svg
          className="w-8 h-8 text-[#A7A4B8]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
        </svg>
      </div>

      {/* Item Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-[#F5F3F0] font-medium truncate">{name}</h3>
        <p className="text-[#2EC4B6] font-semibold">${price.toFixed(2)}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQuantity(id, Math.max(0, quantity - 1))}
          className="w-8 h-8 rounded-full bg-[#242334] text-[#F5F3F0] flex items-center justify-center hover:bg-[#E85D04] transition-colors duration-200 cursor-pointer"
          aria-label={`Decrease quantity of ${name}`}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13H5v-2h14v2z" />
          </svg>
        </button>
        <span className="w-8 text-center text-[#F5F3F0] font-medium">
          {quantity}
        </span>
        <button
          onClick={() => onUpdateQuantity(id, quantity + 1)}
          className="w-8 h-8 rounded-full bg-[#242334] text-[#F5F3F0] flex items-center justify-center hover:bg-[#E85D04] transition-colors duration-200 cursor-pointer"
          aria-label={`Increase quantity of ${name}`}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </button>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(id)}
        className="p-2 text-[#A7A4B8] hover:text-[#E63946] transition-colors duration-200 cursor-pointer"
        aria-label={`Remove ${name} from cart`}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
        </svg>
      </button>
    </div>
  );
}
