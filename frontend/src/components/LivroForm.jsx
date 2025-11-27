import React, { useState, useEffect } from 'react';
import './LivroForm.css';

const LivroForm = ({ livro, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    ano: "",
    categoria: "",
  });

  useEffect(() => {
    if (livro) {
      setFormData({
        titulo: livro.titulo || "",
        autor: livro.autor || "",
        ano: livro.ano || "",
        categoria: livro.categoria || ""
      });
    }
  }, [livro]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="livro-form-overlay">
      <div className="livro-form-container">
        <h2>{livro ? 'Editar Livro' : 'Novo Livro'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="titulo">Título *</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="autor">Autor *</label>
            <input
              type="text"
              id="autor"
              name="autor"
              value={formData.autor}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="categoria">Categoria *</label>
            <input
              type="text"
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="ano">Ano *</label>
            <input
              type="number"
              id="ano"
              name="ano"
              value={formData.ano}
              onChange={handleChange}
              required
              min="1000"
              max="9999"
            />
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancelar
            </button>
            <button type="submit" className="btn btn-success">
              {livro ? 'Atualizar' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LivroForm;