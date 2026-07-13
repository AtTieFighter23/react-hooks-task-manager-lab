import React, { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  // Holds all tasks fetched from the backend
  const [tasks, setTasks] = useState([]);

  // Fetch all tasks once, when the provider first mounts
  useEffect(() => {
    fetch("http://localhost:6001/tasks")
      .then((r) => r.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // POST a new task to the backend, then add the server's response to state
  function addTask(title) {
    const newTask = { title, completed: false };

    fetch("http://localhost:6001/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((r) => r.json())
      .then((createdTask) => {
        setTasks((prevTasks) => [...prevTasks, createdTask]);
      })
      .catch((error) => console.error("Error adding task:", error));
  }

  // PATCH a task's completed status, then update it in place in state
  function toggleComplete(id, currentlyCompleted) {
    fetch(`http://localhost:6001/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !currentlyCompleted }),
    })
      .then((r) => r.json())
      .then((updatedTask) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          )
        );
      })
      .catch((error) => console.error("Error updating task:", error));
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleComplete }}>
      {children}
    </TaskContext.Provider>
  );
}