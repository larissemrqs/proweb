class ApiConnection {

    url = "http://localhost:3333/tarefas"

    async removerTarefa(id) {
        await fetch(`${this.url}/${id}`, {
            method: "DELETE"
        });
    }

    async listarTarefas() {
        const response = await fetch(this.url);
        return await response.json();
    }

    async cadastrarTarefa(tarefa) {
        await fetch(this.url, {
            method: "POST",
            body: JSON.stringify(tarefa),
            headers: { "Content-Type": "application/json" }
        });
    }
}

export default ApiConnection;
