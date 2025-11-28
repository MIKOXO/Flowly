import React from "react";
import { Draggable } from "@hello-pangea/dnd";

const TaskCard = ({ task, index, onEdit, onDelete }) => {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="p-6 dark:bg-DarkSecondary border border-LightBorder dark:border-DarkBorder rounded-2xl shadow-md cursor-grab active:cursor-grabbing"
        >
          <h3 className="font-medium text-[20px]">{task.title}</h3>
          <p className="opacity-80">{task.description}</p>
          <p className="text-[14px] font-semibold mt-2">
            Priority: {""}
            <span
              className={
                task.priority === "High"
                  ? "text-red-600"
                  : task.priority === "Medium"
                  ? "text-yellow-300"
                  : "text-green-500"
              }
            >
              {task.priority}
            </span>
          </p>

          <div className="flex gap-3 mt-10">
            <button
              onClick={() => onEdit(task)}
              className="bg-Primary text-white px-4 py-2 rounded-xl shadow-xl hover:bg-Accent transition"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(task.id)}
              className="bg-red-600 text-white px-4 py-2 rounded-xl shadow-xl hover:bg-red-500 transition"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
