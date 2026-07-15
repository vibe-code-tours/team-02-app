"use client";

import { useState } from "react";
import MenuCategory from "@/components/menu/MenuCategory";
import MenuItem from "@/components/menu/MenuItem";
import MoodFilter from "@/components/menu/MoodFilter";

const MOCK_MENU = [
  {
    id: "ST001",
    name: "Mohinga",
    description: "Traditional Myanmar fish noodle soup with lemongrass and banana stem",
    price: 8.5,
    cuisine: "Myanmar",
    course: "starter",
    moodTags: ["comforting", "nostalgic"],
    dietary: ["gluten-free"],
    spiceLevel: 1,
    image: "",
    available: true,
  },
  {
    id: "ST002",
    name: "Spring Rolls",
    description: "Crispy vegetable spring rolls with sweet chili sauce",
    price: 6.5,
    cuisine: "Asian",
    course: "starter",
    moodTags: ["light", "fresh"],
    dietary: ["vegan"],
    spiceLevel: 0,
    image: "",
    available: true,
  },
  {
    id: "MN001",
    name: "Mushroom Risotto",
    description: "Creamy arborio rice with wild mushrooms and parmesan",
    price: 16.0,
    cuisine: "Italian",
    course: "main",
    moodTags: ["cozy", "comforting"],
    dietary: ["vegetarian"],
    spiceLevel: 0,
    image: "",
    available: true,
  },
  {
    id: "MN002",
    name: "Grilled Salmon",
    description: "Atlantic salmon with lemon butter sauce and seasonal vegetables",
    price: 22.0,
    cuisine: "Western",
    course: "main",
    moodTags: ["energetic", "fresh"],
    dietary: ["gluten-free"],
    spiceLevel: 0,
    image: "",
    available: true,
  },
  {
    id: "MN003",
    name: "Lahpet Thoke",
    description: "Fermented tea leaf salad with nuts and sesame",
    price: 9.0,
    cuisine: "Myanmar",
    course: "main",
    moodTags: ["nostalgic", "unique"],
    dietary: ["vegan", "gluten-free"],
    spiceLevel: 1,
    image: "",
    available: true,
  },
  {
    id: "DS001",
    name: "Shwe Yin Aye",
    description: "Myanmar sweet dessert with jelly, bread, and coconut milk",
    price: 7.0,
    cuisine: "Myanmar",
    course: "dessert",
    moodTags: ["sweet", "nostalgic"],
    dietary: ["vegetarian"],
    spiceLevel: 0,
    image: "",
    available: true,
  },
  {
    id: "DS002",
    name: "Tiramisu",
    description: "Classic Italian coffee-flavored dessert",
    price: 9.0,
    cuisine: "Italian",
    course: "dessert",
    moodTags: ["cozy", "indulgent"],
    dietary: ["vegetarian"],
    spiceLevel: 0,
    image: "",
    available: true,
  },
  {
    id: "DR001",
    name: "Kung Yway",
    description: "Traditional Myanmar milk tea",
    price: 4.0,
    cuisine: "Myanmar",
    course: "drink",
    moodTags: ["comforting", "warm"],
    dietary: ["vegetarian"],
    spiceLevel: 0,
    image: "",
    available: true,
  },
];

const CATEGORIES = [
  { id: "all", name: "All", count: MOCK_MENU.length },
  {
    id: "starter",
    name: "Starters",
    count: MOCK_MENU.filter((i) => i.course === "starter").length,
  },
  {
    id: "main",
    name: "Mains",
    count: MOCK_MENU.filter((i) => i.course === "main").length,
  },
  {
    id: "dessert",
    name: "Desserts",
    count: MOCK_MENU.filter((i) => i.course === "dessert").length,
  },
  {
    id: "drink",
    name: "Drinks",
    count: MOCK_MENU.filter((i) => i.course === "drink").length,
  },
];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);

  const filteredItems = MOCK_MENU.filter((item) => {
    const categoryMatch =
      selectedCategory === "all" || item.course === selectedCategory;
    const moodMatch =
      selectedMood === null || item.moodTags.includes(selectedMood);
    return categoryMatch && moodMatch;
  });

  const handleAddToCart = (_id: string) => {
    setCartCount((prev) => prev + 1);
    // In real app, add to cart state/API
  };

  return (
    <main className="min-h-screen bg-[#0F0E17] pb-24">
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#F5F3F0]">Menu</h1>
            <p className="text-[#A7A4B8] text-sm">
              Discover dishes that match your mood
            </p>
          </div>
          {cartCount > 0 && (
            <div className="relative">
              <svg
                className="w-6 h-6 text-[#F5F3F0]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#E85D04] text-[#F5F3F0] text-xs rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </div>
          )}
        </div>

        {/* Mood Filter */}
        <div className="mb-6">
          <MoodFilter selectedMood={selectedMood} onSelect={setSelectedMood} />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <MenuCategory
              key={cat.id}
              name={cat.name}
              icon={
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z" />
                </svg>
              }
              count={cat.count}
              isActive={selectedCategory === cat.id}
              onClick={() => setSelectedCategory(cat.id)}
            />
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <MenuItem
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              cuisine={item.cuisine}
              moodTags={item.moodTags}
              dietary={item.dietary}
              spiceLevel={item.spiceLevel}
              image={item.image}
              available={item.available}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 mx-auto text-[#242334] mb-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
            </svg>
            <p className="text-[#A7A4B8]">No items match your mood</p>
          </div>
        )}
      </div>
    </main>
  );
}
