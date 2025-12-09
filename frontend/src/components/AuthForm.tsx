import { useRef, useState } from "react";
import { request } from "../api/api";

interface Props {
  mode: "login" | "register";
  onSuccess: (token: string) => void;
}

export default function AuthForm({ mode, onSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const firstInputRef = useRef<HTMLInputElement | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const path = mode === "login" ? "/auth/login" : "/auth/register";
      const body: any = { email, password };
      if (mode === "register") body.username = username;

      const data = await request<{ token: string }>(path, {
        method: "POST",
        body: JSON.stringify(body),
      });

      localStorage.setItem("token", data.token);
      onSuccess(data.token);

    } catch (err: any) {
      setError(err.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setEmail("");
    setPassword("");
    setUsername("");
    setError(null);

    // Ensure reset button is actually clickable
    setTimeout(() => firstInputRef.current?.focus(), 10);
  }

  return (
    <div className="auth-card card" style={{ position: "relative", zIndex: 10 }}>
      <h2 style={{ margin: 0, textAlign: "center" }}>
        {mode === "login" ? "Welcome back 💖" : "Join Sweet Notes ✨"}
      </h2>

      <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
        
        {mode === "register" && (
          <input
            ref={firstInputRef}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            disabled={loading}
          />
        )}

        {mode !== "register" && (
          <input
            ref={firstInputRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            disabled={loading}
          />
        )}

        {mode === "register" && (
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            disabled={loading}
          />
        )}

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          disabled={loading}
        />

        {error && (
          <div style={{ color: "#ff6b81", marginTop: 8, fontSize: 14 }}>{error}</div>
        )}

        {/* BUTTON ROW */}
        <div 
          style={{
            display: "flex",
            gap: 10,
            marginTop: 18,
            alignItems: "center",
          }}
        >
          <button
            className="btn"
            type="submit"
            disabled={loading}
            style={{ cursor: "pointer" }}
          >
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Create"}
          </button>

          <button
            type="button"
            className="btn-ghost"
            onClick={handleReset}
            disabled={loading}
            style={{
              cursor: "pointer",
              pointerEvents: "auto", // 🔥 ensures clicks work
            }}
          >
            Reset
          </button>
        </div>
      </form>

    </div>
  );
}
