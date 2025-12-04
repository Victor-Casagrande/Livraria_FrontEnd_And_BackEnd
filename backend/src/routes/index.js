const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const livrosRoutes = require("./livros.routes");
const dashboardRoutes = require("./dashboard.routes");

router.use("/auth", authRoutes);
router.use("/livros", livrosRoutes);
router.use("/dashboard", dashboardRoutes);

router.get("/", (req, res) => {
  res.status(200).json({ mensagem: "API Livraria a funcionar!" });
});

module.exports = router;
