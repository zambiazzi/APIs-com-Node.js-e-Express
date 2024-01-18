import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", { // vai definir uma propriedade para todos os campos string
    validator: (valor) => valor.trim() !== "",
    message: ({ path }) => `O campo ${path} foi fornecido em branco`
}); 
