import React, { useState, useEffect } from "react";
import { reviewsService } from "../services/reviewsService";
import { useAuth } from "../contexts/AuthContext";
import "./ReviewsModal.css";

const ReviewsModal = ({ livro, onClose }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    carregarReviews();
  }, [livro]);

  const carregarReviews = async () => {
    try {
      const data = await reviewsService.listar(livro.id);
      setReviews(data);
    } catch (error) {
      console.error("Erro ao carregar reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comentario.trim()) return;

    setSubmitting(true);
    try {
      await reviewsService.criar(livro.id, { nota, comentario });
      setComentario("");
      setNota(5);
      await carregarReviews();
    } catch (error) {
      alert("Erro ao enviar avaliação.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!livro) return null;

  return (
    <div className="reviews-modal-overlay" onClick={onClose}>
      <div
        className="reviews-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="reviews-header">
          <h2>Avaliações: {livro.titulo}</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="reviews-list">
          {loading ? (
            <p>Carregando...</p>
          ) : reviews.length === 0 ? (
            <p>Nenhuma avaliação ainda. Seja o primeiro!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <span className="review-user">{review.username}</span>
                  <span className="review-rating">
                    {"★".repeat(review.nota)}
                    {"☆".repeat(5 - review.nota)}
                  </span>
                </div>
                <p>{review.comentario}</p>
                <div className="review-date">
                  {new Date(review.created_at).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="new-review-form">
          <h3>Deixe sua avaliação</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "10px" }}>
              <label>Nota: </label>
              <select
                value={nota}
                onChange={(e) => setNota(Number(e.target.value))}
                className="rating-select"
              >
                <option value="5">5 ★★★★★</option>
                <option value="4">4 ★★★★</option>
                <option value="3">3 ★★★</option>
                <option value="2">2 ★★</option>
                <option value="1">1 ★</option>
              </select>
            </div>
            <textarea
              placeholder="Escreva seu comentário..."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              className="comment-input"
              required
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
              style={{ width: "100%" }}
            >
              {submitting ? "Enviando..." : "Enviar Avaliação"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewsModal;
