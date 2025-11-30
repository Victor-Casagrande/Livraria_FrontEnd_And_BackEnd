const express = require("express");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const path = require("path");
const app = express();

const db = new Database(path.resolve(__dirname, "livraria.sqlite"));

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password_hash TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS livros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT,
    autor TEXT,
    ano INTEGER,
    editora TEXT,
    categoria TEXT,
    capa TEXT, -- Adicionado para a Tarefa 2
    created_at TEXT DEFAULT (datetime('now'))
  );

  -- NOVA TABELA: REVIEWS (Tarefa 1)
  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    livro_id INTEGER,
    nota INTEGER CHECK(nota >= 1 AND nota <= 5),
    comentario TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(livro_id) REFERENCES livros(id) ON DELETE CASCADE
  );
`);

module.exports = db;
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "minha-chave-super-secreta",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use("/api", routes);

app.use(errorHandler);

module.exports = app;
