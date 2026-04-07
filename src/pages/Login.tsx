import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "@/services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("auth-change"));
      navigate("/products");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-card text-card-foreground border border-border rounded-lg p-8 w-full max-w-md shadow-sm flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        {error && <p className="text-destructive text-sm text-center">{error}</p>}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
            className="border border-input bg-background rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="john@example.com" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
            className="border border-input bg-background rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="••••••••" />
        </div>
        <button type="submit" className="bg-primary text-primary-foreground py-2 rounded font-medium hover:opacity-90 transition-opacity">Login</button>
        <p className="text-sm text-center text-muted-foreground">
          Don't have an account? <Link to="/signup" className="text-primary underline">Sign up</Link>
        </p>
        <p className="text-xs text-muted-foreground text-center">Demo: john@example.com / password123 or admin@example.com / admin123</p>
      </form>
    </div>
  );
};

export default Login;
