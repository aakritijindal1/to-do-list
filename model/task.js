const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    Task_id: {
      type: Number,
      required: true,
      unique: true,
    },
    Name: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },

    Category: {
      type: String,
      required: true,
    },
    Priority: {
      type: String,
      enum: ["low", "med", "high"],
      required: true,
    },
  },
  { timestamps: true }
);
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
