import Todo from "../models/todo.model.js";

export const createTodo = async (req, res) => {
  try {
    const { name } = req.body;
    const todo = new Todo({ name });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: "Error creating todo" });
  }
};


export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Error fetching todos" });
  }
};


export const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: "Error fetching todo" });
  }
};


export const updateTodo = async (req, res) => {
  try {
    const { name, completed } = req.body;
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    if (name) todo.name = name;
    if (completed !== undefined) {
      todo.completed = completed;
      todo.completedAt = completed ? new Date() : null;
    }

    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: "Error updating todo" });
  }
};

// Delete task
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting todo" });
  }
};
