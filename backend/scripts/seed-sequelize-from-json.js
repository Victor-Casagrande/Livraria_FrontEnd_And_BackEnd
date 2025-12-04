const path = require("path");
const fs = require("fs");

const { sequelize, DataTypes } = require("../src/database");
const LivroModel = require("../src/models/livro.model");

async function run() {
  try {
    await sequelize.authenticate();

    await sequelize.sync();

    const dataPath = path.join(__dirname, "../src/data/livros.json");
    const raw = fs.readFileSync(dataPath, "utf8");
    const livros = JSON.parse(raw);

    await LivroModel.destroy({ where: {} });

    for (const l of livros) {
      await LivroModel.create({
        titulo: l.titulo,
        autor: l.autor,
        categoria: l.categoria,
        ano: l.ano,
        editora: l.editora || null,
        capa: null,
      });
    }

    console.log("Seed concluído com sucesso");
    process.exit(0);
  } catch (err) {
    console.error("Erro no seed:", err);
    process.exit(1);
  }
}

run();
