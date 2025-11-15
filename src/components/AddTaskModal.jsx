/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AddTaskModal = ({ open, setOpen, onAddTask }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [column, setColumn] = useState("todo");

  const isValid = title.trim() !== "" && desc.trim() !== "";

  const closeModal = () => {
    setOpen(false);
    setTitle("");
    setDesc("");
    setPriority("Medium");
    setColumn("todo");
  };

  const handleSubmit = () => {
    if (!isValid) return;
    onAddTask({
      id: Date.now(),
      title,
      description: desc,
      priority,
      status: column,
    });
    closeModal();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="bg-white dark:bg-DarkCard border border-LightBorder dark:border-DarkBorder w-full max-w-xl rounded-2xl shadow-xl p-6 animate-fadeIn scale-95 animate-scaleUp"
      >
        {/* Title */}
        <h2 className="text-xl font-semibold mb-4">Create New Task</h2>

        {/* Form */}
        <div className="space-y-5">
          {/* Task Title */}
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="font-medium w-full p-3 rounded-xl border border-LightBorder dark:border-DarkBorder bg-LightBg dark:bg-DarkBg text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-Accent outline-none transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              placeholder="Enter task description..."
              rows="4"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="font-medium w-full p-3 rounded-xl border border-LightBorder dark:border-DarkBorder bg-LightBg dark:bg-DarkBg text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-Accent outline-none transition resize-none"
            ></textarea>
          </div>

          {/* Priority + Column */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="font-medium w-full p-3 rounded-xl border border-LightBorder dark:border-DarkBorder bg-LightBg dark:bg-DarkBg text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-Accent outline-none transition"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Column</label>
              <select
                value={column}
                onChange={(e) => setColumn(e.target.value)}
                className="font-medium w-full p-3 rounded-xl border border-LightBorder dark:border-DarkBorder bg-LightBg dark:bg-DarkBg text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-Accent outline-none transition"
              >
                <option value="todo">To Do</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={closeModal}
            className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Cancel
          </button>

          <button
            disabled={!isValid}
            onClick={handleSubmit}
            className={`p-3 rounded-lg transition text-white ${
              isValid
                ? "bg-Primary hover:bg-Accent"
                : "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
            }`}
          >
            Create Task
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AddTaskModal;
