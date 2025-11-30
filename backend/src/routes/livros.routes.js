const express = require("express");
const router = express.Router();
const reviewsRouter = require("./reviews.routes");
const { LivrosController } = require("../controllers");
const livrosController = new LivrosController();
const upload = require("../config/upload");
const upload = require('../config/upload');

const { validarParamId } = require("../middlewares/validar/livros.validar");

router.get('/relatorio', requireAuth, (req, res, next) => livrosController.gerarRelatorio(req, res, next));
router.get("/", livrosController.listarLivros.bind(livrosController));
router.get(
  "/:id",
  validarParamId,
  livrosController.buscarLivroPorId.bind(livrosController)
);
router.post("/", requireAuth, upload.single("capa"), (req, res, next) => {
  livrosController.criar(req, res, next);
});
router.put(
  "/:id",
  validarParamId,
  livrosController.atualizarLivro.bind(livrosController)
);
router.delete(
  "/:id",
  validarParamId,
  livrosController.removerLivro.bind(livrosController)
);
router.use("/:livroId/reviews", reviewsRouter);

module.exports = router;
