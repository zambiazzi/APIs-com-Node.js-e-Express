import express from "express";
import conectaNaDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

const conexao = await conectaNaDatabase();

conexao.on("error", (erro) => {
    console.error("Erro de conexão: ", erro);
});

conexao.once("open", () => {
    console.log("Conexão com o banco bem sucedida.");
});

const app = express();
routes(app);

// eslint-disable-next-line no-undef
app.use(manipulador404);

// eslint-disable-next-line no-unused-vars 
app.use(manipuladorDeErros);

export default app;
