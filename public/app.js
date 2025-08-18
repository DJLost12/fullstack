function fetchTasks() {
  fetch("/tasks")
    .then(res => res.json())
    .then(tasks => {
      const list = document.getElementById("taskList");
      list.innerHTML = "";
      tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.name + " ";

        // Delete button
        const delBtn = document.createElement("button");
        delBtn.textContent = "❌";
        delBtn.onclick = () => {
          fetch(`/tasks/${task._id}`, { method: "DELETE" })
            .then(res => res.json())
            .then(() => loadTasks());
        };

        li.appendChild(delBtn);
        list.appendChild(li);
      });
    });
}

// Handle form submission
document.getElementById("addTask").addEventListener("click", async () => {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();

  if (!task) return; // Do nothing if input is empty

  try {
    await fetch("/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task })
    });

    taskInput.value = ""; // Clear input
    fetchTasks();         // Refresh task list

  } catch (err) {
    console.error("Error adding task:", err);
  }
});

// Initial fetch when page loads
fetchTasks();
