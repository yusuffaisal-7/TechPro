import { users, products, reviews, type User, type InsertUser, type Product, type InsertProduct, type Review, type InsertReview } from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Reviews
  getReviews(): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private reviews: Map<number, Review>;
  private currentId: { users: number; products: number; reviews: number };

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.reviews = new Map();
    this.currentId = { users: 1, products: 1, reviews: 1 };

    // Seed more products
    const sampleProducts: InsertProduct[] = [
      {
        name: "Premium Laptop",
        description: "High-performance laptop for professionals",
        price: 1299,
        imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
        category: "Computers",
      },
      {
        name: "Wireless Earbuds",
        description: "Premium sound quality with noise cancellation",
        price: 199,
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        category: "Audio",
      },
      {
        name: "4K Smart TV",
        description: "65-inch OLED display with smart features",
        price: 1499,
        imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1",
        category: "TVs",
      },
      {
        name: "Gaming Console",
        description: "Next-gen gaming with 4K graphics",
        price: 499,
        imageUrl: "https://images.unsplash.com/photo-1605901309584-818e25960a8f",
        category: "Gaming",
      },
      {
        name: "Smart Watch",
        description: "Track fitness and stay connected",
        price: 299,
        imageUrl: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a",
        category: "Wearables",
      },
      {
        name: "Professional Camera",
        description: "Capture stunning photos and videos",
        price: 899,
        imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
        category: "Cameras",
      },
      {
        name: "Wireless Mouse",
        description: "Ergonomic design with precision tracking",
        price: 79,
        imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
        category: "Accessories",
      },
      {
        name: "Mechanical Keyboard",
        description: "Premium typing experience with RGB lighting",
        price: 149,
        imageUrl: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
        category: "Accessories",
      },
      {
        name: "Gaming Monitor",
        description: "144Hz refresh rate for smooth gaming",
        price: 349,
        imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
        category: "Monitors",
      },
      {
        name: "Wireless Router",
        description: "High-speed WiFi 6 connectivity",
        price: 199,
        imageUrl: "https://images.unsplash.com/photo-1544428571-7f98c71a8822",
        category: "Networking",
      },
      {
        name: "Smart Speaker",
        description: "Voice-controlled home assistant",
        price: 99,
        imageUrl: "https://images.unsplash.com/photo-1512446816042-444d641267d4",
        category: "Audio",
      },
      {
        name: "External SSD",
        description: "1TB portable storage solution",
        price: 159,
        imageUrl: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58",
        category: "Storage",
      },
      {
        name: "Graphic Tablet",
        description: "Digital drawing and design tool",
        price: 249,
        imageUrl: "https://images.unsplash.com/photo-1526925712774-2833a7ecd0d4",
        category: "Accessories",
      },
      {
        name: "Webcam",
        description: "1080p HD video for streaming",
        price: 79,
        imageUrl: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da",
        category: "Accessories",
      },
      {
        name: "Bluetooth Speaker",
        description: "Portable waterproof speaker",
        price: 129,
        imageUrl: "https://images.unsplash.com/photo-1589003077984-894e133dabab",
        category: "Audio",
      },
      {
        name: "Gaming Headset",
        description: "Surround sound with noise cancellation",
        price: 129,
        imageUrl: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb",
        category: "Gaming",
      },
      {
        name: "Smart Doorbell",
        description: "HD video with motion detection",
        price: 179,
        imageUrl: "https://images.unsplash.com/photo-1558089687-f282ffcbc126",
        category: "Smart Home",
      },
      {
        name: "Wireless Charger",
        description: "Fast charging for all devices",
        price: 49,
        imageUrl: "https://images.unsplash.com/photo-1622445275463-afa2ab738c34",
        category: "Accessories",
      },
      {
        name: "Tablet",
        description: "10-inch display with stylus support",
        price: 449,
        imageUrl: "https://images.unsplash.com/photo-1561154464-82e9adf32764",
        category: "Tablets",
      },
      {
        name: "Smart Scale",
        description: "Track weight and body composition",
        price: 89,
        imageUrl: "https://images.unsplash.com/photo-1576511897367-ac90f3c86ea2",
        category: "Smart Home",
      },
      {
        name: "Action Camera",
        description: "4K video for adventure sports",
        price: 299,
        imageUrl: "https://images.unsplash.com/photo-1526315251174-de0107e28fb4",
        category: "Cameras",
      },
      {
        name: "Smart Thermostat",
        description: "Energy-efficient climate control",
        price: 199,
        imageUrl: "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a",
        category: "Smart Home",
      },
      {
        name: "Portable Power Bank",
        description: "20000mAh high-capacity charging",
        price: 69,
        imageUrl: "https://images.unsplash.com/photo-1609592786331-b7f8796572d7",
        category: "Accessories",
      },
      {
        name: "Smart Light Bulbs",
        description: "Color changing WiFi enabled",
        price: 39,
        imageUrl: "https://images.unsplash.com/photo-1550985543-49d5df93d3df",
        category: "Smart Home",
      },
      {
        name: "Phone Stand",
        description: "Adjustable desk mount",
        price: 29,
        imageUrl: "https://images.unsplash.com/photo-1586105251261-72a756497a11",
        category: "Accessories",
      },
      {
        name: "USB Hub",
        description: "7-port USB 3.0 expansion",
        price: 39,
        imageUrl: "https://images.unsplash.com/photo-1636413362677-83f2af9ed399",
        category: "Accessories",
      },
      {
        name: "Desk Lamp",
        description: "LED with wireless charging",
        price: 79,
        imageUrl: "https://images.unsplash.com/photo-1534281368625-f738746dddaa",
        category: "Accessories",
      },
      {
        name: "Security Camera",
        description: "1080p indoor camera with night vision",
        price: 129,
        imageUrl: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb",
        category: "Smart Home",
      },
      {
        name: "Car Charger",
        description: "Dual USB fast charging",
        price: 24,
        imageUrl: "https://images.unsplash.com/photo-1612815291912-91fb2ed12c44",
        category: "Accessories",
      },
      {
        name: "Wireless Keyboard",
        description: "Slim design with long battery life",
        price: 89,
        imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
        category: "Accessories",
      },
    ];

    sampleProducts.forEach((product) => {
      this.createProduct(product);
    });

    // Create admin user
    this.createUser({
      username: "admin",
      password: "Faisal1234",
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId.users++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentId.products++;
    const product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async getReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values());
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.currentId.reviews++;
    const review = { ...insertReview, id, createdAt: new Date() };
    this.reviews.set(id, review);
    return review;
  }
}

export const storage = new MemStorage();