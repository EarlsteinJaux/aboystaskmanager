const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.getAll();
    res.json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve tasks", message: error.message });
  }
});

// GET a single task by ID
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.get(req.params.id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve task" });
  }
});

// POST a new task
router.post("/", async (req, res) => {
  const { name, completed } = req.body;
  try {
    const success = await Task.add({ name, completed });
    if (success) {
      res.status(201).json({ message: "Task created" });
    } else {
      res.status(400).json({ error: "Task creation failed" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// PUT to update a task's status
router.put("/:id", async (req, res) => {
  const { completed } = req.body;
  try {
    const success = await Task.updateStatus({ id: req.params.id, completed });
    if (success) {
      res.json({ message: "Task updated" });
    } else {
      res.status(400).json({ error: "Task update failed" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// DELETE a task by ID
router.delete("/:id", async (req, res) => {
  try {
    const success = await Task.remove(req.params.id);
    if (success) {
      res.json({ message: "Task deleted" });
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;
