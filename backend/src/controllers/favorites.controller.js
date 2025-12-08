const FavoritesRepository = require("../repositories/favorites.repository");

class FavoritesController {
  constructor() {
    this.favoritesRepository = new FavoritesRepository();
  }

  async toggle(req, res, next) {
    try {
      const userId = req.session.userId;
      const { livroId } = req.params;

      if (!userId) return res.status(401).json({ erro: "Não autenticado" });

      const exists = await this.favoritesRepository.exists(userId, livroId);

      if (exists) {
        await this.favoritesRepository.remove(userId, livroId);
        return res
          .status(200)
          .json({ mensagem: "Removido dos favoritos", favorited: false });
      } else {
        await this.favoritesRepository.add(userId, livroId);
        return res
          .status(201)
          .json({ mensagem: "Adicionado aos favoritos", favorited: true });
      }
    } catch (err) {
      next(err);
    }
  }

  async list(req, res, next) {
    try {
      const userId = req.session.userId;
      if (!userId) return res.status(401).json({ erro: "Não autenticado" });

      const favorites = await this.favoritesRepository.listByUser(userId);
      const livros = favorites.map((f) => f.livro);

      res.status(200).json(livros);
    } catch (err) {
      next(err);
    }
  }

  async check(req, res, next) {
    try {
      const userId = req.session.userId;
      const { livroId } = req.params;
      const exists = await this.favoritesRepository.exists(userId, livroId);
      res.status(200).json({ favorited: exists });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = FavoritesController;
