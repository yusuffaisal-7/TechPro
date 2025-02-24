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

    // Seed some initial products
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
      // Add more sample products as needed
    ];

    sampleProducts.forEach((product) => {
      this.createProduct(product);
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
