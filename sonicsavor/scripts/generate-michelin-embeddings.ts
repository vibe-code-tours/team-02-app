import * as fs from "fs";
import * as path from "path";

// Define 36 Michelin-level menu items
const michelinItems = [
  // ── Myanmar Cuisine ──────────────────────────────────────
  {
    id: "mm-101",
    name: "Lemongrass Smoked Butterfish",
    course: "starter" as const,
    cuisine: "Myanmar" as const,
    price: 18,
    description: "Tender butterfish smoked over lemongrass and tea leaves, served with a citrusy lime-chili glaze.",
    moodDescription: "Delicate and aromatic with a gentle smoky note. Rejuvenating and refined.",
    moodTags: ["adventurous", "refined", "gentle", "refreshing"],
    dietaryTags: ["gluten-free"],
    imageUrl: undefined
  },
  {
    id: "mm-104",
    name: "Pan-Seared Crispy Tohu Thoke",
    course: "starter" as const,
    cuisine: "Myanmar" as const,
    price: 15,
    description: "Creamy chickpea tofu seared crispy, tossed with microgreens, shallot oil, toasted sesame, and tamarind-lime pearls.",
    moodDescription: "Creamy, crispy, nutty, and vibrant. Light and refreshing.",
    moodTags: ["light", "refreshing", "adventurous", "refined"],
    dietaryTags: ["vegetarian", "vegan", "gluten-free"],
    imageUrl: undefined
  },
  {
    id: "mm-105",
    name: "Dungeness Crab Samusa Thoke",
    course: "starter" as const,
    cuisine: "Myanmar" as const,
    price: 20,
    description: "Golden, crispy pocket pastries filled with spiced Dungeness crab meat, served in a rich, tangy lentil-tamarind broth with fresh herbs.",
    moodDescription: "A decadent twist on a street food classic. Warming; rich; and zesty.",
    moodTags: ["warming", "rich", "zesty", "comforting"],
    dietaryTags: [],
    imageUrl: undefined
  },
  {
    id: "mm-102",
    name: "A5 Wagyu Shan Noodles",
    course: "main" as const,
    cuisine: "Myanmar" as const,
    price: 38,
    description: "Hand-pulled rice noodles tossed with roasted peanuts, pickled mustard greens, and seared A5 Wagyu beef in a spiced tomato-garlic reduction.",
    moodDescription: "An ultra-premium, deeply satisfying Shan classic. Comforting; rich; and celebratory.",
    moodTags: ["comforting", "satisfying", "rich", "celebratory"],
    dietaryTags: [],
    imageUrl: undefined
  },
  {
    id: "mm-106",
    name: "Slow-Braised Duck Curry with Jaggery Glaze",
    course: "main" as const,
    cuisine: "Myanmar" as const,
    price: 32,
    description: "Duck leg confit slow-braised in aromatic ginger-garlic curry, finished with a caramelized jaggery and lemongrass glaze.",
    moodDescription: "Deeply savory with a hint of sweetness. Hearty; cozy; and celebratory.",
    moodTags: ["hearty", "cozy", "celebratory", "rich"],
    dietaryTags: ["gluten-free"],
    imageUrl: undefined
  },
  {
    id: "mm-107",
    name: "Lobster Tail Ohn No Khao Swe",
    course: "main" as const,
    cuisine: "Myanmar" as const,
    price: 36,
    description: "Butter-poached lobster tail served over wheat noodles in a luxurious, silky spiced coconut-chickpea broth with crispy toppings.",
    moodDescription: "Silky, indulgent, and comforting. Comforting; rich; and elegant.",
    moodTags: ["comforting", "rich", "elegant", "warming"],
    dietaryTags: [],
    imageUrl: undefined
  },
  {
    id: "mm-103",
    name: "Jaggery Saffron Soufflé",
    course: "dessert" as const,
    cuisine: "Myanmar" as const,
    price: 14,
    description: "Light and airy soufflé sweetened with traditional jaggery palm syrup, infused with saffron and served with coconut-cardamom ice cream.",
    moodDescription: "A sweet, fragrant, and luxurious finish. Blissful and indulgent.",
    moodTags: ["sweet", "blissful", "indulgent", "warm"],
    dietaryTags: ["vegetarian"],
    imageUrl: undefined
  },
  {
    id: "mm-108",
    name: "Shwe Yin Aye Panna Cotta",
    course: "dessert" as const,
    cuisine: "Myanmar" as const,
    price: 13,
    description: "Creamy pandan coconut milk panna cotta, topped with sweet jaggery jelly, sticky rice pearls, and toasted coconut flakes.",
    moodDescription: "A modern, silky, and cooling Burmese dessert. Refreshing and blissful.",
    moodTags: ["refreshing", "blissful", "sweet", "cooling"],
    dietaryTags: ["vegetarian", "gluten-free"],
    imageUrl: undefined
  },
  {
    id: "mm-109",
    name: "Caramelized Banana Semolina Cake",
    course: "dessert" as const,
    cuisine: "Myanmar" as const,
    price: 12,
    description: "Warm, rich semolina cake baked with coconut cream, topped with caramelized bananas and a drizzle of toddy palm syrup.",
    moodDescription: "Warm, sweet, and comforting. Comforting and nostalgic.",
    moodTags: ["comforting", "nostalgic", "warm", "sweet"],
    dietaryTags: ["vegetarian"],
    imageUrl: undefined
  },

  // ── Western Cuisine ──────────────────────────────────────
  {
    id: "we-101",
    name: "Truffle Lobster Bisque",
    course: "starter" as const,
    cuisine: "Western" as const,
    price: 22,
    description: "Rich, creamy lobster soup infused with black truffle oil and dry sherry, topped with a lobster tail medallion.",
    moodDescription: "Warm, velvety, and intensely aromatic. Sophisticated and warming.",
    moodTags: ["rich", "warming", "sophisticated", "cozy"],
    dietaryTags: ["gluten-free"],
    imageUrl: undefined
  },
  {
    id: "we-104",
    name: "Pan-Seared Foie Gras with Brioche",
    course: "starter" as const,
    cuisine: "Western" as const,
    price: 25,
    description: "Rich duck foie gras seared in brown butter, served with a caramelized pear compote on toasted artisanal brioche.",
    moodDescription: "Luxurious, decadent, and buttery. Indulgent and sophisticated.",
    moodTags: ["indulgent", "sophisticated", "rich", "romantic"],
    dietaryTags: [],
    imageUrl: undefined
  },
  {
    id: "we-105",
    name: "Heirloom Tomato & Caviar Burrata",
    course: "starter" as const,
    cuisine: "Western" as const,
    price: 20,
    description: "Creamy Italian burrata, heirloom tomatoes, basil oil, and white balsamic pearls, topped with premium sturgeon caviar.",
    moodDescription: "Incredibly fresh, elegant, and creamy. Fresh; light; and elegant.",
    moodTags: ["fresh", "light", "elegant", "refined"],
    dietaryTags: ["vegetarian"],
    imageUrl: undefined
  },
  {
    id: "we-102",
    name: "Dry-Aged Ribeye with Foie Gras",
    course: "main" as const,
    cuisine: "Western" as const,
    price: 48,
    description: "28-day dry-aged ribeye steak seared in herb butter, topped with pan-seared foie gras and a rich red wine reduction.",
    moodDescription: "The ultimate celebratory steak experience. Bold; decadent; and highly indulgent.",
    moodTags: ["bold", "decadent", "celebratory", "indulgent"],
    dietaryTags: [],
    imageUrl: undefined
  },
  {
    id: "we-106",
    name: "Herb-Crusted Rack of Lamb",
    course: "main" as const,
    cuisine: "Western" as const,
    price: 42,
    description: "Roasted rack of Colorado lamb with an herb-panko crust, served with rosemary red wine jus and parsnip purée.",
    moodDescription: "Savory, bold, and sophisticated. Bold; hearty; and celebratory.",
    moodTags: ["bold", "hearty", "celebratory", "sophisticated"],
    dietaryTags: [],
    imageUrl: undefined
  },
  {
    id: "we-107",
    name: "Chilean Sea Bass with Lemon Verbena",
    course: "main" as const,
    cuisine: "Western" as const,
    price: 45,
    description: "Pan-roasted Chilean sea bass in a delicate lemon verbena emulsion, served with baby artichokes and asparagus.",
    moodDescription: "Light, bright, and highly elegant. Light; bright; and elegant.",
    moodTags: ["light", "bright", "elegant", "nourishing"],
    dietaryTags: ["gluten-free"],
    imageUrl: undefined
  },
  {
    id: "we-103",
    name: "Deconstructed Meyer Lemon Tart",
    course: "dessert" as const,
    cuisine: "Western" as const,
    price: 15,
    description: "Tangy Meyer lemon curd, butter shortbread crumbs, and toasted Italian meringue shards, garnished with edible gold leaf.",
    moodDescription: "Bright, zesty, and visually stunning. Cheerful and refreshing.",
    moodTags: ["cheerful", "bright", "refreshing", "playful"],
    dietaryTags: ["vegetarian"],
    imageUrl: undefined
  },
  {
    id: "we-108",
    name: "Valrhona Chocolate Lava Cake",
    course: "dessert" as const,
    cuisine: "Western" as const,
    price: 16,
    description: "Molten Valrhona dark chocolate cake with a gooey center, served with Madagascan vanilla bean gelato and fresh raspberries.",
    moodDescription: "Intense, warm, and deeply comforting chocolate. Decadent and romantic.",
    moodTags: ["decadent", "romantic", "comforting", "sweet"],
    dietaryTags: ["vegetarian"],
    imageUrl: undefined
  },
  {
    id: "we-109",
    name: "Bourbon Vanilla Crème Brûlée",
    course: "dessert" as const,
    cuisine: "Western" as const,
    price: 14,
    description: "Rich vanilla bean custard with a perfectly caramelized sugar shell, infused with small-batch bourbon.",
    moodDescription: "Classic, creamy, and warm. Elegant and satisfying.",
    moodTags: ["elegant", "satisfying", "sweet", "rich"],
    dietaryTags: ["vegetarian", "gluten-free"],
    imageUrl: undefined
  },

  // ── European Cuisine ─────────────────────────────────────
  {
    id: "eu-101",
    name: "Foie Gras Terrine with Fig Compote",
    course: "starter" as const,
    cuisine: "European" as const,
    price: 24,
    description: "Silky French duck foie gras terrine, served with spiced fig compote and warm toasted brioche.",
    moodDescription: "Luxurious, sweet-savory harmony. Elegant and romantic.",
    moodTags: ["elegant", "romantic", "indulgent", "rich"],
    dietaryTags: [],
    imageUrl: undefined
  },
  {
    id: "eu-104",
    name: "Escargots en Croûte",
    course: "starter" as const,
    cuisine: "European" as const,
    price: 19,
    description: "Wild Burgundy snails baked in garlic-herb butter, served inside light, flaky puff pastry shells.",
    moodDescription: "Rich, buttery, and classic French. Refined and comforting.",
    moodTags: ["refined", "comforting", "rich", "sophisticated"],
    dietaryTags: [],
    imageUrl: undefined
  },
  {
    id: "eu-105",
    name: "Carpaccio of Wagyu Beef",
    course: "starter" as const,
    cuisine: "European" as const,
    price: 22,
    description: "Paper-thin slices of raw Wagyu beef, dressed with white truffle oil, shaved Parmigiano-Reggiano, and wild arugula.",
    moodDescription: "Savory, bold, and luxurious. Bold and elegant.",
    moodTags: ["bold", "elegant", "refined", "indulgent"],
    dietaryTags: ["gluten-free"],
    imageUrl: undefined
  },
  {
    id: "eu-102",
    name: "Pan-Seared Duck Breast with Cherry Gastrique",
    course: "main" as const,
    cuisine: "European" as const,
    price: 34,
    description: "Crispy-skinned duck breast served medium-rare with a sweet and sour sour cherry sauce, parsnip purée, and baby vegetables.",
    moodDescription: "A sophisticated, rich European classic. Romantic and sophisticated.",
    moodTags: ["romantic", "sophisticated", "hearty", "rich"],
    dietaryTags: ["gluten-free"],
    imageUrl: undefined
  },
  {
    id: "eu-106",
    name: "Truffle Butter Dover Sole",
    course: "main" as const,
    cuisine: "European" as const,
    price: 45,
    description: "Dover sole pan-fried in brown butter, deboned tableside, and finished with a rich black truffle-lemon butter sauce.",
    moodDescription: "Sophisticated, delicate, and buttery. Refined; light; and romantic.",
    moodTags: ["refined", "light", "romantic", "elegant"],
    dietaryTags: [],
    imageUrl: undefined
  },
  {
    id: "eu-107",
    name: "Slow-Braised Beef Bourguignon",
    course: "main" as const,
    cuisine: "European" as const,
    price: 32,
    description: "Tender Wagyu beef cheek slow-cooked in Burgundy red wine, served with wild chanterelle mushrooms, pearl onions, and truffle mash.",
    moodDescription: "Rich, deeply savory, and cozy. Cozy; hearty; and comforting.",
    moodTags: ["cozy", "hearty", "comforting", "rich"],
    dietaryTags: ["gluten-free"],
    imageUrl: undefined
  },
  {
    id: "eu-103",
    name: "Grand Marnier Soufflé",
    course: "dessert" as const,
    cuisine: "European" as const,
    price: 16,
    description: "Warm, puffed orange liqueur soufflé, served with vanilla bean crème anglaise.",
    moodDescription: "Fluffy, warm, and citrus-scented luxury. Romantic and sweet.",
    moodTags: ["romantic", "sweet", "elegant", "warm"],
    dietaryTags: ["vegetarian"],
    imageUrl: undefined
  },
  {
    id: "eu-108",
    name: "Deconstructed Tiramisu",
    course: "dessert" as const,
    cuisine: "European" as const,
    price: 14,
    description: "Espresso-soaked ladyfingers, whipped mascarpone quenelles, marsala wine sabayon, and a dusting of dark cocoa.",
    moodDescription: "Creamy, rich, and bittersweet. Romantic and comforting.",
    moodTags: ["romantic", "comforting", "bittersweet", "rich"],
    dietaryTags: ["vegetarian"],
    imageUrl: undefined
  },
  {
    id: "eu-109",
    name: "Pistachio Soufflé with White Chocolate",
    course: "dessert" as const,
    cuisine: "European" as const,
    price: 15,
    description: "Warm Sicilian pistachio soufflé, served with a molten white chocolate core and pistachio gelato.",
    moodDescription: "Sweet, nutty, and spectacular. Elegant and indulgent.",
    moodTags: ["elegant", "indulgent", "sweet", "warm"],
    dietaryTags: ["vegetarian"],
    imageUrl: undefined
  },

  // ── Thai Cuisine ─────────────────────────────────────────
  {
    id: "th-101",
    name: "Hokkaido Scallop Larb",
    course: "starter" as const,
    cuisine: "Thai" as const,
    price: 20,
    description: "Sashimi-grade Hokkaido scallops tossed with toasted rice powder, fresh mint, lime, fish sauce, and bird's eye chili.",
    moodDescription: "Zesty, spicy, and incredibly fresh. Adventurous and refreshing.",
    moodTags: ["adventurous", "refreshing", "spicy", "zesty"],
    dietaryTags: ["gluten-free"],
    imageUrl: undefined
  },
  {
    id: "th-104",
    name: "Caviar Tom Kha Shooters",
    course: "starter" as const,
    cuisine: "Thai" as const,
    price: 18,
    description: "Warm, lemongrass and galangal infused coconut soup served in double shot glasses, topped with coconut foam and black caviar.",
    moodDescription: "Creamy, zesty, and highly aromatic. Refined and warming.",
    moodTags: ["refined", "warming", "cozy", "fresh"],
    dietaryTags: ["gluten-free"],
    imageUrl: undefined
  },
  {
    id: "th-105",
    name: "Blue Crab Summer Rolls",
    course: "starter" as const,
    cuisine: "Thai" as const,
    price: 16,
    description: "Fresh rice paper rolls packed with sweet jumbo lump blue crab, herbs, and avocado, served with a spicy sweet-chili dipping sauce.",
    moodDescription: "Light, fresh, and zesty. Refreshing and light.",
    moodTags: ["refreshing", "light", "fresh", "healthy"],
    dietaryTags: ["gluten-free"],
    imageUrl: undefined
  },
  {
    id: "th-102",
    name: "Slow-Braised Lamb Massaman",
    course: "main" as const,
    cuisine: "Thai" as const,
    price: 36,
    description: "Tender lamb shank slow-braised for 12 hours in a rich, cardamom-scented Massaman curry with pearl onions and fingerling potatoes.",
    moodDescription: "A warm, comforting, and deeply aromatic curry. Hearty and comforting.",
    moodTags: ["hearty", "comforting", "cozy", "warming"],
    dietaryTags: ["gluten-free"],
    imageUrl: undefined
  },
  {
    id: "th-106",
    name: "Crispy Pork Belly Pad Kra Pao",
    course: "main" as const,
    cuisine: "Thai" as const,
    price: 28,
    description: "Triple-cooked crispy pork belly stir-fried with holy basil, garlic, and red bird's eye chilies, served with a crispy duck egg over jasmine rice.",
    moodDescription: "Fiery, savory, and satisfying. Bold; fiery; and satisfying.",
    moodTags: ["bold", "fiery", "satisfying", "simple"],
    dietaryTags: [],
    imageUrl: undefined
  },
  {
    id: "th-107",
    name: "Lobster Tail Red Curry",
    course: "main" as const,
    cuisine: "Thai" as const,
    price: 38,
    description: "Butter-poached lobster tail served in a thick, rich red curry sauce with lychees, pineapple, and sweet Thai basil.",
    moodDescription: "Spicy, aromatic, and luxurious. Indulgent; bold; and celebratory.",
    moodTags: ["indulgent", "bold", "celebratory", "spicy"],
    dietaryTags: ["gluten-free"],
    imageUrl: undefined
  },
  {
    id: "th-103",
    name: "Smoked Coconut Caviar Pudding",
    course: "dessert" as const,
    cuisine: "Thai" as const,
    price: 14,
    description: "Traditional coconut pudding smoked with flower incense, topped with salted coconut cream and tapioca caviar.",
    moodDescription: "Fragrant, delicate, and uniquely sweet. Blissful and elegant.",
    moodTags: ["blissful", "elegant", "delicate", "sweet"],
    dietaryTags: ["vegetarian", "gluten-free"],
    imageUrl: undefined
  },
  {
    id: "th-108",
    name: "Gold Leaf Mango Sticky Rice",
    course: "dessert" as const,
    cuisine: "Thai" as const,
    price: 15,
    description: "Sweet honey mango slices topped with 24k edible gold leaf, served alongside warm, sweet pandan sticky rice and coconut cream.",
    moodDescription: "A regal version of the classic mango sticky rice. Blissful and sweet.",
    moodTags: ["blissful", "sweet", "warm", "nostalgic"],
    dietaryTags: ["vegetarian", "gluten-free"],
    imageUrl: undefined
  },
  {
    id: "th-109",
    name: "Bua Loy Saffron Dumplings",
    course: "dessert" as const,
    cuisine: "Thai" as const,
    price: 12,
    description: "Warm sweet taro and pumpkin flour dumplings in a rich sweet saffron-coconut milk broth.",
    moodDescription: "Warm, sweet, and comforting. Comforting and gentle.",
    moodTags: ["comforting", "gentle", "warm", "sweet"],
    dietaryTags: ["vegetarian", "gluten-free"],
    imageUrl: undefined
  }
];

async function main() {
  console.log("Loading embedding model...");
  const { pipeline } = await import("@xenova/transformers");
  const extractor = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  console.log("Model loaded successfully.");

  const outputItems: any[] = [];

  for (const item of michelinItems) {
    console.log(`Processing ${item.name} (${item.id})...`);
    
    // 1. Generate local embedding
    const output: any = await extractor(item.moodDescription, {
      pooling: "mean",
      normalize: true,
    });
    const embedding = (output.tolist() as number[][])[0];

    outputItems.push({
      ...item,
      embedding: embedding
    });
  }

  // 2. Write to a static TypeScript file
  const outPath = path.join(process.cwd(), "src/lib/michelin-menu-data.ts");
  const fileContent = `// Auto-generated Michelin-level dishes. Hand-crafted & seeded.
import { MenuItem } from "@/types";

export const michelinMenuItems: (MenuItem & { embedding: number[] })[] = ${JSON.stringify(outputItems, null, 2)};
`;

  fs.writeFileSync(outPath, fileContent, "utf-8");
  console.log(`\nSuccess! Generated 36 Michelin-level dishes with embeddings at ${outPath}`);
}

main().catch(console.error);
