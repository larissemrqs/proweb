import ApiConnection from "./api.js";

const api = new ApiConnection();
const addButton = document.querySelector(".add-btn");
const inputField = document.querySelector("input");
const taskList = document.querySelector(".task-lista");

addButton.addEventListener("click", async () => {
    const descricao = inputField.value.trim();
    if (descricao !== "") {
        await api.cadastrarTarefa({ descricao });
        inputField.value = "";
        carregarTarefas();
    } else {
        alert("Digite uma tarefa válida!");
    }
});

async function carregarTarefas() {
    taskList.innerHTML = "";
    const tarefas = await api.listarTarefas();
    tarefas.forEach(tarefa => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.innerText = tarefa.descricao;
        
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "🗑";
        deleteBtn.classList.add("deletar-btn");
        deleteBtn.addEventListener("click", async () => {
            await api.removerTarefa(tarefa.id);
            carregarTarefas();
        });
        
        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

carregarTarefas();
