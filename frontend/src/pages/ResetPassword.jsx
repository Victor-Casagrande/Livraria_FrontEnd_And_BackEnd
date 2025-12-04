import { useState } from "react";
import { authService } from "../services/authService";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("As senhas não coincidem.");
    }

    try {
      await authService.resetPassword(token, password);
      alert("Senha alterada com sucesso!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.erro || "Erro ao redefinir senha.");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "50px" }}>
      <h2>Nova Senha</h2>
      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Nova Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        <div className="input-group">
          <label>Confirmar Senha:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-success"
          style={{ width: "100%" }}
        >
          Alterar Senha
        </button>
      </form>
    </div>
  );
}
