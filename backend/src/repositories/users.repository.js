const { User } = require("../models");
const { Op } = require("sequelize");

class UsersRepository {
  async findById(id) {
    return await User.findByPk(id);
  }

  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async findByResetToken(token) {
    return await User.findOne({
      where: {
        reset_password_token: token,
        reset_password_expires: { [Op.gt]: new Date() },
      },
    });
  }

  async save(user) {
    return await user.save();
  }

  async findByUsername(username) {
    return await User.findOne({ where: { username } });
  }

  async create({ username, passwordHash }) {
    return await User.create({
      username,
      password_hash: passwordHash,
    });
  }
}

module.exports = UsersRepository;