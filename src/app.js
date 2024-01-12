import express from "express";
import conectaNaDatabase from "./config/dbConnect.js";
import livro from "./models/Livro.js";

const conexao = await conectaNaDatabase();

conexao.on("error", (erro) => {
    console.error("Erro de conexão: ", erro);
});

conexao.once("open", () => {
    console.log("Conexão com o banco bem sucedida.");
});

const app = express();
app.use(express.json()); // middleware 

app.get("/", (req, res) => {
    res.status(200).send("Curso de Node.js"); // send serve para dados mais simples
});

app.get("/livros", async (req, res) => {
    const listaLivros = await livro.find({});
    res.status(200).json(listaLivros); // json serve para dados mais complexos
});

app.get("/livros/:id", (req, res) => { // os : sinaliza que vai usar uma variável
    const index = buscaLivro(req.params.id); // params é outra propriedade do req
    res.status(200).json(livros[index]);
});

app.post("/livros", (req, res) => {
    livros.push(req.body); // o express cria o objeto req e dentro dele existe uma propriedade body, que é a requisição
    res.status(201).send("Livro cadastrado com sucesso")
});

app.put("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.status(200).json(livros);
});

app.delete("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros.splice(index, 1);
    res.status(200).send("Livro deletado com sucesso.");
})


export default app;

