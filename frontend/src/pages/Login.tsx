import AuthForm from "../components/AuthForm";
import { Link } from "react-router-dom";

interface Props {
  onAuth: (token: string) => void;
}

export default function Login({ onAuth }: Props) {
  return (
    <div className="auth-page">
      <h1 style={{ textAlign: "left", marginLeft: 8, marginBottom: 12 }}>
        Login
      </h1>

      <AuthForm mode="login" onSuccess={onAuth} />

      <p style={{ textAlign: "center", marginTop: 18 }}>
        Don’t have an account?{" "}
        <Link to="/register" style={{ color: "#8a56ff", fontWeight: 600 }}>
          Register
        </Link>
      </p>
    </div>
  );
}
