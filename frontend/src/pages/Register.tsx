import AuthForm from "../components/AuthForm";
import { Link } from "react-router-dom";

interface Props {
  onAuth: (token: string) => void;
}

export default function Register({ onAuth }: Props) {
  return (
    <div className="auth-page">
      <h2>Register</h2>
      <AuthForm mode="register" onSuccess={onAuth} />

      <p style={{ marginTop: "10px", textAlign: "center" }}>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "blue" }}>
          Login
        </Link>
      </p>
    </div>
  );
}
