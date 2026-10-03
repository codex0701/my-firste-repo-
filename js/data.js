/**
 * Vegetable Market - Demo Dataset & Constants
 * Academic Demonstration Project (2026)
 * Realistic Indian local market produce, pricing, verified images, and sellers
 */

const VEGETABLES_DATA = [
  {
    id: "veg-01",
    name: "Tomato (Tamatar)",
    category: "fruit-veg",
    price: 40,
    unit: "/kg",
    seller: "Green Farm",
    stock: 28,
    availability: "Fresh today",
    status: "in-stock", // 'in-stock', 'limited', 'out-of-stock'
    description: "Farm-fresh ripe red hybrid tomatoes, perfect for curries and salads.",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
    icon: "🍅",
    prevPrice: 48,
    rating: 4.8
  },
  {
    id: "veg-02",
    name: "Potato (Aloo)",
    category: "root",
    price: 30,
    unit: "/kg",
    seller: "Local Harvest",
    stock: 45,
    availability: "Available",
    status: "in-stock",
    description: "New season medium-sized starchy potatoes, clean and sun-dried.",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80",
    icon: "🥔",
    prevPrice: 32,
    rating: 4.7
  },
  {
    id: "veg-03",
    name: "Onion (Pyaaz)",
    category: "bulb",
    price: 35,
    unit: "/kg",
    seller: "Fresh Basket",
    stock: 35,
    availability: "Available",
    status: "in-stock",
    description: "Crisp red onions sourced directly from Nasik farms, strong pungency.",
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80",
    icon: "🧅",
    prevPrice: 42,
    rating: 4.6
  },
  {
    id: "veg-04",
    name: "Carrot (Gajar)",
    category: "root",
    price: 60,
    unit: "/kg",
    seller: "Organic Corner",
    stock: 4,
    availability: "Limited stock",
    status: "limited",
    description: "Sweet and crunchy country carrots, rich in beta-carotene and dietary fiber.",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&auto=format&fit=crop&q=80",
    icon: "🥕",
    prevPrice: 65,
    rating: 4.9
  },
  {
    id: "veg-05",
    name: "Cabbage (Patta Gobhi)",
    category: "leafy",
    price: 35,
    unit: "/piece",
    seller: "Kisan Mandi Direct",
    stock: 18,
    availability: "Available",
    status: "in-stock",
    description: "Compact, pesticide-safe green heads with crisp fresh outer leaves.",
    image: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=600&auto=format&fit=crop&q=80",
    icon: "🥬",
    prevPrice: 35,
    rating: 4.5
  },
  {
    id: "veg-06",
    name: "Cauliflower (Phool Gobhi)",
    category: "seasonal",
    price: 45,
    unit: "/piece",
    seller: "Local Harvest",
    stock: 12,
    availability: "Fresh today",
    status: "in-stock",
    description: "Snow-white dense curd heads protected by natural green jacket leaves.",
    image: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=600&auto=format&fit=crop&q=80",
    icon: "🥦",
    prevPrice: 50,
    rating: 4.7
  },
  {
    id: "veg-07",
    name: "Spinach (Palak)",
    category: "leafy",
    price: 25,
    unit: "/bunch",
    seller: "Green Farm",
    stock: 22,
    availability: "Fresh today",
    status: "in-stock",
    description: "Tender, dark green leafy bunches harvested at dawn, iron-packed.",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&auto=format&fit=crop&q=80",
    icon: "🥬",
    prevPrice: 30,
    rating: 4.9
  },
  {
    id: "veg-08",
    name: "Capsicum (Shimla Mirch)",
    category: "fruit-veg",
    price: 70,
    unit: "/kg",
    seller: "Organic Corner",
    stock: 5,
    availability: "Limited stock",
    status: "limited",
    description: "Glossy bell peppers with thick fleshy walls, ideal for stir-fries.",
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&auto=format&fit=crop&q=80",
    icon: "🫑",
    prevPrice: 85,
    rating: 4.8
  },
  {
    id: "veg-09",
    name: "Brinjal (Baingan)",
    category: "fruit-veg",
    price: 40,
    unit: "/kg",
    seller: "Local Harvest",
    stock: 16,
    availability: "Available",
    status: "in-stock",
    description: "Glossy purple bharta eggplants, fresh and tender.",
    image: "images/brinjal.jpg",
    icon: "🍆",
    prevPrice: 42,
    rating: 4.8
  },
  {
    id: "veg-10",
    name: "Lady Finger (Bhindi)",
    category: "green-veg",
    price: 50,
    unit: "/kg",
    seller: "Kisan Mandi Direct",
    stock: 15,
    availability: "Fresh today",
    status: "in-stock",
    description: "Crisp young okra pods with tender tips that snap easily.",
    image: "https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?w=600&auto=format&fit=crop&q=80",
    icon: "🌱",
    prevPrice: 55,
    rating: 4.6
  },
  {
    id: "veg-11",
    name: "Green Peas (Matar)",
    category: "seasonal",
    price: 80,
    unit: "/kg",
    seller: "Green Farm",
    stock: 3,
    availability: "Limited stock",
    status: "limited",
    description: "Sweet winter pods filled with plump juicy green pearls.",
    image: "https://images.unsplash.com/photo-1592394533824-9440e5d68530?w=600&auto=format&fit=crop&q=80",
    icon: "🫛",
    prevPrice: 95,
    rating: 4.9
  },
  {
    id: "veg-12",
    name: "Radish (Mooli)",
    category: "root",
    price: 30,
    unit: "/kg",
    seller: "Fresh Basket",
    stock: 20,
    availability: "Available",
    status: "in-stock",
    description: "Crisp white peppery radishes with fresh leaves attached.",
    image: "images/radish.png",
    icon: "🥢",
    prevPrice: 30,
    rating: 4.6
  },
  {
    id: "veg-13",
    name: "Cucumber (Kheera)",
    category: "fruit-veg",
    price: 35,
    unit: "/kg",
    seller: "Local Harvest",
    stock: 25,
    availability: "Fresh today",
    status: "in-stock",
    description: "Cool hydrating Indian desi cucumbers, thin skin and non-bitter.",
    image: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=600&auto=format&fit=crop&q=80",
    icon: "🥒",
    prevPrice: 40,
    rating: 4.7
  },
  {
    id: "veg-14",
    name: "Bitter Gourd (Karela)",
    category: "green-veg",
    price: 55,
    unit: "/kg",
    seller: "Organic Corner",
    stock: 12,
    availability: "Available",
    status: "in-stock",
    description: "Fresh dark green prickled Indian karela, revered for blood purification.",
    image: "images/bitter_gourd.jpg",
    icon: "🥒",
    prevPrice: 60,
    rating: 4.7
  },
  {
    id: "veg-15",
    name: "Bottle Gourd (Lauki)",
    category: "green-veg",
    price: 30,
    unit: "/piece",
    seller: "Green Farm",
    stock: 14,
    availability: "Available",
    status: "in-stock",
    description: "Fresh tender lauki with pale green smooth flesh, ideal for light curries.",
    image: "images/bottle_gourd.jpg",
    icon: "🥒",
    prevPrice: 35,
    rating: 4.7
  },
  {
    id: "veg-16",
    name: "Pumpkin (Kaddu)",
    category: "fruit-veg",
    price: 28,
    unit: "/kg",
    seller: "Kisan Mandi Direct",
    stock: 24,
    availability: "Available",
    status: "in-stock",
    description: "Hearty golden-orange sweet pumpkin harvest, velvety and nutritious.",
    image: "images/pumpkin.jpg",
    icon: "🎃",
    prevPrice: 28,
    rating: 4.8
  },
  {
    id: "veg-17",
    name: "Green Chilli (Hari Mirch)",
    category: "green-veg",
    price: 20,
    unit: "/250g",
    seller: "Fresh Basket",
    stock: 14,
    availability: "Fresh today",
    status: "in-stock",
    description: "Vibrant spicy green chillies delivering authentic Indian tadka heat.",
    image: "images/green_chilli.jpg",
    icon: "🌶️",
    prevPrice: 25,
    rating: 4.8
  },
  {
    id: "veg-18",
    name: "Garlic (Lahsun)",
    category: "bulb",
    price: 90,
    unit: "/250g",
    seller: "Organic Corner",
    stock: 4,
    availability: "Limited stock",
    status: "limited",
    description: "Premium single-clove and mountain garlic with aromatic essential oils.",
    image: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=600&auto=format&fit=crop&q=80",
    icon: "🧄",
    prevPrice: 110,
    rating: 4.9
  },
  {
    id: "veg-19",
    name: "Ginger (Adrak)",
    category: "root",
    price: 50,
    unit: "/250g",
    seller: "Green Farm",
    stock: 9,
    availability: "Available",
    status: "in-stock",
    description: "Aromatic golden-fleshed ginger roots, intensely fresh and punchy.",
    image: "images/ginger.jpg",
    icon: "🫚",
    prevPrice: 55,
    rating: 4.8
  },
  {
    id: "veg-20",
    name: "Beetroot (Chukandar)",
    category: "root",
    price: 45,
    unit: "/kg",
    seller: "Local Harvest",
    stock: 18,
    availability: "Available",
    status: "in-stock",
    description: "Ruby-red earth globes, sweet and brimming with folate and minerals.",
    image: "https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?w=600&auto=format&fit=crop&q=80",
    icon: "🫐",
    prevPrice: 45,
    rating: 4.6
  },
  {
    id: "veg-21",
    name: "Fresh Coriander (Dhaniya)",
    category: "leafy",
    price: 15,
    unit: "/bunch",
    seller: "Kisan Mandi Direct",
    stock: 30,
    availability: "Fresh today",
    status: "in-stock",
    description: "Fragrant morning bunches of fresh desi coriander leaves.",
    image: "images/coriander.jpg",
    icon: "🌿",
    prevPrice: 20,
    rating: 4.9
  },
  {
    id: "veg-22",
    name: "Juicy Lemon (Nimbu)",
    category: "seasonal",
    price: 30,
    unit: "/250g",
    seller: "Fresh Basket",
    stock: 0,
    availability: "Out of stock",
    status: "out-of-stock",
    description: "Sun-ripened yellow juicy lemons, returning in tomorrow morning batch.",
    image: "images/lemon.jpg",
    icon: "🍋",
    prevPrice: 35,
    rating: 4.5
  }
];

