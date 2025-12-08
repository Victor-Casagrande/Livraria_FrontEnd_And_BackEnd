const { sequelize, DataTypes } = require("../src/database");

async function run() {
  try {
    await sequelize.authenticate();
    console.log("Conexão com banco de dados estabelecida.");

    const migrations = [
      {
        name: "001-create-livros",
        file: require("../migrations/001-create-livros"),
      },
      {
        name: "002-add-email-to-users",
        file: require("../migrations/002-add-email-to-users"),
      },
      {
        name: "003-create-favorites",
        file: require("../migrations/003-create-favorites"),
      },
    ];

    for (const migration of migrations) {
      console.log(`Executando: ${migration.name}...`);
      await migration.file.up(sequelize, DataTypes);
      console.log(`✓ ${migration.name} concluída.`);
    }

    console.log("--> Todas as migrations foram aplicadas com sucesso!");
    process.exit(0);
  } catch (err) {
    console.error("Erro fatal ao aplicar migrations:", err);
    process.exit(1);
  }
}

run();
