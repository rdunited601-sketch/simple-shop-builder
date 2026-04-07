import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders, updateOrderStatus } from "@/services/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.isAdmin) { navigate("/products"); return; }
    getOrders().then((data) => { setOrders(data); setLoading(false); });
  }, [navigate]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    await updateOrderStatus(orderId, newStatus);
    setOrders(orders.map((o) => o._id === orderId ? { ...o, status: newStatus } : o));
  };

  if (loading) return <div className="text-center py-20 text-muted-foreground">Loading orders...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Orders (Admin)</h1>
      {orders.length === 0 ? (
        <p className="text-muted-foreground text-center py-10">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-border text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3">Order ID</th>
                <th className="text-left p-3">User</th>
                <th className="text-left p-3">Products</th>
                <th className="text-left p-3">Total</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t border-border">
                  <td className="p-3 text-muted-foreground">{order._id}</td>
                  <td className="p-3">{order.userId}</td>
                  <td className="p-3">{order.products.map((p: any) => `${p.name}(${p.quantity})`).join(", ")}</td>
                  <td className="p-3 font-medium">${order.totalAmount.toFixed(2)}</td>
                  <td className="p-3">{order.status}</td>
                  <td className="p-3">
                    <select value={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="border border-input bg-background rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
