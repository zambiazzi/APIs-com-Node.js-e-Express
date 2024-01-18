import { autor, livro } from "../models/index.js";
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

    static listarLivrosPorFiltro = async (req, res, next) => {
        try {
            const busca = await processaBusca(req.query);


            if (busca !== null) {
                const livrosResultado = await livro
                    .find(busca)
                    .populate("autor");
                
                res.status(200).send(livrosResultado);
            } else {
                res.status(200).send([]);
            }

        } catch(erro) {
            next(erro);
        }
    };
}

async function processaBusca(parametros) {
    const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

    let busca = {};

    if (editora) busca.editora = editora;
    if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

    if (minPaginas || maxPaginas) busca.numeroPaginas = {};

    // gte = Greater Than or Equal
    if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
    // lte = Less Than or Equal
    if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

    if (nomeAutor) {
        const autor = await autor.findOne({ nome: nomeAutor });

        if (autor !== null) {
            busca.autor = autor._id;
        } else {
            busca = null;
        }
    }

    return busca;
}


export default LivroController;
