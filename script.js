document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("todo-input");
    const addButton = document.getElementById("add-task-button");
    const todoList = document.getElementById("todo-list");


    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => createTaskElement(task.text, task.completed));
    };


    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll(".todo-item").forEach(item => {
            tasks.push({
                text: item.querySelector(".task-text").textContent,
                completed: item.classList.contains("completed")
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

 
    const createTaskElement = (text, completed = false) => {
        const li = document.createElement("li");
        li.className = "todo-item";
        if (completed) li.classList.add("completed");

        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = text;
        span.addEventListener("click", () => {
            li.classList.toggle("completed");
            saveTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            li.remove();
            saveTasks();
        });

        li.appendChild(span);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    };


    addButton.addEventListener("click", () => {
        const text = input.value.trim();
        if (text) {
            createTaskElement(text);
            saveTasks();
            input.value = "";
        }
    });


    loadTasks();
});
