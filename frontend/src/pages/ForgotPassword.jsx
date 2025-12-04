import { useState } from "react";
import { authService } from "../services/authService";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await authService.forgotPassword(email);
      setMessage(
        "Se o e-mail estiver cadastrado, você receberá um link de recuperação."
      );
    } catch (err) {
      setError("Erro ao processar solicitação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "50px" }}>
      <h2>Recuperar Senha</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
          style={{ width: "100%" }}
        >
          {loading ? "Enviando..." : "Enviar Link"}
        </button>
      </form>
      <div style={{ marginTop: "15px", textAlign: "center" }}>
        <Link to="/login">Voltar para Login</Link>
      </div>
    </div>
  );
}
