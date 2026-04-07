import { useState, useEffect } from "react";
import { getOrders } from "@/services/api";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) { navigate("/login"); return; }
    getOrders().then((data) => { setOrders(data); setLoading(false); });
  }, [navigate]);

  if (loading) return <div className="text-center py-20 text-muted-foreground">Loading orders...</div>;

  if (orders.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">No Orders Yet</h1>
        <button onClick={() => navigate("/products")} className="bg-primary text-primary-foreground px-4 py-2 rounded hover:opacity-90">Browse Products</button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div key={order._id} className="border border-border rounded-lg p-4 bg-card text-card-foreground">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Order #{order._id}</span>
              <span className={`text-sm font-medium px-2 py-0.5 rounded ${
                order.status === "Delivered" ? "bg-green-100 text-green-800" :
                order.status === "Shipped" ? "bg-blue-100 text-blue-800" :
                "bg-yellow-100 text-yellow-800"
              }`}>{order.status}</span>
            </div>
            <div className="text-sm text-muted-foreground mb-2">Date: {order.createdAt}</div>
            <ul className="text-sm space-y-1 mb-2">
              {order.products.map((p: any, i: number) => (
                <li key={i}>{p.name} × {p.quantity} — ${(p.price * p.quantity).toFixed(2)}</li>
              ))}
            </ul>
            <div className="font-bold text-right">Total: ${order.totalAmount.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
