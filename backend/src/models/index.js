const { sequelize } = require('../database/sqlite');
const Livro = require('./livro.sequelize.model');
const User = require('./user.sequelize.model');

const db = {
    sequelize,
    Livro,
    User
};

module.exports = db;