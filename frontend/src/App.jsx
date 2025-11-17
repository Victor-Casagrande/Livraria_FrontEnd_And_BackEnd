import { useEffect, useState } from "react";
import { livrosService } from "./services/livrosService";
import { Link } from "react-router-dom";

export default function App() {
  const [livros, setLivros] = useState([]);

  const carregarLivros = async () => {
    // 1. Chama o serviço, que chama /api/livros
    const resposta = await livrosService.listar();
    // 2. O Vite redireciona /api/livros para http://localhost:3333/api/livros
    setLivros(resposta);
  };

  useEffect(() => {
    carregarLivros();
  }, []);

  return (
    <div>
      <h1>Lista de Livros</h1>
      <ul>
        {livros.map((livro) => (
          <li key={livro.id}>
            {/* O Link só vai funcionar depois de configurar o main.jsx */}
            <Link to={`/livro/${livro.id}`}>
              {livro.titulo} - {livro.autor}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}