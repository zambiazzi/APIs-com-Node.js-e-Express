import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autor } from "../models/index.js";

class AutorController {
    static async listarAutores (req, res, next) {
        try {
            const listaAutores = await autor.find({});
            res.status(200).json(listaAutores);
        } catch(erro) {
            next(erro);        
        }
    }

    static async listarAutorPorId (req, res, next) {
        try {
            const id = req.params.id;
            const autorEncontrado = await autor.findById(id);

            if (autorEncontrado !== null) {
                res.status(200).send(autorEncontrado);
            } else {
                next(new NaoEncontrado("ID do Autor não localizado"));
            }
        } catch(erro) {
            next(erro); // o next vai mandar o erro para o tratamento de erros
        }
    }

    static async cadastrarAutor (req, res, next) {
        try {
            const novoAutor = await autor.create(req.body); // cria um registro no banco
            res.status(201).json({ message: "Autor criado com sucesso", autor: novoAutor });
        } catch(erro) {
            next(erro);      
        }
    }

    static async atualizarAutor (req, res, next) {
        try {
            const id = req.params.id;
            const autorEncontrado = await autor.findByIdAndUpdate(id, req.body);

            if (autorEncontrado !== null) {
                res.status(200).send("Autor atualizado com sucesso");
            } else {
                next(new NaoEncontrado("ID do Autor não localizado"));
            }
            res.status(200).json({ message: "autor atualizado com sucesso."});
        } catch(erro) {
            next(erro);
        }
    }

    static async deletarAutor (req, res, next) {
        try {
            const id = req.params.id;
            const autorEncontrado = await autor.findByIdAndDelete(id);

            if (autorEncontrado !== null) {
                res.status(200).json({message: "Autor deletado com sucesso" });
            } else {
                next(new NaoEncontrado("ID do autor não localizado"));
            }
            
        } catch(erro) {
            next(erro);        
        }
    }
}

export default AutorController;
