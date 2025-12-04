module.exports = {
  up: async (sequelize, DataTypes) => {
    await sequelize.getQueryInterface().createTable("livros", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      titulo: { type: DataTypes.STRING, allowNull: false },
      autor: { type: DataTypes.STRING, allowNull: false },
      categoria: { type: DataTypes.STRING, allowNull: false },
      ano: { type: DataTypes.INTEGER, allowNull: false },
      editora: { type: DataTypes.STRING, allowNull: true },
      capa: { type: DataTypes.STRING, allowNull: true },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  down: async (sequelize) => {
    await sequelize.getQueryInterface().dropTable("livros");
  },
};
