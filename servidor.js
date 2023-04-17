import express from "express";
import fs from 'node:fs';
import cors from 'cors';

const port = 4090;
const app = express();
app.use(express.json());
app.use(cors());


app.post('/registrar', (req, res) => {
    const { telefone, nome, email } = req.body;

    if (!telefone || !nome || !email) {
        const erro = new Error("Dados Inválidos");

        return res
            .status(400)
            .json({ mensagem: erro.message });
    }

    const dados_escritos = fs.openSync("clientes.csv", "a+");
    fs.writeSync(dados_escritos, `"${nome}";"${telefone}";"${email}"\n`);
    fs.closeSync(dados_escritos);

    return res
        .status(201) // 201 criado/registrado com sucesso
        .json({
            mensagem: `Oi! ${nome} sua solicitação foi registrado!`
        });
})

app.listen(port, () => {
    console.log(`Servidor com a porta: ${port} está ligado!`)
})