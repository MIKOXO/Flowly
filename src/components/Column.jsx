import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

const Column = ({ id, column, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-DarkCard border border-LightBorder dark:border-DarkBorder rounded-2xl shadow-md p-6">
      <h2 className="font-semibold text-lg mb-4">{column.title}</h2>

      <Droppable droppableId={id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col gap-3 min-h-[200px]"
          >
            {column.items.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
