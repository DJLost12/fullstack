const express = require("express");
const app = express();
app.use(express.json());

let tasks = [];

app.get("/tasks", (req, res) => {
    res.json(tasks);       
});
app.post("/tasks", (req, res) => {
  const { task } = req.body;
  tasks.push(task);
  res.json({ success: true });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/projectdb', {
})
.then(() => console.log('MongoDB connected!'))
.catch(err => console.error('MongoDB connection error:', err));

const Task = require('./models/Task');


app.use(express.static("public"));

// Get all tasks
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Add a task
app.post("/tasks", async (req, res) => {
  const { task } = req.body;
  const newTask = new Task({ name: task });
  await newTask.save();
  res.json({ success: true });
});
