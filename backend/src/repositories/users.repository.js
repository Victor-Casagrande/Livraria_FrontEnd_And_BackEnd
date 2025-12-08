const { User } = require("../models");
const { Op } = require("sequelize");

class UsersRepository {
  async findById(id) {
    return await User.findByPk(id);
  }

  async findByUsername(username) {
    return await User.findOne({ where: { username } });
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

  async create({ username, passwordHash, email }) {
    return await User.create({
      username,
      password_hash: passwordHash,
      email: email || null,
    });
  }

  async save(user) {
    return await user.save();
  }
}

module.exports = UsersRepository;
