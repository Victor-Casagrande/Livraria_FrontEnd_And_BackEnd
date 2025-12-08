import React, { useState, useEffect } from "react";
import { favoritesService } from "../services/favoritesService";
import LivroCard from "../components/LivroCard";
import "./Livros.css";

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarFavoritos();
  }, []);

  const carregarFavoritos = async () => {
    try {
      const data = await favoritesService.listar();
      setFavoritos(data);
    } catch (error) {
      console.error("Erro ao buscar favoritos", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => alert("Edite através da listagem principal.");
  const handleDelete = () => alert("Exclua através da listagem principal.");
  const handleReviews = () => {};

  return (
    <div className="livros-container">
      <h2>Meus Livros Favoritos </h2>
      {loading ? (
        <p>Carregando...</p>
      ) : favoritos.length === 0 ? (
        <p>Você ainda não tem favoritos.</p>
      ) : (
        <div className="livros-grid">
          {favoritos.map((livro) => (
            <LivroCard
              key={livro.id}
              livro={livro}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onReviews={handleReviews}
            />
          ))}
        </div>
      )}
    </div>
  );
}
