import { render, screen, fireEvent } from "@testing-library/react";
import Task from "./Task";
import "@testing-library/jest-dom";

const mockTask = {
    id: "1",
    title: "Sample Task",
    description: "This is a task",
    urgency: "High",
    status: "In Progress",
};

const setup = () => {
    const updateTask = jest.fn();
    const deleteTask = jest.fn();
    render(
        <Task task={mockTask} updateTask={updateTask} deleteTask={deleteTask} />
    );
    return { updateTask, deleteTask };
};

describe("Task Component", () => {
    test("renders task details", () => {
        setup();
        expect(screen.getByText(/Sample Task/i)).toBeInTheDocument();
        expect(screen.getByText(/This is a task/i)).toBeInTheDocument();
        expect(screen.getByText(/High/i)).toBeInTheDocument();
        expect(screen.getByText(/In Progress/i)).toBeInTheDocument();
    });

    test("enters edit mode and shows editable fields", () => {
        setup();
        fireEvent.click(screen.getByText("Edit"));

        expect(screen.getByPlaceholderText("Task Title")).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText("Task Description")
        ).toBeInTheDocument();
        expect(screen.getByText("Save")).toBeInTheDocument();
        expect(screen.getByText("Cancel")).toBeInTheDocument();
    });

    test("modifies task and calls updateTask on save", () => {
        const { updateTask } = setup();

        fireEvent.click(screen.getByText("Edit"));

        const titleInput = screen.getByPlaceholderText("Task Title");
        fireEvent.change(titleInput, { target: { value: "Updated Task" } });

        fireEvent.click(screen.getByText("Save"));

        expect(updateTask).toHaveBeenCalledTimes(1);
        expect(updateTask).toHaveBeenCalledWith(
            expect.objectContaining({ title: "Updated Task" })
        );
    });

    test("shows confirmation popup on delete click", () => {
        setup();

        fireEvent.click(screen.getByText("Delete"));

        expect(
            screen.getByText("Do you want to delete this?")
        ).toBeInTheDocument();
        expect(screen.getByText("Yes")).toBeInTheDocument();
        expect(screen.getByText("No")).toBeInTheDocument();
    });

    test("clicking Yes deletes the task", () => {
        const { deleteTask } = setup();

        fireEvent.click(screen.getByText("Delete"));
        fireEvent.click(screen.getByText("Yes"));

        expect(deleteTask).toHaveBeenCalledTimes(1);
        expect(deleteTask).toHaveBeenCalledWith("1");
    });

    test("clicking No closes the popup", () => {
        setup();

        fireEvent.click(screen.getByText("Delete"));
        expect(
            screen.getByText("Do you want to delete this?")
        ).toBeInTheDocument();

        fireEvent.click(screen.getByText("No"));

        // After closing, it should no longer be visible
        expect(
            screen.queryByText("Do you want to delete this?")
        ).not.toBeInTheDocument();
    });
});
