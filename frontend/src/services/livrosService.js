import api from './api';

const listar = async () => {
  const response = await api.get('/livros');
  return response.data;
};

const criar = async (dados) => {
  const response = await api.post('/livros', dados);
  return response.data;
};

const buscarPorId = async (id) => {
  const response = await api.get(`/livros/${id}`);
  return response.data;
};

const atualizar = async (id, dados) => {
  const response = await api.put(`/livros/${id}`, dados);
  return response.data;
};

const remover = async (id) => {
  const response = await api.delete(`/livros/${id}`);
  return response.data;
};

const livrosService = {
  listar,
  criar,
  buscarPorId,
  atualizar,
  remover
};

export default livrosService;