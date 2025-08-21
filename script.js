
        // Global scope functions
        function loadTasks() {
            console.log("loadTasks called");
            const todos = JSON.parse(localStorage.getItem("todos") || "[]");
            const completed = JSON.parse(localStorage.getItem("completed") || "[]");

            todos.forEach(task => addTodoToList(task, false));
            completed.forEach(task => addCompletedToList(task));
            updateCounts();
        }

        function saveTasks() {
            console.log("saveTasks called");
            const todos = Array.from(document.querySelectorAll("#todo-list li span"))
                .map(span => span.textContent);
            const completed = Array.from(document.querySelectorAll("#completed-list li span"))
                .map(span => span.textContent);
            localStorage.setItem("todos", JSON.stringify(todos));
            localStorage.setItem("completed", JSON.stringify(completed));
        }

        function updateCounts() {
            console.log("updateCounts called");
            const todoCount = document.querySelectorAll("#todo-list li").length;
            const completedCount = document.querySelectorAll("#completed-list li").length;
            document.getElementById("todo-count").textContent = todoCount;
            document.getElementById("completed-count").textContent = completedCount;
        }

        function addTodo() {
            console.log("addTodo called");
            const input = document.getElementById("todo-input");
            const task = input.value.trim();

            if (task === "") {
                alert("Please enter a task!");
                return;
            }

            addTodoToList(task, true);
            input.value = "";
        }

        function addTodoToList(task, save = false) {
            console.log("addTodoToList called with task:", task);
            const li = document.createElement("li");

            // Create task text element
            const taskSpan = document.createElement("span");
            taskSpan.textContent = task;

            // Create button container
            const buttonContainer = document.createElement("div");
            buttonContainer.className = "button-container";

            // Create Complete button
            const completeBtn = document.createElement("button");
            completeBtn.textContent = "✔️";
            completeBtn.className = "complete-btn";
            completeBtn.onclick = function () {
                console.log("Complete button clicked for task:", task);
                completeTask(li);
            };

            // Create Delete button
            const removeBtn = document.createElement("button");
            removeBtn.textContent = "❌";
            removeBtn.className = "delete-btn";
            removeBtn.onclick = function () {
                console.log("Delete button clicked for task:", task);
                li.remove();
                saveTasks();
                updateCounts();
            };

            // Append complete and delete buttons to button container
            buttonContainer.appendChild(completeBtn);
            buttonContainer.appendChild(removeBtn);

            // Append task text (left) and button container (right) to li
            li.appendChild(taskSpan);
            li.appendChild(buttonContainer);

            // Append li to todo list
            document.getElementById("todo-list").appendChild(li);

            if (save) {
                saveTasks();
                updateCounts();
            }
        }

        function addCompletedToList(task) {
            console.log("addCompletedToList called with task:", task);
            const li = document.createElement("li");
            li.className = "completed-item";

            // Create task text element
            const taskSpan = document.createElement("span");
            taskSpan.textContent = task;

            // Append task text to li (no buttons for completed tasks)
            li.appendChild(taskSpan);

            // Append to completed list
            document.getElementById("completed-list").appendChild(li);
        }

        function completeTask(taskItem) {
            console.log("completeTask called");
            const taskText = taskItem.querySelector("span").textContent;
            taskItem.remove();
            addCompletedToList(taskText);
            saveTasks();
            updateCounts();
        }

        function clearCompleted() {
            console.log("clearCompleted called");
            const completedList = document.getElementById("completed-list");
            completedList.innerHTML = "";
            saveTasks();
            updateCounts();
        }

        // Set up event listeners after DOM is loaded
        document.addEventListener("DOMContentLoaded", function () {
            // Add task on Enter key
            document.getElementById("todo-input").addEventListener("keypress", function (e) {
                if (e.key === "Enter") {
                    console.log("Enter key pressed");
                    addTodo();
                }
            });

            // Load tasks on page load
            loadTasks();

            // Debug: Confirm functions are defined
            console.log("addTodo defined:", typeof addTodo === "function");
            console.log("clearCompleted defined:", typeof clearCompleted === "function");
        });
    