import { useContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TaskContext, TaskProvider } from "./TaskContext";
import "@testing-library/jest-dom";

// 🧪 Test consumer component
const TestComponent = () => {
    const { tasks, addOrUpdateTask, updateTask, deleteTask } =
        useContext(TaskContext);

    return (
        <div>
            <ul data-testid="task-list">
                {tasks.map((task) => (
                    <li key={task.id}>{task.title}</li>
                ))}
            </ul>
            <button
                onClick={() =>
                    addOrUpdateTask({
                        id: "1",
                        title: "New Task",
                        description: "test",
                        urgency: "High",
                        status: "Start",
                    })
                }>
                Add Task
            </button>
            <button
                onClick={() =>
                    updateTask({
                        id: "1",
                        title: "Updated Task",
                        description: "updated",
                        urgency: "Medium",
                        status: "Done",
                    })
                }>
                Update Task
            </button>
            <button onClick={() => deleteTask("1")}>Delete Task</button>
        </div>
    );
};

describe("TaskContext Provider", () => {
    test("adds a task", () => {
        render(
            <TaskProvider>
                <TestComponent />
            </TaskProvider>
        );

        fireEvent.click(screen.getByText("Add Task"));
        expect(screen.getByText("New Task")).toBeInTheDocument();
    });

    test("updates an existing task", () => {
        render(
            <TaskProvider>
                <TestComponent />
            </TaskProvider>
        );

        fireEvent.click(screen.getByText("Add Task"));
        fireEvent.click(screen.getByText("Update Task"));

        expect(screen.getByText("Updated Task")).toBeInTheDocument();
    });

    test("deletes a task", () => {
        render(
            <TaskProvider>
                <TestComponent />
            </TaskProvider>
        );

        fireEvent.click(screen.getByText("Add Task"));
        expect(screen.getByText("New Task")).toBeInTheDocument();

        fireEvent.click(screen.getByText("Delete Task"));
        expect(screen.queryByText("New Task")).not.toBeInTheDocument();
    });
});
