"use client";

import { useState } from "react";

export default function PlannerApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function addTask() {
    if (!newTask.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: newTask,
        completed: false,
      },
    ]);

    setNewTask("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="text-3xl font-bold mb-6">
          My Planner
        </h1>

        <div className="flex gap-2 mb-6">
          <input
            className="flex-1 border rounded-lg p-3"
            placeholder="Add a task..."
            value={newTask}
            onChange={(e) =>
              setNewTask(e.target.value)
            }
          />

          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-4 rounded-lg"
          >
            Add
          </button>
        </div>

        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between border rounded-lg p-3"
            >
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() =>
                    toggleTask(task.id)
                  }
                />
                <span
                  className={
                    task.completed
                      ? "line-through text-gray-400"
                      : ""
                  }
                >
                  {task.text}
                </span>
              </label>

              <button
                onClick={() =>
                  deleteTask(task.id)
                }
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
