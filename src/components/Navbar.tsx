import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // Listen for storage changes (login/logout from other components)
  useEffect(() => {
    const handler = () => {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    };
    window.addEventListener("storage", handler);
    window.addEventListener("auth-change", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("auth-change", handler);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("auth-change"));
    navigate("/login");
  };

  return (
    <nav className="bg-primary text-primary-foreground px-6 py-3 flex items-center justify-between flex-wrap gap-2">
      <Link to="/products" className="text-xl font-bold tracking-tight">🛒 ShopEasy</Link>
      <div className="flex items-center gap-4 flex-wrap">
        <Link to="/products" className="hover:underline">Products</Link>
        {user ? (
          <>
            <Link to="/cart" className="hover:underline">Cart</Link>
            <Link to="/orders" className="hover:underline">Orders</Link>
            {user.isAdmin && (
              <>
                <Link to="/admin/add-product" className="hover:underline text-accent-foreground bg-accent px-2 py-1 rounded text-sm">Add Product</Link>
                <Link to="/admin/orders" className="hover:underline text-accent-foreground bg-accent px-2 py-1 rounded text-sm">Manage Orders</Link>
              </>
            )}
            <span className="text-sm opacity-80">Hi, {user.name}</span>
            <button onClick={handleLogout} className="bg-destructive text-destructive-foreground px-3 py-1 rounded text-sm hover:opacity-90">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
