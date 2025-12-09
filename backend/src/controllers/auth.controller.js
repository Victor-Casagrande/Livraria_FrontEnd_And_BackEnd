const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { UsersRepository } = require("../repositories");
const transporter = require("../config/mail");

class AuthController {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async register(req, res, next) {
    try {
      const { username, password, email } = req.body;

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
        email,
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

      res
        .status(200)
        .json({ id: user.id, username: user.username, email: user.email });
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

  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      const user = await this.usersRepository.findByEmail(email);

      if (!user) {
        return res
          .status(200)
          .json({ mensagem: "Se o e-mail existir, o link foi enviado." });
      }

      const token = crypto.randomBytes(20).toString("hex");

      const now = new Date();
      now.setHours(now.getHours() + 1);

      user.reset_password_token = token;
      user.reset_password_expires = now;

      await this.usersRepository.save(user);

      const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
      const resetLink = `${frontendUrl}/reset-password/${token}`;

      await transporter.sendMail({
        to: email,
        from: process.env.EMAIL_USER,
        subject: "Recuperação de Senha",
        html: `<p>Para redefinir sua senha, clique no link:</p><a href="${resetLink}">Redefinir Senha</a>`,
      });

      res.status(200).json({ mensagem: "E-mail enviado com sucesso." });
    } catch (err) {
      next(err);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { token } = req.params;
      const { password } = req.body;

      const user = await this.usersRepository.findByResetToken(token);

      if (!user) {
        return res.status(400).json({ erro: "Token inválido ou expirado." });
      }

      user.password_hash = await bcrypt.hash(password, 10);
      user.reset_password_token = null;
      user.reset_password_expires = null;

      await this.usersRepository.save(user);

      res.status(200).json({ mensagem: "Senha alterada com sucesso." });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController;
