import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@contexts/AuthContext';
import Header from '@components/Header';
import PrivateRoute from './components/PrivateRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Livros from './pages/Livros';
import './App.css';

export default function App() {
  return (
    <AuthProvider>
        <Header />
        <div className="main-content">
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rotas Privadas */}
            <Route path="/" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />
            
            <Route path="/livros" element={
              <PrivateRoute>
                <Livros />
              </PrivateRoute>
            } />

            {/* Rota para qualquer URL desconhecido */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
    </AuthProvider>
  );
}