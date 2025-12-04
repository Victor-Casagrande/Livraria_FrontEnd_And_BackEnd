const express = require("express");
const router = express.Router({ mergeParams: true });
const ReviewsController = require("../controllers/reviews.controller");
const { requireAuth } = require("../middlewares/auth");

const reviewsController = new ReviewsController();

router.post("/", requireAuth, (req, res, next) =>
  reviewsController.criar(req, res, next)
);

router.get("/", (req, res, next) =>
  reviewsController.listarPorLivro(req, res, next)
);

module.exports = router;
