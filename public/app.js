function fetchTasks() {
  fetch("/tasks")
    .then(res => res.json())
    .then(tasks => {
      const list = document.getElementById("taskList");
      list.innerHTML = "";

      tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task-item";

        // Checkbox for completed
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.onchange = () => {
          fetch(`/tasks/${task._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: checkbox.checked })
          })
            .then(res => res.json())
            .then(() => fetchTasks());
        };

        // Task text
        const span = document.createElement("span");
        span.textContent = task.name;
        if (task.completed) {
          span.style.textDecoration = "line-through";
          span.style.color = "gray";
        }

        // Delete button
        const delBtn = document.createElement("button");
        delBtn.textContent = "❌";
        delBtn.className = "delete-btn";
        delBtn.onclick = () => {
          fetch(`/tasks/${task._id}`, { method: "DELETE" })
            .then(res => res.json())
            .then(() => fetchTasks());
        };

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(delBtn);
        list.appendChild(li);
      });
    });
}

// Handle form submission
document.getElementById("addTask").addEventListener("click", async () => {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();

  if (!task) return;

  try {
    await fetch("/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task })
    });

    taskInput.value = "";
    fetchTasks();
  } catch (err) {
    console.error("Error adding task:", err);
  }
});

// Initial fetch when page loads
fetchTasks();
