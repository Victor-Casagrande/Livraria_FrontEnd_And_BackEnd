const db = require('../database/sqlite');

class ReviewsRepository {
    async create({ userId, livroId, nota, comentario }) {
        const stmt = db.prepare(`
            INSERT INTO reviews (user_id, livro_id, nota, comentario)
            VALUES (?, ?, ?, ?)
        `);
        const info = stmt.run(userId, livroId, nota, comentario);
        return { id: info.lastInsertRowid, userId, livroId, nota, comentario };
    }

    async findByLivroId(livroId) {
        const stmt = db.prepare(`
            SELECT r.*, u.username 
            FROM reviews r
            JOIN users u ON r.user_id = u.id
            WHERE r.livro_id = ?
            ORDER BY r.created_at DESC
        `);
        return stmt.all(livroId);
    }
}

module.exports = ReviewsRepository;