import { render, screen, fireEvent } from "@testing-library/react";
import Delete from "./Delete";
import "@testing-library/jest-dom";

describe("Delete Component", () => {
    const mockDeleteTask = jest.fn();
    const mockTogglePopup = jest.fn();
    const testTaskID = "123";

    beforeEach(() => {
        render(
            <Delete
                deleteTask={mockDeleteTask}
                taskID={testTaskID}
                togglePopup={mockTogglePopup}
            />
        );
    });

    test("renders delete confirmation message", () => {
        expect(
            screen.getByText("Do you want to delete this ?")
        ).toBeInTheDocument();
    });

    test("calls deleteTask with correct ID when Yes is clicked", () => {
        fireEvent.click(screen.getByText("Yes"));
        expect(mockDeleteTask).toHaveBeenCalledTimes(1);
        expect(mockDeleteTask).toHaveBeenCalledWith(testTaskID);
    });

    test("calls togglePopup(true) when No is clicked", () => {
        fireEvent.click(screen.getByText("No"));
        expect(mockTogglePopup).toHaveBeenCalledTimes(1);
        expect(mockTogglePopup).toHaveBeenCalledWith(true);
    });
});
