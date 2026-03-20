const input = document.querySelector("input");
const addTodoBtn = document.querySelector("[data-btn-todo-add]");
const list = document.querySelector("#taskList");


let todos = [];


const createTodo = (todo) => {
    const container = document.createElement("div");
    container.classList.add("container");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    const span = document.createElement("span");
    span.textContent = todo.text;

    if (todo.completed) {
        span.classList.add("completed");
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.textContent = "❌";

    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        span.classList.toggle("completed");
        saveToLocalStorage();
    })

    deleteBtn.addEventListener("click", () => {
        todos = todos.filter(t => t.id !==todo.id);
        container.remove();
        saveToLocalStorage();
    })

    container.append(checkbox, span, deleteBtn);
    list.append(container);
}

const addTodo = () => {
    const text = input.value.trim();
    if (text === "") {
        return
    }
    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false
    }
    todos.push(newTodo);
    createTodo(newTodo);
    saveToLocalStorage();

    input.value = "";

}


const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
}

const loadFromLocalStorage = () => {
    const saved = localStorage.getItem("todos");

    if (saved) {
        todos = JSON.parse(saved);
        todos.forEach(todo => createTodo(todo));
    }
}

addTodoBtn.addEventListener("click", addTodo);

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
});

loadFromLocalStorage();