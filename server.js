const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/Task");

const app = express();
app.use(express.json());            // Parse JSON bodies
app.use(express.static("public"));  // Serve frontend

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/projectdb')
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes

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

// Delete a task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to delete task" });
  }
});


// Start server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
