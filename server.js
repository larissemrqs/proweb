const { randomUUID } = require("crypto");
const express = require("express");
const Banco = require("./banco");

const app = express();
app.use(express.json());

const banco = new Banco();

// listar tarefas
app.get("/tarefas", async (req, res) => {
    const lista = await banco.listar();
    res.json(lista);
});

// criar tarefa
app.post("/tarefas", async (req, res) => {
    const { descricao } = req.body;
    const uuid = randomUUID();
    const tarefa = { uuid, descricao };
    await banco.inserir(tarefa);
    res.json(tarefa);
});

// remover tarefa
app.delete("/tarefas/:id", async (req, res) => {
    const { id } = req.params;
    await banco.remover(id);
    res.json({ message: "Tarefa removida!" });
});

// iniciar servidor
app.listen(3333, () => {
    console.log("Servidor inicializado.");
});
