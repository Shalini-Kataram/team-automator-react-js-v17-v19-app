import React, { createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    const addOrUpdateTask = (newTask) => {
        setTasks((prev) => [...prev, newTask]);
    };

    const updateTask = (updatedTask) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
            )
        );
    };

    const deleteTask = (taskId) => {
        setTasks((prev) => prev.filter((task) => task.id !== taskId));
    };

    return (
        <TaskContext.Provider
            value={{ tasks, addOrUpdateTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};
