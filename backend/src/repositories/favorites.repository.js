const { Favorite, Livro } = require("../models");

class FavoritesRepository {
  async add(userId, livroId) {
    return await Favorite.create({ user_id: userId, livro_id: livroId });
  }

  async remove(userId, livroId) {
    return await Favorite.destroy({
      where: { user_id: userId, livro_id: livroId },
    });
  }

  async exists(userId, livroId) {
    const fav = await Favorite.findOne({
      where: { user_id: userId, livro_id: livroId },
    });
    return !!fav;
  }

  async listByUser(userId) {
    return await Favorite.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Livro,
          as: "livro",
        },
      ],
    });
  }
}

module.exports = FavoritesRepository;
