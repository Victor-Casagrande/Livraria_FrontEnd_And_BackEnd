const { Livro } = require("../models");

class LivrosRepository {
  constructor() {
    this.livro = Livro;
  }

  async findAll() {
    return await this.livro.findAll();
  }

  async findById(id) {
    return await this.livro.findByPk(id);
  }

  async create(dadosLivro) {
    return await this.livro.create({
      titulo: dadosLivro.titulo,
      autor: dadosLivro.autor,
      ano: dadosLivro.ano,
      editora: dadosLivro.editora,
      categoria: dadosLivro.categoria,
      capa: dadosLivro.capa || null,
    });
  }

  async update(id, dados) {
    await this.livro.update(dados, {
      where: { id: id },
    });
    return await this.findById(id);
  }

  async delete(id) {
    const livro = await this.findById(id);
    if (livro) {
      await this.livro.destroy({ where: { id: id } });
      return livro;
    }
    return null;
  }
}

module.exports = LivrosRepository;
