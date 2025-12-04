import React from "react";
import "./LivroCard.css";

const LivroCard = ({ livro, onEdit, onDelete }) => {
  const baseUrl = "http://localhost:3333";

  return (
    <div className="livro-card">
      {livro.capa ? (
        <img
          src={`${baseUrl}${livro.capa}`}
          alt={`Capa de ${livro.titulo}`}
          className="livro-capa"
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "4px",
            marginBottom: "10px",
          }}
        />
      ) : (
        <div
          className="livro-capa-placeholder"
          style={{
            height: "200px",
            background: "#ddd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "10px",
            borderRadius: "4px",
          }}
        >
          <span>Sem Capa</span>
        </div>
      )}

      <h3>{livro.titulo}</h3>
      <p>
        <strong>Autor:</strong> {livro.autor}
      </p>
      <p>
        <strong>Ano:</strong> {livro.ano}
      </p>
      {livro.categoria && (
        <p>
          <strong>Categoria:</strong> {livro.categoria}
        </p>
      )}

      <div className="card-actions">
        <button onClick={() => onEdit(livro)} className="btn btn-primary">
          ✏️ Editar
        </button>
        <button onClick={() => onDelete(livro.id)} className="btn btn-danger">
          🗑️ Remover
        </button>
      </div>

      <div
        style={{
          marginTop: "10px",
          borderTop: "1px solid #eee",
          paddingTop: "10px",
        }}
      >
        <button
          className="btn btn-secondary"
          style={{ width: "100%", fontSize: "0.8rem" }}
          onClick={() =>
            alert("Funcionalidade de ver reviews seria aberta aqui (Modal)")
          }
        >
          ⭐ Ver Avaliações
        </button>
      </div>
    </div>
  );
};

export default LivroCard;
