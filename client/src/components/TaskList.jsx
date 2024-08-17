import React, { useEffect, useState } from "react";
import Task from "./Task"; // Import the Task component
import "./TaskList.css"

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [inputTitle, setInputTitle] = useState("");
  const [inputDesc, setInputDesc] = useState("");
  const [inputStatus, setInputStatus] = useState("Pending"); // Added status state

  useEffect(() => {
    async function getTasks() {
      const response = await fetch(`http://localhost:5050/tasks/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const tasks = await response.json();
      setTasks(tasks);
    }
    getTasks();
  }, []); // Changed dependency array to avoid infinite loop

  const handleInputChange = (e, setInput) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputTitle || !inputDesc) {
      alert("Please fill out both fields.");
      return;
    }

    const newTask = {
      title: inputTitle,
      description: inputDesc,
      status: inputStatus, // Include status
    };

    try {
      if (isEditing) {
        await fetch(`http://localhost:5050/tasks/${currentTaskId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });
      } else {
        await fetch("http://localhost:5050/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });
      }

      // Fetch updated tasks
      const response = await fetch(`http://localhost:5050/tasks/`);
      const tasks = await response.json();
      setTasks(tasks);

      // Reset form fields
      setInputTitle("");
      setInputDesc("");
      setInputStatus("Pending"); // Reset status
      setShowForm(false);
      setIsEditing(false);
      setCurrentTaskId(null);
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  };

  const handleEdit = (taskId) => {
    const taskToEdit = tasks.find(task => task._id === taskId);
    setShowForm(true);
    setIsEditing(true);
    setCurrentTaskId(taskToEdit._id);
    setInputTitle(taskToEdit.title);
    setInputDesc(taskToEdit.description);
    setInputStatus(taskToEdit.status); // Set status
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5050/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task._id !== id));
  };

  const handleNewTask = () => {
    setShowForm(true);
    setIsEditing(false);
    setInputTitle("");
    setInputDesc("");
    setInputStatus("Pending"); // Reset status
  };

  return (
    <div className="container">
      {showForm ? (
        <div className="task-form">
          <h2>{isEditing ? "Edit Task" : "Add Task"}</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                type="text"
                value={inputTitle}
                onChange={(e) => handleInputChange(e, setInputTitle)}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                value={inputDesc}
                onChange={(e) => handleInputChange(e, setInputDesc)}
              />
            </label>
            <label>
              Status:
              <select
                value={inputStatus}
                onChange={(e) => handleInputChange(e, setInputStatus)}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </label>
            <button type="submit">
              {isEditing ? "Update Task" : "Add Task"}
            </button>
          </form>
        </div>
      ) : (
        <button onClick={handleNewTask} className="btn btn-primary">
          + Add New Task
        </button>
      )}

      <div className="task-list">
        {tasks.map((task) => (
          <Task
            key={task._id}
            task={task}
            deleteTask={handleDelete}
            editTask={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
