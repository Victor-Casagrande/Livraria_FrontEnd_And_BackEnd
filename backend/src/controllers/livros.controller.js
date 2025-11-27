const { LivrosService } = require("../services");

class LivrosController {
    constructor() {
        this.livrosService = new LivrosService();
    }

    async listarLivros(req, res, next) {
        try {
            const livros = await this.livrosService.listarTodos();
            res.status(200).json(livros);
        } catch (err) {
            next(err);
        }
    }

    async buscarLivroPorId(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const livro = await this.livrosService.buscarPorId(id);
            res.status(200).json(livro);
        } catch (err) {
            next(err);
        }
    }

    async criarLivro(req, res, next) {
        try {
            const { titulo, autor, ano } = req.body; 
            const novoLivro = await this.livrosService.criar({
                titulo,
                autor,
                ano: parseInt(ano)
            });
            res.status(201).json({
                mensagem: "Livro criado com sucesso",
                data: novoLivro
            });
        } catch (err) {
            next(err);
        }
    }

    async atualizarLivro(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const { titulo, autor, ano } = req.body;

            const anoFormatado = ano ? parseInt(ano) : undefined;

            const livroAtualizado = await this.livrosService.atualizar(id, {
                titulo,
                autor,
                ano: anoFormatado
            });

            res.status(200).json({
                mensagem: "Livro atualizado com sucesso",
                data: livroAtualizado
            });
        } catch (err) {
            next(err);
        }
    }

    async removerLivro(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const livroRemovido = await this.livrosService.remover(id);
            res.status(200).json({
                mensagem: "Livro removido com sucesso",
                data: livroRemovido
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = LivrosController;