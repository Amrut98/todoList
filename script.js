// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener("DOMContentLoaded", function () {
    // Select elements from the HTML using their class or id
    const addTaskButton = document.querySelector(".add-button");
    const taskInput = document.querySelector(".task-input");
    const taskList = document.querySelector(".task-list");
    const selectAllCheckbox = document.getElementById("selectAll");

    // Add an event listener to the "Add" button to create a new task
    addTaskButton.addEventListener("click", function () {
        // Get the text from the task input and trim any extra whitespace
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            // Call the createTaskElement function to create a new task
            createTaskElement(taskText);
            // Clear the task input field
            taskInput.value = "";
        }
    });

    // Add an event listener to the task input field to create a new task when the Enter key is pressed
    taskInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            // Get the text from the task input and trim any extra whitespace
            const taskText = taskInput.value.trim();
            if (taskText !== "") {
                // Call the createTaskElement function to create a new task
                createTaskElement(taskText);
                // Clear the task input field
                taskInput.value = "";
            }
        }
    });

    // Function to create a new task element
    function createTaskElement(text) {
        // Create a new list item element
        const li = document.createElement("li");
        li.classList.add("task-item");

        // Set the inner HTML of the list item to include a checkbox, task text, and delete button
        li.innerHTML = `
            <input type="checkbox" class="complete">
            <span>${text}</span>
            <button class="delete">Delete</button>
        `;

        // Add an event listener to the delete button to remove the task when clicked
        li.querySelector(".delete").addEventListener("click", function () {
            li.remove();
        });

        // Append the new task to the task list
        taskList.appendChild(li);

        // Check the "Select All" checkbox if all other checkboxes are checked
        const checkboxes = document.querySelectorAll(".complete");
        selectAllCheckbox.checked = [...checkboxes].every(checkbox => checkbox.checked);

        // Add an event listener to the "Select All" checkbox to select or deselect all tasks
        selectAllCheckbox.addEventListener("change", function () {
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAllCheckbox.checked;
            });
        });


        // Function to update the task count and completed count
        function updateTaskCount() {
            const totalTasks = document.querySelectorAll(".task-item").length;
            const completedTasks = document.querySelectorAll(".complete:checked").length;

            // Update the task count and completed count in the HTML
            document.getElementById("task-count").textContent = `Tasks: ${totalTasks}`;
            document.getElementById("completed-count").textContent = `Completed: ${completedTasks}`;
        }

        // Add an event listener to update the counts whenever a task is added or a checkbox is clicked
        taskInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                const taskText = taskInput.value.trim();
                if (taskText !== "") {
                    createTaskElement(taskText);
                    taskInput.value = "";
                    updateTaskCount(); // Update counts when a new task is added
                }
            }
        });

        taskList.addEventListener("change", function () {
            updateTaskCount(); // Update counts when a checkbox is clicked
        });

        // Initial update of counts when the page loads
        updateTaskCount();
    }
});
