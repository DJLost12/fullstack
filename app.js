const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", async () => {
  const task = taskInput.value;
  if (!task) return;

  await fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task })
  });

  const response = await fetch("http://localhost:3000/tasks");
  const tasks = await response.json();

  taskList.innerHTML = "";
  tasks.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t;
    taskList.appendChild(li);
  });

  taskInput.value = "";
});