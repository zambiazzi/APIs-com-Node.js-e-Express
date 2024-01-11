import express from "express";

const app = express();
app.use(express.json()); // middleware 

const livros = [
    {
        id: 1,
        titulo: "O Senhor dos Anéis"
    },
    {
        id: 2,
        titulo: "O Hobbit"
    }
];

function buscaLivro(id) {
    return livros.findIndex(livro => {
        return livro.id === Number(id);
    });
}

app.get("/", (req, res) => {
    res.status(200).send("Curso de Node.js"); // send serve para dados mais simples
});

app.get("/livros", (req, res) => {
    res.status(200).json(livros); // json serve para dados mais complexos
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
