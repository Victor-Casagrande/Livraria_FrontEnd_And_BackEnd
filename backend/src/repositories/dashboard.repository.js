const { sequelize } = require("../database");
const { QueryTypes } = require("sequelize");

class DashboardRepository {
  async getStats() {
    const [livrosResult] = await sequelize.query(
      "SELECT COUNT(*) as count FROM livros",
      { type: QueryTypes.SELECT }
    );

    const [usuariosResult] = await sequelize.query(
      "SELECT COUNT(*) as count FROM users",
      { type: QueryTypes.SELECT }
    );

    const [mediaAnoResult] = await sequelize.query(
      "SELECT AVG(ano) as avg FROM livros",
      { type: QueryTypes.SELECT }
    );

    const livrosPorCategoria = await sequelize.query(
      `SELECT categoria, COUNT(*) as total 
       FROM livros 
       WHERE categoria IS NOT NULL 
       GROUP BY categoria`,
      { type: QueryTypes.SELECT }
    );

    return {
      totalLivros: livrosResult?.count || 0,
      totalUsuarios: usuariosResult?.count || 0,
      mediaAno: mediaAnoResult?.avg || 0,
      livrosPorCategoria,
    };
  }
}

module.exports = DashboardRepository;
