import api from "./api";

export const reviewsService = {
  async listar(livroId) {
    const response = await api.get(`/livros/${livroId}/reviews`);
    return response.data;
  },

  async criar(livroId, dados) {
    const response = await api.post(`/livros/${livroId}/reviews`, dados);
    return response.data;
  },
};
