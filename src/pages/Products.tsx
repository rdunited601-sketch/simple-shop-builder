import { useState, useEffect, useMemo } from "react";
import { getProducts } from "@/services/api";
import ProductCard from "@/components/ProductCard";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    getProducts().then((data) => { setProducts(data); setLoading(false); });
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category)));
    return ["All", ...cats];
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  const handleAddToCart = (product: any) => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item) => item._id === product._id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ _id: product._id, name: product.name, price: product.price, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  if (loading) return <div className="text-center py-20 text-muted-foreground">Loading products...</div>;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to ShopEasy</h1>
          <p className="text-lg sm:text-xl opacity-90 mb-6">
            Discover quality products at unbeatable prices. Shop smart, shop easy.
          </p>
          <div className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-5 py-2.5 rounded-full text-sm font-medium">
            🔥 Free shipping on orders over $50
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <div className="max-w-6xl mx-auto px-4 pt-8">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-input bg-background px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">
          {selectedCategory === "All" ? "All Products" : selectedCategory}
          <span className="text-muted-foreground text-base font-normal ml-2">({filtered.length})</span>
        </h2>
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No products found matching your search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
