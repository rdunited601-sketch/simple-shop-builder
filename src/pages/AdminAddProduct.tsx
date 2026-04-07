import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "@/services/api";

const AdminAddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.isAdmin) navigate("/products");
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct({ name, price: parseFloat(price), description, category });
      setMessage("Product added successfully!");
      setName(""); setPrice(""); setDescription(""); setCategory("");
    } catch {
      setMessage("Failed to add product");
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-card text-card-foreground border border-border rounded-lg p-6">
        {message && <p className="text-sm text-center text-primary">{message}</p>}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Product Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
            className="border border-input bg-background rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Price ($)</label>
          <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required
            className="border border-input bg-background rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={3}
            className="border border-input bg-background rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Category</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required
            className="border border-input bg-background rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <button type="submit" className="bg-primary text-primary-foreground py-2 rounded font-medium hover:opacity-90 transition-opacity">Add Product</button>
      </form>
    </div>
  );
};

export default AdminAddProduct;
