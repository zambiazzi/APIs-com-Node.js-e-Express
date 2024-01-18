import { livro } from "../models/index.js";
import { autor } from "../models/Autor.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class LivroController {
    // static serve para usar métodos de um classe sem ser necessario instancialos
    static async listarLivros (req, res, next) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch(erro) {
            next(erro);        
        }
    }

    static async listarLivroPorId (req, res, next) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);

            if (livroEncontrado !== null) {
                res.status(200).json(livroEncontrado);
            } else {
                next(new NaoEncontrado("Livro não encontrado"));
            }
        } catch(erro) {
            next(erro);        
        }
    }

    static async cadastrarLivro (req, res, next) {
        const novoLivro = req.body;
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc }};
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({ message: "Livro criado com sucesso", livro: livroCriado });
        } catch(erro) {
            next(erro);        
        }
    }

    static async atualizarLivro (req, res, next) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findByIdAndUpdate(id, req.body);

            if (livroEncontrado !== null) {
                res.status(200).json({ message: "livro atualizado com sucesso."});
            } else { 
                next(new NaoEncontrado("Livro não encontrado"));
            }
        } catch(erro) {
            next(erro);        
        }
    }

    static async deletarLivro (req, res, next) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findByIdAndDelete(id);

            if (livroEncontrado !== null) {
                res.status(200).json({ message: "Livro deletado com sucesso." });
            } else {
                next(new NaoEncontrado("Livro não encontrado"));
            }

        } catch(erro) {
            next(erro);
        }
    }

    static async listarLivrosPorEditora (req, res, next) {
        const editora = req.query.editora;
        try {
            // o js permite escrever apenas uma vez caso a chave e o valor sejam a mesma palavra
            const livrosPorEditora = await livro.find({ editora: editora });
            res.status(200).json(livrosPorEditora);
        } catch(erro) {
            next(erro);
        }
    }
}


export default LivroController;
