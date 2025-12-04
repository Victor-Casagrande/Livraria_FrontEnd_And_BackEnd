const { User } = require("../models");

class UsersRepository {
  async findById(id) {
    return await User.findByPk(id);
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
