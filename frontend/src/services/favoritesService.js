import api from "./api";

export const favoritesService = {
  async toggle(livroId) {
    const response = await api.post(`/favorites/${livroId}`);
    return response.data;
  },

  async listar() {
    const response = await api.get("/favorites");
    return response.data;
  },

  async check(livroId) {
    const response = await api.get(`/favorites/check/${livroId}`);
    return response.data;
  },
};
