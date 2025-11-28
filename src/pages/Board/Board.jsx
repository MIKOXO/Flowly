/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from "react";
import { storageService } from "../../services/storageService.js";
import ThemeToggle from "../../components/ThemeToggle";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Logout from "../../components/Logout";
import StatCard from "../../components/StatCard";
import BarChartCard from "../../components/BarChartCard";
import AddTaskModal from "../../components/AddTaskModal";
import { motion } from "framer-motion";
import { DragDropContext } from "@hello-pangea/dnd";
import { initialData } from "../../utils/initialTasks";
import Column from "../../components/Column";

const columnStatusMap = {
  todo: "todo",
  inprogress: "inprogress",
  completed: "completed",
};

const Board = () => {
  const [tasks, setTasks] = useState([]);
  const [columns, setColumns] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Load tasks from storage service once
  useEffect(() => {
    const loadTasks = async () => {
      try {
        // Get current user to load user-specific tasks
        const currentUser = JSON.parse(localStorage.getItem("user"));
        if (!currentUser || !currentUser.email) {
          console.error("No user found, redirecting to login");
          window.location.href = "/login";
          return;
        }

        const saved = await storageService.getUserTasks(currentUser.email);
        setTasks(saved);
      } catch (error) {
        console.error("Error loading tasks from storage service:", error);
        setTasks([]);
      }
    };

    loadTasks();
  }, []);

  // Save tasks to storage service anytime tasks change
  useEffect(() => {
    const saveTasks = async () => {
      try {
        // Get current user to save user-specific tasks
        const currentUser = JSON.parse(localStorage.getItem("user"));
        if (!currentUser || !currentUser.email) {
          console.error("No user found, cannot save tasks");
          return;
        }

        await storageService.updateUserTasks(currentUser.email, tasks);
      } catch (error) {
        console.error("Error saving tasks to storage service:", error);
      }
    };

    saveTasks();
  }, [tasks]);

  // Build columns from the tasks (NOT initialData)
  useEffect(() => {
    try {
      const updatedColumns = {
        todo: {
          id: "todo",
          title: "To-Do",
          items: tasks.filter((t) => t.status === "todo"),
        },
        inprogress: {
          id: "inprogress",
          title: "In Progress",
          items: tasks.filter((t) => t.status === "inprogress"),
        },
        completed: {
          id: "completed",
          title: "Completed",
          items: tasks.filter((t) => t.status === "completed"),
        },
      };

      setColumns(updatedColumns);
    } catch (error) {
      console.error("Error updating columns:", error);
    }
  }, [tasks]);

  // ADD TASK
  const handleAddTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  // EDIT TASK
  const handleUpdateTask = (updatedTask) => {
    try {
      setTasks((prev) =>
        prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );

      setTaskToEdit(null);
      setOpenModal(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Handle when a task is selected for editing
  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setOpenModal(true);
  };

  // DELETE TASK
  const handleDeleteTask = (id) => {
    try {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Drag and Drop handler
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Update the global tasks array to change the task status
    setTasks((prevTasks) => {
      // Find the task being moved by looking at the current columns state
      const sourceColumn = columns[source.droppableId];
      if (!sourceColumn || source.index >= sourceColumn.items.length)
        return prevTasks;

      const taskToMove = sourceColumn.items[source.index];
      if (!taskToMove) return prevTasks;

      // Update the task's status
      const updatedTask = {
        ...taskToMove,
        status: columnStatusMap[destination.droppableId],
      };

      return prevTasks.map((task) =>
        task.id === taskToMove.id ? updatedTask : task
      );
    });
  };

  // Stats
  const { completed, active, total, barData } = useMemo(() => {
    const completed = tasks.filter((t) => t.status === "completed").length;
    const active = tasks.filter((t) => t.status === "inprogress").length;
    const total = tasks.length;

    const barData = [
      { name: "Todo", count: tasks.filter((t) => t.status === "todo").length },
      { name: "In Progress", count: active },
      { name: "Completed", count: completed },
    ];

    return { completed, active, total, barData };
  }, [tasks]);

  return (
    <section className="min-h-screen bg-LightBg dark:bg-DarkBg text-LightText dark:text-DarkText ease-in-out duration-300">
      <div className="mx-auto container p-6">
        {/* header */}
        <header className="lg:py-4 flex flex-row justify-between items-center">
          {/* Logo */}
          <div>
            <Link to="/">
              <span className="text-[25px] lg:text-[40px] font-extrabold tracking-tight">
                <span className="text-Accent">Flow</span>ly.
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex flex-row items-center gap-5">
            {/* Add Task Button */}
            <button
              onClick={() => {
                setTaskToEdit(null);
                setOpenModal(true);
              }}
              className="max-sm:hidden bg-Primary hover:bg-Accent text-white px-4 py-2 lg:py-3 rounded-2xl shadow-xl flex items-center gap-2 text- font-medium transition"
            >
              <PlusIcon className="h-6 w-6" /> Add Task
            </button>

            <ThemeToggle />
            <Logout />
          </nav>
        </header>

        <AddTaskModal
          open={openModal}
          setOpen={setOpenModal}
          onAddTask={handleAddTask}
          onUpdateTask={handleUpdateTask}
          taskToEdit={taskToEdit}
        />

        {/* Stats Section */}
        <motion.div
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <StatCard
            title="Completed Tasks"
            value={completed}
            total={total}
            color="bg-green-500"
          />
          <StatCard
            title="Active Tasks"
            value={active}
            total={total}
            color="bg-blue-500"
          />
          <BarChartCard data={barData} />
        </motion.div>

        {/* Kanban Board */}
        <div className="mt-12 pb-20">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(columns).map(([key, column]) => (
                <Column
                  key={key}
                  id={key}
                  column={column}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          </DragDropContext>
        </div>
      </div>
    </section>
  );
};

export default Board;
