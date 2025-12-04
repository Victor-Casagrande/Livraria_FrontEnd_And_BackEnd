const bcrypt = require("bcrypt");
const { UsersRepository } = require("../repositories");

class AuthController {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async register(req, res, next) {
    try {
      const { username, password } = req.body;

      if (!username || username.length < 3) {
        const e = new Error("O username deve ter pelo menos 3 caracteres");
        e.statusCode = 400;
        throw e;
      }
      if (!password || password.length < 6) {
        const e = new Error("A senha deve ter pelo menos 6 caracteres");
        e.statusCode = 400;
        throw e;
      }

      const existing = await this.usersRepository.findByUsername(username);
      if (existing) {
        const e = new Error("Usuário já existe");
        e.statusCode = 409;
        throw e;
      }

      const passwordHash = await bcrypt.hash(String(password), 10);
      const created = await this.usersRepository.create({
        username,
        passwordHash,
      });

      req.session.userId = created.id;

      res.status(201).json({
        mensagem: "Usuário registrado com sucesso",
        user: { id: created.id, username: created.username },
      });
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        const e = new Error("Credenciais inválidas");
        e.statusCode = 400;
        throw e;
      }

      const user = await this.usersRepository.findByUsername(username);

      if (
        !user ||
        !(await bcrypt.compare(String(password), user.password_hash))
      ) {
        const e = new Error("Usuário ou senha inválidos");
        e.statusCode = 401;
        throw e;
      }

      req.session.userId = user.id;

      res.status(200).json({
        mensagem: "Login efetuado",
        user: { id: user.id, username: user.username },
      });
    } catch (err) {
      next(err);
    }
  }

  async me(req, res, next) {
    try {
      if (!req.session.userId)
        return res.status(401).json({ erro: "Não autenticado" });

      const user = await this.usersRepository.findById(req.session.userId);
      if (!user) return res.status(401).json({ erro: "Sessão inválida" });

      res.status(200).json({ id: user.id, username: user.username });
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      req.session.destroy((err) => {
        if (err) return next(err);
        res.clearCookie("connect.sid");
        res.status(200).json({ mensagem: "Logout realizado com sucesso." });
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController;
