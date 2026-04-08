import { useState, useEffect } from "react";
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

  useEffect(() => {
    getProducts().then((data) => { setProducts(data); setLoading(false); });
  }, []);

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

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">All Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
