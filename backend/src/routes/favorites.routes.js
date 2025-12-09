const express = require("express");
const FavoritesController = require("../controllers/favorites.controller");
const { requireAuth } = require("../middlewares/auth");

const router = express.Router();
const favoritesController = new FavoritesController();

router.use(requireAuth);

router.post("/:livroId", (req, res, next) =>
  favoritesController.toggle(req, res, next)
);
router.get("/", (req, res, next) => favoritesController.list(req, res, next));
router.get("/check/:livroId", (req, res, next) =>
  favoritesController.check(req, res, next)
);

module.exports = router;
