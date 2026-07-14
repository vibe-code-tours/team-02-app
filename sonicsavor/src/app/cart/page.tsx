"use client";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-[#0F0E17] pt-16 pb-20 px-4">
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-2xl font-bold text-[#F5F3F0] mb-4">Cart</h1>
        <p className="text-[#A7A4B8]">Order summary</p>

        <div className="mt-8 bg-[#1A1926] rounded-xl p-6 border border-[#242334]">
          <p className="text-[#A7A4B8] text-center py-8">Cart coming soon...</p>
        </div>
      </div>
    </div>
  );
}
