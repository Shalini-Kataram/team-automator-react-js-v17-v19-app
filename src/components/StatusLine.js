import React, { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import Popup from "./Popup";
import Form from "./Form";
import Task from "./Task";
import { TaskContext } from "./TaskContext";

export default function StatusLine() {
  const { tasks, addOrUpdateTask, deleteTask, updateTask } =
    useContext(TaskContext);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const togglePopup = () => setIsFormVisible((prev) => !prev);

  const handleSubmit = (event, urgency, status) => {
    event.preventDefault();

    const newTask = {
      id: uuidv4(),
      title: event.target.elements.title.value,
      description: event.target.elements.description.value,
      urgency,
      status,
    };

    addOrUpdateTask(newTask);
    event.target.reset();
    togglePopup();
  };

  return (
    <div className="w-full mx-2 my-2 flex flex-col flex-wrap justify-center items-center bg-gray-800 rounded-lg p-4 shadow-md">
      <div className="w-full flex flex-row justify-between items-center mb-4">
        <h3
          className="text-2xl font-bold text-gray-200 mb-5"
          data-testid="tasks"
        >
          Tasks
        </h3>
        <button
          data-testid="add-task-btn"
          className="px-4 py-2 rounded bg-teal-500 text-gray-800 font-medium shadow-lg transition-all hover:bg-teal-600 focus:outline-none focus:ring focus:ring-teal-400"
          onClick={togglePopup}
        >
          Add New Task
        </button>
      </div>

      {isFormVisible && (
        <Popup>
          <div
            data-testid="popup-box"
            className="relative flex flex-col justify-center items-center border border-solid border-[#64748B] bg-[#1E293B] rounded p-4 mb-2 w-full max-w-md mx-4"
          >
            <div className="absolute top-1 right-1 text-white">
              <button onClick={togglePopup} aria-label="Close Popup">
                ✕
              </button>
            </div>
            <Form handleSubmit={handleSubmit} />
          </div>
        </Popup>
      )}

      <div className="w-full">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            updateTask={updateTask}
            addOrUpdateTask={addOrUpdateTask}
          />
        ))}
      </div>
    </div>
  );
}
