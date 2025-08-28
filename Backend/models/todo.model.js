import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date, default: null },
});

export default mongoose.model("Todo", todoSchema);
