import React, { useState, useEffect } from 'react';
import './LivroForm.css';

const LivroForm = ({ livro, onSubmit, onCancel }) => {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [ano, setAno] = useState('');
  const [editora, setEditora] = useState('');
  const [categoria, setCategoria] = useState('');
  const [capa, setCapa] = useState(null);

  useEffect(() => {
    if (livro) {
      setTitulo(livro.titulo || '');
      setAutor(livro.autor || '');
      setAno(livro.ano || '');
      setEditora(livro.editora || '');
      setCategoria(livro.categoria || '');
    }
  }, [livro]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCapa(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('titulo', titulo);
    data.append('autor', autor);
    data.append('ano', ano);
    data.append('editora', editora);
    data.append('categoria', categoria);
    
    if (capa) {
      data.append('capa', capa);
    }

    onSubmit(data);
  };

  return (
    <div className="livro-form-overlay">
      <div className="livro-form-container">
        <h2>{livro ? 'Editar Livro' : 'Novo Livro'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="titulo">Título *</label>
            <input type="text" id="titulo" value={titulo} onChange={e => setTitulo(e.target.value)} required />
          </div>

          <div className="input-group">
            <label htmlFor="autor">Autor *</label>
            <input type="text" id="autor" value={autor} onChange={e => setAutor(e.target.value)} required />
          </div>

          <div className="input-group">
            <label htmlFor="ano">Ano *</label>
            <input type="number" id="ano" value={ano} onChange={e => setAno(e.target.value)} required min="1000" max="9999" />
          </div>

          <div className="input-group">
            <label htmlFor="editora">Editora</label>
            <input type="text" id="editora" value={editora} onChange={e => setEditora(e.target.value)} />
          </div>
          
          <div className="input-group">
            <label htmlFor="categoria">Categoria</label>
            <input type="text" id="categoria" value={categoria} onChange={e => setCategoria(e.target.value)} placeholder="Ex: Ficção, Técnico..." />
          </div>

          {/* Tarefa 2: Input de Arquivo */}
          <div className="input-group">
            <label htmlFor="capa">Capa do Livro</label>
            <input type="file" id="capa" onChange={handleFileChange} accept="image/*" />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn btn-secondary">Cancelar</button>
            <button type="submit" className="btn btn-success">{livro ? 'Atualizar' : 'Criar'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LivroForm;