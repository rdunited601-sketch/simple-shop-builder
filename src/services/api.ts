import axios from "axios";

// Mock data - replace BASE_URL with your Express backend URL when ready
const BASE_URL = "/api";

const api = axios.create({ baseURL: BASE_URL });

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---- MOCK DATA ----
let mockProducts = [
  { _id: "1", name: "Wireless Headphones", price: 59.99, description: "Bluetooth over-ear headphones with noise cancellation.", category: "Electronics" },
  { _id: "2", name: "Running Shoes", price: 89.99, description: "Lightweight running shoes for daily training.", category: "Footwear" },
  { _id: "3", name: "Backpack", price: 39.99, description: "Water-resistant 25L backpack for travel and work.", category: "Accessories" },
  { _id: "4", name: "Desk Lamp", price: 24.99, description: "Adjustable LED desk lamp with USB charging port.", category: "Home" },
  { _id: "5", name: "Water Bottle", price: 14.99, description: "Insulated stainless steel bottle, 750ml.", category: "Accessories" },
  { _id: "6", name: "Notebook Set", price: 9.99, description: "Pack of 3 lined notebooks, A5 size.", category: "Stationery" },
];

let mockOrders: any[] = [
  { _id: "o1", userId: "u1", products: [{ productId: "1", name: "Wireless Headphones", quantity: 1, price: 59.99 }], totalAmount: 59.99, status: "Processing", createdAt: "2025-06-01" },
  { _id: "o2", userId: "u1", products: [{ productId: "2", name: "Running Shoes", quantity: 2, price: 89.99 }], totalAmount: 179.98, status: "Shipped", createdAt: "2025-06-10" },
];

let mockUsers: any[] = [
  { _id: "u1", name: "John Doe", email: "john@example.com", password: "password123", isAdmin: false },
  { _id: "admin1", name: "Admin", email: "admin@example.com", password: "admin123", isAdmin: true },
];

let nextProductId = 7;
let nextOrderId = 3;

// ---- MOCK API FUNCTIONS ----

// Use mock = true while no backend. Set to false when Express server is ready.
const USE_MOCK = true;

export const register = async (name: string, email: string, password: string) => {
  if (USE_MOCK) {
    if (mockUsers.find((u) => u.email === email)) {
      throw new Error("User already exists");
    }
    const newUser = { _id: `u${Date.now()}`, name, email, password, isAdmin: false };
    mockUsers.push(newUser);
    const token = btoa(JSON.stringify({ id: newUser._id, name, email, isAdmin: false }));
    return { token, user: { _id: newUser._id, name, email, isAdmin: false } };
  }
  const res = await api.post("/auth/register", { name, email, password });
  return res.data;
};

export const login = async (email: string, password: string) => {
  if (USE_MOCK) {
    const user = mockUsers.find((u) => u.email === email && u.password === password);
    if (!user) throw new Error("Invalid credentials");
    const token = btoa(JSON.stringify({ id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin }));
    return { token, user: { _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } };
  }
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const getProducts = async () => {
  if (USE_MOCK) return mockProducts;
  const res = await api.get("/products");
  return res.data;
};

export const createProduct = async (product: { name: string; price: number; description: string; category: string }) => {
  if (USE_MOCK) {
    const newProduct = { ...product, _id: String(nextProductId++) };
    mockProducts.push(newProduct);
    return newProduct;
  }
  const res = await api.post("/products", product);
  return res.data;
};

export const createOrder = async (products: any[], totalAmount: number) => {
  if (USE_MOCK) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const newOrder = { _id: `o${nextOrderId++}`, userId: user._id || "guest", products, totalAmount, status: "Processing", createdAt: new Date().toISOString().split("T")[0] };
    mockOrders.push(newOrder);
    return newOrder;
  }
  const res = await api.post("/orders", { products, totalAmount });
  return res.data;
};

export const getOrders = async () => {
  if (USE_MOCK) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.isAdmin) return mockOrders;
    return mockOrders.filter((o) => o.userId === user._id);
  }
  const res = await api.get("/orders");
  return res.data;
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  if (USE_MOCK) {
    const order = mockOrders.find((o) => o._id === orderId);
    if (order) order.status = status;
    return order;
  }
  const res = await api.put(`/orders/${orderId}`, { status });
  return res.data;
};

export default api;
