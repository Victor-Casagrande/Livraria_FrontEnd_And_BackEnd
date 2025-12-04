const { sequelize, DataTypes } = require("../src/database");
const migration = require("../migrations/002-add-email-to-users");

async function run() {
  try {
    await sequelize.authenticate();
    await migration.up(sequelize, DataTypes);
    console.log("Migration 002 aplicada com sucesso!");
    process.exit(0);
  } catch (err) {
    console.error("Erro na migration:", err);
    process.exit(1);
  }
}
run();
