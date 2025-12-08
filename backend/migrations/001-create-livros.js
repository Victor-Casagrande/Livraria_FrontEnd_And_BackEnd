module.exports = {
  up: async (sequelize, DataTypes) => {
    const queryInterface = sequelize.getQueryInterface();

    console.log("Criando tabela 'users'...");
    await queryInterface.createTable("users", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    console.log("Criando tabela 'livros'...");
    await queryInterface.createTable("livros", {
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
    const queryInterface = sequelize.getQueryInterface();
    await queryInterface.dropTable("livros");
    await queryInterface.dropTable("users");
  },
};
