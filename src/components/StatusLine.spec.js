import { render, screen, fireEvent } from "@testing-library/react";
import StatusLine from "./StatusLine";
import { TaskContext } from "./TaskContext";
import "@testing-library/jest-dom";

// ✅ Mock child components
jest.mock("./Popup", () => ({ children }) => (
    <div data-testid="popup">{children}</div>
));

jest.mock("./Form", () => ({ handleSubmit }) => (
    <form onSubmit={(e) => handleSubmit(e, "Medium", "In Progress")}>
        <input name="title" defaultValue="Test Title" />
        <input name="description" defaultValue="Test Description" />
        <button type="submit">Submit</button>
    </form>
));

jest.mock("./Task", () => ({ task }) => (
    <div data-testid="task">{task.title}</div>
));

const mockTasks = [
    {
        id: "1",
        title: "Sample Task",
        description: "Do something",
        urgency: "High",
        status: "To Do",
    },
];

const mockContext = {
    tasks: mockTasks,
    addOrUpdateTask: jest.fn(),
    deleteTask: jest.fn(),
    updateTask: jest.fn(),
};

describe("StatusLine Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders heading and Add New Task button", () => {
        render(
            <TaskContext.Provider value={mockContext}>
                <StatusLine />
            </TaskContext.Provider>
        );

        expect(screen.getByText("Tasks")).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /Add New Task/i })
        ).toBeInTheDocument();
    });

    test("shows popup and form on button click", () => {
        render(
            <TaskContext.Provider value={mockContext}>
                <StatusLine />
            </TaskContext.Provider>
        );

        fireEvent.click(screen.getByRole("button", { name: /Add New Task/i }));
        expect(screen.getByTestId("popup")).toBeInTheDocument();
        expect(screen.getByText("Submit")).toBeInTheDocument();
    });

    test("submits form and calls addOrUpdateTask with correct values", () => {
        render(
            <TaskContext.Provider value={mockContext}>
                <StatusLine />
            </TaskContext.Provider>
        );

        fireEvent.click(screen.getByRole("button", { name: /Add New Task/i }));

        fireEvent.click(screen.getByText("Submit"));

        expect(mockContext.addOrUpdateTask).toHaveBeenCalledTimes(1);
        const submittedTask = mockContext.addOrUpdateTask.mock.calls[0][0];
        expect(submittedTask.title).toBe("Test Title");
        expect(submittedTask.description).toBe("Test Description");
        expect(submittedTask.urgency).toBe("Medium");
        expect(submittedTask.status).toBe("In Progress");
        expect(submittedTask.id).toBeDefined(); // uuid
    });

    test("renders tasks from context", () => {
        render(
            <TaskContext.Provider value={mockContext}>
                <StatusLine />
            </TaskContext.Provider>
        );

        expect(screen.getByTestId("task")).toHaveTextContent("Sample Task");
    });
});
