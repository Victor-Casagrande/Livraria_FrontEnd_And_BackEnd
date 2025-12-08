const { LivrosService } = require("../services");
const PDFDocument = require("pdfkit");

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
      const { titulo, autor, ano, editora, categoria } = req.body;

      const capaPath = req.file ? `/uploads/${req.file.filename}` : null;

      const novoLivro = await this.livrosService.criar({
        titulo,
        autor,
        ano: parseInt(ano),
        editora,
        categoria,
        capa: capaPath,
      });

      res.status(201).json({
        mensagem: "Livro criado com sucesso",
        data: novoLivro,
      });
    } catch (err) {
      next(err);
    }
  }

  async atualizarLivro(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const { titulo, autor, ano, editora, categoria } = req.body;

      const anoFormatado = isNaN(parseInt(ano)) ? null : parseInt(ano);
      
      const dadosAtualizacao = {
        titulo,
        autor,
        ano: anoFormatado,
        editora,
        categoria,
      };

      if (req.file) {
        dadosAtualizacao.capa = `/uploads/${req.file.filename}`;
      }

      const livroAtualizado = await this.livrosService.atualizar(
        id,
        dadosAtualizacao
      );

      res.status(200).json({
        mensagem: "Livro atualizado com sucesso",
        data: livroAtualizado,
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
        data: livroRemovido,
      });
    } catch (err) {
      next(err);
    }
  }

  async gerarRelatorio(req, res, next) {
    try {
      const livros = await this.livrosService.listarTodos();

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=relatorio-livros.pdf"
      );

      const doc = new PDFDocument();

      doc.pipe(res);

      doc.fontSize(20).text("Relatório de Livros", { align: "center" });
      doc.moveDown();

      livros.forEach((livro, index) => {
        doc
          .fontSize(14)
          .text(`${index + 1}. ${livro.titulo}`, { underline: true });
        doc.fontSize(12).text(`   Autor: ${livro.autor}`);
        doc.text(`   Editora: ${livro.editora || "Não informada"}`);
        doc.text(`   Ano: ${livro.ano}`);
        doc.text(`   Categoria: ${livro.categoria || "Geral"}`);
        doc.moveDown(0.5);
      });

      doc.moveDown();
      doc
        .fontSize(10)
        .text(`Gerado em: ${new Date().toLocaleString()}`, { align: "right" });

      doc.end();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = LivrosController;
