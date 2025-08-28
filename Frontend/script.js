const API_URL = "http://localhost:5000/api/todos";

const todoForm = document.getElementById("todoForm");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const todoList = document.getElementById("todoList");

async function fetchTodos() {
  try {
    const res = await fetch(API_URL);
    const todos = await res.json();

    todoList.innerHTML = "";
    todos.forEach((todo) => {
      const li = document.createElement("li");

      const text = document.createElement("span");
      text.textContent = `${todo.name}${
        todo.description ? " — " + todo.description : ""
      }`;

      const actions = document.createElement("div");

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.classList.add("edit-btn");
      editBtn.addEventListener("click", () => onEditClick(todo));

      // Delete button
      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.classList.add("delete-btn");
      delBtn.addEventListener("click", () => deleteTask(todo._id));

      actions.appendChild(editBtn);
      actions.appendChild(delBtn);

      li.appendChild(text);
      li.appendChild(actions);
      todoList.appendChild(li);
    });
  } catch (err) {
    console.error("Failed to fetch todos:", err);
    alert("Could not load tasks. Make sure the backend is running.");
  }
}

// Add new todo
todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = titleInput.value.trim();
  const description = descInput.value.trim();

  if (!name) return alert("Please enter a task title.");

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });

    titleInput.value = "";
    descInput.value = "";
    fetchTodos();
  } catch (err) {
    console.error("Failed to add todo:", err);
    alert("Failed to add task.");
  }
});

// Delete todo
async function deleteTask(id) {
  if (!confirm("Delete this task?")) return;
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTodos();
  } catch (err) {
    console.error("Failed to delete todo:", err);
    alert("Failed to delete task.");
  }
}


async function onEditClick(todo) {
  const newName = prompt("Edit task title:", todo.name);
  if (newName === null) return;

  const newDesc = prompt("Edit task description:", todo.description || "");
  if (newDesc === null) return;

  try {
    await fetch(`${API_URL}/${todo._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newName.trim(),
        description: newDesc.trim(),
      }),
    });
    fetchTodos();
  } catch (err) {
    console.error("Failed to update todo:", err);
    alert("Failed to update task.");
  }
}

// Initial load
fetchTodos();
