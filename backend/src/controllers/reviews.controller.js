const ReviewsRepository = require("../repositories/reviews.repository");

class ReviewsController {
  constructor() {
    this.reviewsRepository = new ReviewsRepository();
  }

  async criar(req, res, next) {
    try {
      const { livroId } = req.params;
      const { nota, comentario } = req.body;
      const userId = req.session.userId;

      if (!userId) return res.status(401).json({ erro: "Não autenticado" });

      const review = await this.reviewsRepository.create({
        userId,
        livroId,
        nota,
        comentario,
      });

      res.status(201).json(review);
    } catch (err) {
      next(err);
    }
  }

  async listarPorLivro(req, res, next) {
    try {
      const { livroId } = req.params;
      const reviews = await this.reviewsRepository.findByLivroId(livroId);
      res.json(reviews);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ReviewsController;
