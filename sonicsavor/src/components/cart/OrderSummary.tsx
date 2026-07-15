"use client";

interface OrderSummaryProps {
  subtotal: number;
  tax: number;
  onCheckout: () => void;
}

export default function OrderSummary({
  subtotal,
  tax,
  onCheckout,
}: OrderSummaryProps) {
  const total = subtotal + tax;

  return (
    <div className="bg-[#1A1926] border border-[#242334] rounded-xl p-4 space-y-4">
      <h3 className="text-[#F5F3F0] font-semibold">Order Summary</h3>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-[#A7A4B8]">Subtotal</span>
          <span className="text-[#F5F3F0]">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#A7A4B8]">Tax (10%)</span>
          <span className="text-[#F5F3F0]">${tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-[#242334] pt-2 flex justify-between">
          <span className="text-[#F5F3F0] font-semibold">Total</span>
          <span className="text-[#2EC4B6] font-bold text-lg">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="w-full py-3 bg-[#E85D04] text-[#F5F3F0] font-semibold rounded-lg hover:bg-[#E85D04]/90 transition-colors duration-200 cursor-pointer"
      >
        <span className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
          </svg>
          Place Order
        </span>
      </button>
    </div>
  );
}
