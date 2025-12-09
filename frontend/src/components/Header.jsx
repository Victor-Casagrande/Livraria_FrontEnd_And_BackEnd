import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import "./Header.css";

const Header = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span style={{ color: "var(--text-color)" }}>Livraria</span>App
        </Link>

        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>

            {user ? (
              <>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/livros">Livros</Link>
                </li>
                <li>
                  <Link to="/favoritos">Favoritos</Link>
                </li>

                <li
                  style={{
                    borderLeft: "1px solid var(--border-color)",
                    height: "20px",
                    margin: "0 5px",
                  }}
                ></li>

                <li
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <button
                    onClick={logout}
                    className="btn-logout"
                    title="Sair do sistema"
                  >
                    Sair
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    style={{
                      backgroundColor: "var(--primary-color)",
                      color: "#fff",
                      padding: "8px 16px",
                      borderRadius: "4px",
                    }}
                  >
                    Criar Conta
                  </Link>
                </li>
              </>
            )}

            <li>
              <button
                onClick={toggleTheme}
                className="theme-toggle"
                title="Mudar Tema"
              >
                {theme === "light" ? "🌙" : "☀️"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
