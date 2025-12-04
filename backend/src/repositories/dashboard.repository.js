const db = require("../database/sqlite");

class DashboardRepository {
  async getStats() {
    const totalLivros = db
      .prepare("SELECT COUNT(*) as count FROM livros")
      .get().count;

    const totalReviews = db
      .prepare("SELECT COUNT(*) as count FROM reviews")
      .get().count;

    const mediaNota = db
      .prepare("SELECT AVG(nota) as avg FROM reviews")
      .get().avg;

    const livrosPorCategoria = db
      .prepare(
        `
            SELECT categoria, COUNT(*) as quantidade 
            FROM livros 
            WHERE categoria IS NOT NULL AND categoria != ''
            GROUP BY categoria
        `
      )
      .all();

    return {
      totalLivros,
      totalReviews,
      mediaNota: mediaNota ? Number(mediaNota.toFixed(1)) : 0,
      livrosPorCategoria,
    };
  }
}

module.exports = DashboardRepository;
