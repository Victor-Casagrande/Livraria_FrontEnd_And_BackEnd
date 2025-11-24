import { useEffect, useState } from "react";
import { livrosService } from "../services/livrosService";
import { Link } from "react-router-dom";

export default function Livros() {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      try {
        const dados = await livrosService.listar();
        setLivros(dados);
      } catch (error) {
        console.error("Erro ao carregar livros", error);
      }
    };
    carregar();
  }, []);

  return (
    <div className="container">
      <h1>Lista de Livros</h1>
      <ul>
        {livros.map((livro) => (
          <li key={livro.id} style={{ margin: '10px 0' }}>
            <strong>{livro.titulo}</strong> - {livro.autor} ({livro.ano})
          </li>
        ))}
      </ul>
    </div>
  );
}