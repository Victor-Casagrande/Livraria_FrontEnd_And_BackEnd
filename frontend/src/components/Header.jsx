import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header style={{ padding: '1rem', background: '#eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2>Livraria App</h2>
      <nav>
        {user ? (
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
             <span>Olá, <strong>{user.username}</strong></span>
             <Link to="/">Home</Link>
             <Link to="/livros">Livros</Link>
             <button onClick={handleLogout} className="btn-danger">Sair</button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '15px' }}>
            <Link to="/login">Login</Link>
            <Link to="/register">Registar</Link>
          </div>
        )}
      </nav>
    </header>
  );
}