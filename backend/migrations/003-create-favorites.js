module.exports = {
  up: async (sequelize, DataTypes) => {
    const queryInterface = sequelize.getQueryInterface();

    await queryInterface.createTable("favorites", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      livro_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "livros", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });

    await queryInterface.addIndex("favorites", ["user_id", "livro_id"], {
      unique: true,
      name: "favorites_user_livro_unique",
    });
  },

  down: async (sequelize) => {
    await sequelize.getQueryInterface().dropTable("favorites");
  },
};
