document.addEventListener("DOMContentLoaded", function () {
    const addTaskButton = document.querySelector(".add-button");
    const taskInput = document.querySelector(".task-input");
    const taskList = document.querySelector(".task-list");

    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            createTaskElement(taskText);
            taskInput.value = "";
        }
    });

    taskInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            const taskText = taskInput.value.trim();
            if (taskText !== "") {
                createTaskElement(taskText);
                taskInput.value = "";
            }
        }
    });

    function createTaskElement(text) {
        const li = document.createElement("li");
        li.classList.add("task-item");
        li.innerHTML = `
            <input type="checkbox" class="complete">
            <span>${text}</span>
            <button class="delete">Delete</button>
        `;

        li.querySelector(".delete").addEventListener("click", function () {
            li.remove();
        });

        taskList.appendChild(li);
    }
});
