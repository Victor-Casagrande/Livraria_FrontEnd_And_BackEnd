import React, { useState, useEffect } from "react";
import "./LivroCard.css";
import { favoritesService } from "../services/favoritesService";
import { useAuth } from "../contexts/AuthContext";

const LivroCard = ({ livro, onEdit, onDelete, onReviews }) => {
  const baseUrl = "http://localhost:3333";
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      checkFavoriteStatus();
    }
  }, [livro.id, user]);

  const checkFavoriteStatus = async () => {
    try {
      const data = await favoritesService.check(livro.id);
      setIsFavorite(data.favorited);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleFavorite = async () => {
    if (!user) return alert("Faça login para favoritar!");
    try {
      const data = await favoritesService.toggle(livro.id);
      setIsFavorite(data.favorited);
    } catch (error) {
      alert("Erro ao favoritar.");
    }
  };

  return (
    <div className="livro-card">
      <button
        onClick={handleToggleFavorite}
        className="btn-favorite"
        title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      <div className="livro-capa-container">
        {livro.capa ? (
          <img
            src={`${baseUrl}${livro.capa}`}
            alt={livro.titulo}
            className="livro-capa"
          />
        ) : (
          <div className="livro-capa-placeholder">
            <span className="placeholder-icon">📖</span>
            <span>Sem Capa</span>
          </div>
        )}
      </div>

      <div className="livro-content">
        <h3 className="livro-title">{livro.titulo}</h3>
        <p className="livro-author">por {livro.autor}</p>

        <div className="livro-info">
          <span>
            {livro.ano} • {livro.categoria || "Geral"}
          </span>
        </div>

        <button className="btn-reviews" onClick={() => onReviews(livro)}>
          Ver Avaliações
        </button>
      </div>

      <div className="card-actions">
        <button onClick={() => onEdit(livro)} className="btn-icon btn-edit">
          Editar
        </button>
        <button
          onClick={() => onDelete(livro.id)}
          className="btn-icon btn-delete"
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default LivroCard;
