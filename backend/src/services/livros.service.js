const { LivrosRepository } = require("../repositories");

class LivrosService {
  constructor() {
    this.livrosRepository = new LivrosRepository();
  }

  async listarTodos() {
    return await this.livrosRepository.findAll();
  }

  async buscarPorId(id) {
    const livro = await this.livrosRepository.findById(id);
    if (!livro) {
      const error = new Error("Livro não encontrado");
      error.statusCode = 404;
      throw error;
    }
    return livro;
  }

  async criar(dados) {
    const anoAtual = new Date().getFullYear();
    if (dados.ano > anoAtual + 5) {
      const error = new Error("O ano do livro não pode ser muito no futuro");
      error.statusCode = 400;
      throw error;
    }

    return await this.livrosRepository.create(dados);
  }

  async atualizar(id, dados) {
    return await this.livrosRepository.update(id, dados);
  }

  async remover(id) {
    return await this.livrosRepository.delete(id);
  }
}

module.exports = LivrosService;
