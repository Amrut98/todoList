document.addEventListener("DOMContentLoaded", function () {
    const addTaskButton = document.getElementById("addTask");
    const taskInput = document.getElementById("task");
    const taskList = document.getElementById("taskList");

    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.forEach(task => {
        createTaskElement(task.text, task.checked);
    });

    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            createTaskElement(taskText, false);
            taskInput.value = "";
        }
    });

    taskList.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete")) {
            event.target.parentElement.remove();
            updateLocalStorage();
        } else if (event.target.classList.contains("complete")) {
            event.target.parentElement.classList.toggle("completed");
            updateLocalStorage();
        }
    });

    function createTaskElement(text, checked) {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" class="complete" ${checked ? "checked" : ""}>
            <span>${text}</span>
            <button class="delete">Delete</button>
        `;
        if (checked) {
            li.classList.add("completed");
        }
        taskList.appendChild(li);
        updateLocalStorage();
    }

    function updateLocalStorage() {
        const tasks = Array.from(taskList.children).map(li => ({
            text: li.querySelector("span").textContent,
            checked: li.querySelector(".complete").checked
        }));
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
