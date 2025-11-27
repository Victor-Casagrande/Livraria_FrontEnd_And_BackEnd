require("dotenv").config();
const app = require("./src/app");
const { sequelize } = require("./src/models");

const PORT = process.env.PORT || 3333;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com banco de dados estabelecida.');
    
    await sequelize.sync();
    console.log('Tabelas sincronizadas.');

    app.listen(PORT, () => {
      console.log(`Servidor iniciado na porta ${PORT} (development)`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
  }
};

startServer();