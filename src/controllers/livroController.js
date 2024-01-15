import livro from "../models/Livro.js";

class LivroController {
    // static serve para usar métodos de um classe sem ser necessario instancialos
    static async listarLivros (req, res) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch(erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição.` });
        }
    };

    static async listarLivroPorId (req, res) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            res.status(200).json(livroEncontrado);
        } catch(erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição do livro.` });
        }
    };

    static async cadastrarLivro (req, res) {
        try {
            const novoLivro = await livro.create(req.body); // cria um registro no banco
            res.status(201).json({ message: "Livro criado com sucesso", livro: novoLivro });
        } catch(erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao cadastrar livro.` });
        }
    };

    static async atualizarLivro (req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "livro atualizado com sucesso."});
        } catch(erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao atualizar livro.` });
        }
    };

    static async deletarLivro (req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(200).json({ message: "Livro deletado com sucesso." });
        } catch(erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao deletar livro.` });
        }
    };
};


export default LivroController;
