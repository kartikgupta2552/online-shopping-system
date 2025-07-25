const products = [
    // Electronics
    {
        id: 1,
        category: "Electronics",
        title: "Smartphone",
        description: "The latest 'smart' thing to distract you.",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
        price: 24999
    },
    {
        id: 2,
        category: "Electronics",
        title: "Headphones",
        description: "Loud enough to drown out your regrets.",
        image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=600&q=80",
        price: 2999
    },
    {
        id: 3,
        category: "Electronics",
        title: "Bluetooth Speaker",
        description: "Now your parties can annoy the neighbors.",
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
        price: 1999
    },
    {
        id: 4,
        category: "Electronics",
        title: "Smart Watch",
        description: "Tells time, counts steps, won't fix your life.",
        image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=600&q=80",
        price: 4999
    },
    {
        id: 5,
        category: "Electronics",
        title: "Wireless Mouse",
        description: "For clicking and pretending to work.",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
        price: 799
    },
    {
        id: 6,
        category: "Electronics",
        title: "Power Bank",
        description: "So your phone dies last, not first.",
        image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=600&q=80",
        price: 1299
    },

    // Fashion & Apparel
    {
        id: 7,
        category: "Fashion & Apparel",
        title: "Denim Jacket",
        description: "Look cool even when you're not.",
        image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
        price: 1899
    },
    {
        id: 8,
        category: "Fashion & Apparel",
        title: "Sneakers",
        description: "For running… away from responsibilities.",
        image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80",
        price: 2499
    },
    {
        id: 9,
        category: "Fashion & Apparel",
        title: "T-Shirt",
        description: "Dress code: casual disappointment.",
        image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
        price: 499
    },
    {
        id: 10,
        category: "Fashion & Apparel",
        title: "Formal Shirt",
        description: "For looking professional during online classes.",
        image: "https://images.unsplash.com/photo-1523381217339-8e063b3aedca?auto=format&fit=crop&w=600&q=80",
        price: 799
    },
    {
        id: 11,
        category: "Fashion & Apparel",
        title: "Backpack",
        description: "Carry your regrets (and books) in style.",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
        price: 1599
    },
    {
        id: 12,
        category: "Fashion & Apparel",
        title: "Sunglasses",
        description: "For when you want to avoid life's glare.",
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
        price: 899
    },

    // Home & Kitchen
    {
        id: 13,
        category: "Home & Kitchen",
        title: "Frying Pan",
        description: "Not just for eggs. For self-defense too.",
        image: "https://images.unsplash.com/photo-1498579809087-ef1e558fd1da?auto=format&fit=crop&w=600&q=80",
        price: 799
    },
    {
        id: 14,
        category: "Home & Kitchen",
        title: "Coffee Maker",
        description: "Fuel for your code and existential dread.",
        image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
        price: 1599
    },
    {
        id: 15,
        category: "Home & Kitchen",
        title: "Table Lamp",
        description: "Light up your late-night breakdowns.",
        image: "https://images.unsplash.com/photo-1519121783345-186d1d403d06?auto=format&fit=crop&w=600&q=80",
        price: 499
    },
    {
        id: 16,
        category: "Home & Kitchen",
        title: "Cushion Set",
        description: "Soft place to land after daily failures.",
        image: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=600&q=80",
        price: 799
    },
    {
        id: 17,
        category: "Home & Kitchen",
        title: "Dinner Set",
        description: "For the fancy meals you’ll never cook.",
        image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3cf1?auto=format&fit=crop&w=600&q=80",
        price: 1499
    },
    {
        id: 18,
        category: "Home & Kitchen",
        title: "Water Bottle",
        description: "Hydration—because your tears don’t count.",
        image: "https://images.unsplash.com/photo-1519865341654-c1e0bd9e2f5b?auto=format&fit=crop&w=600&q=80",
        price: 399
    },

    // Books & Stationery
    {
        id: 19,
        category: "Books & Stationery",
        title: "Science Fiction Novel",
        description: "Escape reality with this thrilling sci-fi adventure.",
        image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
        price: 499
    },
    {
        id: 20,
        category: "Books & Stationery",
        title: "Notebook Set",
        description: "A set of stylish notebooks for your bright ideas.",
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
        price: 299
    },
    {
        id: 21,
        category: "Books & Stationery",
        title: "Gel Pen Pack",
        description: "Smooth writing for your unfinished assignments.",
        image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80",
        price: 99
    },
    {
        id: 22,
        category: "Books & Stationery",
        title: "Diary",
        description: "For secrets you hope no one finds.",
        image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=600&q=80",
        price: 249
    },
    {
        id: 23,
        category: "Books & Stationery",
        title: "Planner",
        description: "Plan your week, ignore by Tuesday.",
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
        price: 199
    },
    {
        id: 24,
        category: "Books & Stationery",
        title: "Desk Organizer",
        description: "Organize your mess, at least visually.",
        image: "https://images.unsplash.com/photo-1512207854144-bb077b4986f2?auto=format&fit=crop&w=600&q=80",
        price: 349
    },

    // Beauty & Personal Care
    {
        id: 25,
        category: "Beauty & Personal Care",
        title: "Face Cream",
        description: "Hydrating cream for glowing skin.",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
        price: 599
    },
    {
        id: 26,
        category: "Beauty & Personal Care",
        title: "Shampoo",
        description: "Keep your hair silky and strong.",
        image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=600&q=80",
        price: 399
    },
    {
        id: 27,
        category: "Beauty & Personal Care",
        title: "Perfume",
        description: "Smell good so you can tolerate yourself.",
        image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
        price: 749
    },
    {
        id: 28,
        category: "Beauty & Personal Care",
        title: "Lip Balm",
        description: "For chapped lips and awkward encounters.",
        image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=600&q=80",
        price: 99
    },
    {
        id: 29,
        category: "Beauty & Personal Care",
        title: "Hair Dryer",
        description: "Seconds to dry, hours to regret.",
        image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80",
        price: 999
    },
    {
        id: 30,
        category: "Beauty & Personal Care",
        title: "Face Wash",
        description: "Wash away dirt, not your worries.",
        image: "https://images.unsplash.com/photo-1515442261605-cd4ce60f7c18?auto=format&fit=crop&w=600&q=80",
        price: 199
    },

    // Sports & Outdoors
    {
        id: 31,
        category: "Sports & Outdoors",
        title: "Yoga Mat",
        description: "Perfect mat for your morning yoga sessions.",
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
        price: 799
    },
    {
        id: 32,
        category: "Sports & Outdoors",
        title: "Running Shoes",
        description: "Comfort and durability for your runs.",
        image: "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=600&q=80",
        price: 2199
    },
    {
        id: 33,
        category: "Sports & Outdoors",
        title: "Skipping Rope",
        description: "For fitness and flashbacks to school.",
        image: "https://images.unsplash.com/photo-1496307653780-42ee777d4842?auto=format&fit=crop&w=600&q=80",
        price: 249
    },
    {
        id: 34,
        category: "Sports & Outdoors",
        title: "Water Bottle",
        description: "Because refilling is exercise too.",
        image: "https://images.unsplash.com/photo-1519865341654-c1e0bd9e2f5b?auto=format&fit=crop&w=600&q=80",
        price: 349
    },
    {
        id: 35,
        category: "Sports & Outdoors",
        title: "Fitness Band",
        description: "Count your steps, not your failures.",
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
        price: 1299
    },
    {
        id: 36,
        category: "Sports & Outdoors",
        title: "Cricket Bat",
        description: "For sixes, or for breaking things.",
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80",
        price: 1599
    }
];

export default products;
