import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "@/services/api";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [placing, setPlacing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const changeQuantity = (id: string, delta: number) => {
    const newCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    updateCart(newCart);
  };

  const removeItem = (id: string) => {
    updateCart(cart.filter((item) => item._id !== id));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    const user = localStorage.getItem("user");
    if (!user) { navigate("/login"); return; }
    setPlacing(true);
    try {
      const orderProducts = cart.map((item) => ({
        productId: item._id, name: item.name, quantity: item.quantity, price: item.price,
      }));
      await createOrder(orderProducts, totalAmount);
      localStorage.removeItem("cart");
      setCart([]);
      alert("Order placed successfully!");
      navigate("/orders");
    } catch {
      alert("Failed to place order");
    }
    setPlacing(false);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <button onClick={() => navigate("/products")} className="bg-primary text-primary-foreground px-4 py-2 rounded hover:opacity-90">Browse Products</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div key={item._id} className="border border-border rounded-lg p-4 bg-card text-card-foreground flex items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => changeQuantity(item._id, -1)} className="border border-input rounded w-8 h-8 flex items-center justify-center hover:bg-accent">−</button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button onClick={() => changeQuantity(item._id, 1)} className="border border-input rounded w-8 h-8 flex items-center justify-center hover:bg-accent">+</button>
            </div>
            <span className="font-bold w-20 text-right">${(item.price * item.quantity).toFixed(2)}</span>
            <button onClick={() => removeItem(item._id)} className="text-destructive text-sm hover:underline">Remove</button>
          </div>
        ))}
      </div>
      <div className="mt-6 border-t border-border pt-4 flex items-center justify-between">
        <span className="text-xl font-bold">Total: ${totalAmount.toFixed(2)}</span>
        <button onClick={handlePlaceOrder} disabled={placing}
          className="bg-primary text-primary-foreground px-6 py-2 rounded font-medium hover:opacity-90 disabled:opacity-50 transition-opacity">
          {placing ? "Placing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
