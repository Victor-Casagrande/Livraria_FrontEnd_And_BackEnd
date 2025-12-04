import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.erro || "Erro ao fazer login");
    }
  };

  return (
    <div className="container">
      <div
        className="auth-card"
        style={{
          maxWidth: "400px",
          margin: "50px auto",
          padding: "30px",
          borderRadius: "8px",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h1>

        {error && <p className="alert alert-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Usuário:</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
          </div>
          <div className="input-group">
            <label>Senha:</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "10px" }}
          >
            Entrar
          </button>
        </form>

        <div
          style={{ marginTop: "15px", textAlign: "center", fontSize: "0.9rem" }}
        >
          <Link
            to="/forgot-password"
            style={{ color: "var(--text-secondary)", textDecoration: "none" }}
          >
            Esqueci minha senha
          </Link>
        </div>

        <div
          style={{ marginTop: "10px", textAlign: "center", fontSize: "0.9rem" }}
        >
          Ainda não tem conta? <Link to="/register">Registre-se</Link>
        </div>
      </div>
    </div>
  );
}
