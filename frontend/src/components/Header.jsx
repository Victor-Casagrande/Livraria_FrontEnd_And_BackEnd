import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import "./Header.css";

const Header = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <h1>Livraria</h1>
        </Link>

        <nav className="nav">
          <button
            onClick={toggleTheme}
            className="btn btn-secondary"
            style={{
              marginRight: "15px",
              padding: "5px 10px",
              fontSize: "1.2rem",
            }}
            title={
              theme === "light" ? "Ativar Modo Escuro" : "Ativar Modo Claro"
            }
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {user ? (
            <>
              <Link to="/" className="nav-link">
                Início
              </Link>
              <Link to="/livros" className="nav-link">
                Livros
              </Link>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <div className="user-info">
                <span>Olá, {user.username}!</span>
                <button onClick={handleLogout} className="btn btn-secondary">
                  Sair
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Registrar
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
