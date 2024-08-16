const express = require("express");
const Task = require("./model/task");
const mongoose = require("mongoose");
const { connectToMongoDB } = require("./connect");
const app = express();
const PORT = 8000;

connectToMongoDB("mongodb://127.0.0.1:27017/to-do-list")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo Error", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/tasks", async (req, res) => {
  try {
    await Task.deleteMany({});
    res.status(200).json({ message: " all tasks deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/tasks/:Task_id", async (req, res) => {
  try {
    const Taskbyid = await Task.findById({});
    if (!Taskbyid) {
      return res.status(404).json({ message: "No task found" });
    }
    res.json(Taskbyid);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`server started at the port: ${PORT}`));
