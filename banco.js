const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

class Banco {
    constructor() {
        this.criarTabela();
    }

    async sqlConnection() {
        return await sqlite.open({
            filename: "database.db",
            driver: sqlite3.Database
        });
    }

    async criarTabela() {
        const banco = await this.sqlConnection();
        await banco.exec(`CREATE TABLE IF NOT EXISTS tarefas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            uuid VARCHAR(100),
            descricao TEXT
        );`);
    }

    async inserir(tarefa) {
        const { uuid, descricao } = tarefa;
        const banco = await this.sqlConnection();
        await banco.run("INSERT INTO tarefas (uuid, descricao) VALUES (?, ?)", uuid, descricao);
    }

    async remover(id) {
        const banco = await this.sqlConnection();
        await banco.run("DELETE FROM tarefas WHERE id = ?", id);
    }

    async listar() {
        const banco = await this.sqlConnection();
        return await banco.all("SELECT * FROM tarefas");
    }
}

module.exports = Banco;
