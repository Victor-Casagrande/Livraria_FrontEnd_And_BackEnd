const { sequelize, DataTypes } = require("../src/database");
const migration = require("../migrations/003-create-favorites");

async function run() {
  try {
    await sequelize.authenticate();
    console.log("Conexão com banco estabelecida.");

    await migration.up(sequelize, DataTypes);
    console.log("Migration 003 (Favorites) aplicada com sucesso!");

    process.exit(0);
  } catch (err) {
    console.error("Erro na migration:", err);
    process.exit(1);
  }
}

run();