// Price Comparison Dataset across different local sellers
const PRICE_COMPARISONS = {
  "veg-01": {
    name: "Tomato (Tamatar)",
    unit: "/kg",
    sellers: [
      { seller: "Kisan Mandi Direct", price: 38, location: "Mandi Yard Gate 2", freshness: "Picked 4 hrs ago", rating: 4.7, isBestValue: true },
      { seller: "Green Farm", price: 40, location: "North Sector 4", freshness: "Picked 6 hrs ago", rating: 4.8 },
      { seller: "Fresh Basket", price: 42, location: "Central Market", freshness: "Daily Morning", rating: 4.6 },
      { seller: "Local Harvest", price: 45, location: "West Extension", freshness: "Fresh Lot", rating: 4.5 }
    ]
  },
  "veg-02": {
    name: "Potato (Aloo)",
    unit: "/kg",
    sellers: [
      { seller: "Kisan Mandi Direct", price: 28, location: "Mandi Yard Gate 2", freshness: "Sun-dried", rating: 4.6, isBestValue: true },
      { seller: "Local Harvest", price: 30, location: "West Extension", freshness: "Cleaned Lot", rating: 4.7 },
      { seller: "Fresh Basket", price: 31, location: "Central Market", freshness: "Daily Stock", rating: 4.5 },
      { seller: "Green Farm", price: 32, location: "North Sector 4", freshness: "Graded A", rating: 4.8 }
    ]
  },
  "veg-03": {
    name: "Onion (Pyaaz)",
    unit: "/kg",
    sellers: [
      { seller: "Kisan Mandi Direct", price: 33, location: "Mandi Yard Gate 2", freshness: "Direct Farmer", rating: 4.5, isBestValue: true },
      { seller: "Fresh Basket", price: 35, location: "Central Market", freshness: "Nasik Red", rating: 4.6 },
      { seller: "Local Harvest", price: 36, location: "West Extension", freshness: "Sorted Dry", rating: 4.5 },
      { seller: "Green Farm", price: 38, location: "North Sector 4", freshness: "Select Big", rating: 4.7 }
    ]
  },
  "veg-04": {
    name: "Carrot (Gajar)",
    unit: "/kg",
    sellers: [
      { seller: "Local Harvest", price: 58, location: "West Extension", freshness: "Field Washed", rating: 4.6, isBestValue: true },
      { seller: "Organic Corner", price: 60, location: "Green Valley Rd", freshness: "Bio-grown", rating: 4.9 },
      { seller: "Green Farm", price: 65, location: "North Sector 4", freshness: "Crunchy Sweet", rating: 4.8 }
    ]
  },
  "veg-06": {
    name: "Cauliflower (Phool Gobhi)",
    unit: "/piece",
    sellers: [
      { seller: "Kisan Mandi Direct", price: 42, location: "Mandi Yard Gate 2", freshness: "Morning Arrival", rating: 4.5, isBestValue: true },
      { seller: "Local Harvest", price: 45, location: "West Extension", freshness: "Snow White", rating: 4.7 },
      { seller: "Fresh Basket", price: 48, location: "Central Market", freshness: "Leaf Shielded", rating: 4.6 }
    ]
  },
  "veg-07": {
    name: "Spinach (Palak)",
    unit: "/bunch",
    sellers: [
      { seller: "Kisan Mandi Direct", price: 22, location: "Mandi Yard Gate 2", freshness: "Cut at 5 AM", rating: 4.6, isBestValue: true },
      { seller: "Green Farm", price: 25, location: "North Sector 4", freshness: "Hydro-rinsed", rating: 4.9 },
      { seller: "Organic Corner", price: 30, location: "Green Valley Rd", freshness: "Chemical Free", rating: 4.8 }
    ]
  },
  "veg-08": {
    name: "Capsicum (Shimla Mirch)",
    unit: "/kg",
    sellers: [
      { seller: "Organic Corner", price: 70, location: "Green Valley Rd", freshness: "Polyhouse Grown", rating: 4.8, isBestValue: true },
      { seller: "Fresh Basket", price: 72, location: "Central Market", freshness: "Firm & Crisp", rating: 4.6 },
      { seller: "Local Harvest", price: 75, location: "West Extension", freshness: "Selected Grade", rating: 4.5 }
    ]
  }
};

// Initial Dashboard Stats
const INITIAL_STATS = {
  totalVegetables: 22,
  itemsInStock: 21,
  ordersToday: 32,
  avgBasketValue: 285,
  localSellersCount: 5,
  avgDeliveryMin: "30–60 min"
};

// Category Definitions
const CATEGORIES = [
  { id: "all", label: "All Vegetables", icon: "🧺" },
  { id: "root", label: "Root Vegetables", icon: "🥔" },
  { id: "fruit-veg", label: "Fruits & Vegetables", icon: "🍅" },
  { id: "leafy", label: "Leafy Vegetables", icon: "🥬" },
  { id: "green-veg", label: "Green Vegetables", icon: "🌶️" },
  { id: "bulb", label: "Bulbs", icon: "🧅" },
  { id: "seasonal", label: "Seasonal", icon: "🥕" }
];
