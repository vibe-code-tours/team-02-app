"use client";

interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  cuisine: string;
  moodTags: string[];
  dietary: string[];
  spiceLevel: number;
  image: string;
  available: boolean;
  onAddToCart: (id: string) => void;
}

export default function MenuItem({
  id,
  name,
  description,
  price,
  cuisine,
  moodTags,
  dietary,
  spiceLevel,
  image: _image,
  available,
  onAddToCart,
}: MenuItemProps) {
  const getSpiceIcon = (level: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <svg
        key={i}
        className={`w-3 h-3 ${i < level ? "text-[#E85D04]" : "text-[#232946]"}`}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ));
  };

  return (
    <div
      className={`bg-[#1A1A2E] border border-[#232946] rounded-xl overflow-hidden transition-colors duration-200 ${
        available ? "hover:border-[#E85D04]/50" : "opacity-50"
      }`}
    >
      {/* Image Placeholder */}
      <div className="h-40 bg-[#232946] flex items-center justify-center">
        <svg
          className="w-12 h-12 text-[#94A1B2]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
        </svg>
      </div>

      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-[#FFFFFE] font-semibold">{name}</h3>
            <p className="text-xs text-[#94A1B2]">{cuisine}</p>
          </div>
          <span className="text-[#2CB67D] font-bold">${price.toFixed(2)}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-[#94A1B2] line-clamp-2">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {moodTags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-[#F58AE0]/10 text-[#F58AE0] text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {dietary.map((item) => (
            <span
              key={item}
              className="px-2 py-1 bg-[#2CB67D]/10 text-[#2CB67D] text-xs rounded-full"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Spice Level */}
        {spiceLevel > 0 && (
          <div className="flex items-center gap-1">
            <span className="text-xs text-[#94A1B2] mr-1">Spice:</span>
            {getSpiceIcon(spiceLevel)}
          </div>
        )}

        {/* Add to Cart */}
        <button
          onClick={() => available && onAddToCart(id)}
          disabled={!available}
          className={`w-full py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
            available
              ? "bg-[#E85D04] text-[#FFFFFE] hover:bg-[#E85D04]/90 cursor-pointer"
              : "bg-[#232946] text-[#94A1B2] cursor-not-allowed"
          }`}
          aria-label={`Add ${name} to cart`}
        >
          {available ? "Add to Cart" : "Unavailable"}
        </button>
      </div>
    </div>
  );
}
