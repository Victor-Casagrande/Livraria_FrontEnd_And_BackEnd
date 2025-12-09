const User = require("./user.model");
const Livro = require("./livro.model");
const Favorite = require("./favorite.model");

User.hasMany(Favorite, { foreignKey: "user_id", as: "favorites" });
Favorite.belongsTo(User, { foreignKey: "user_id" });

Livro.hasMany(Favorite, { foreignKey: "livro_id", as: "favoritedBy" });
Favorite.belongsTo(Livro, { foreignKey: "livro_id", as: "livro" });

module.exports = {
  User,
  Livro,
  Favorite,
};
