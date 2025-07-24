import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./Form";
import "@testing-library/jest-dom";

describe("Form Component", () => {
    let mockHandleSubmit;

    beforeEach(() => {
        mockHandleSubmit = jest.fn((e) => e.preventDefault());
        render(<Form handleSubmit={mockHandleSubmit} />);
    });

    test("renders form fields and button", () => {
        expect(screen.getByPlaceholderText("Enter Title")).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText("Enter Description")
        ).toBeInTheDocument();

        expect(screen.getByText("Low")).toBeInTheDocument();
        expect(screen.getByText("Medium")).toBeInTheDocument();
        expect(screen.getByText("High")).toBeInTheDocument();

        expect(screen.getByText("Start")).toBeInTheDocument();
        expect(screen.getByText("In Progress")).toBeInTheDocument();
        expect(screen.getByText("Done")).toBeInTheDocument();

        expect(
            screen.getByRole("button", { name: /save/i })
        ).toBeInTheDocument();
    });

    test("can enter title and description", () => {
        const titleInput = screen.getByPlaceholderText("Enter Title");
        const descInput = screen.getByPlaceholderText("Enter Description");

        fireEvent.change(titleInput, { target: { value: "Test Task" } });
        fireEvent.change(descInput, { target: { value: "Test Description" } });

        expect(titleInput.value).toBe("Test Task");
        expect(descInput.value).toBe("Test Description");
    });

    test("selects urgency and status and submits form", () => {
        // Select urgency "High"
        fireEvent.click(screen.getByText("High"));
        // Select status "In Progress"
        fireEvent.click(screen.getByText("In Progress"));

        const titleInput = screen.getByPlaceholderText("Enter Title");
        const descInput = screen.getByPlaceholderText("Enter Description");

        // Fill inputs
        fireEvent.change(titleInput, { target: { value: "New Task" } });
        fireEvent.change(descInput, { target: { value: "Details" } });

        // Submit form
        fireEvent.click(screen.getByRole("button", { name: /save/i }));

        expect(mockHandleSubmit).toHaveBeenCalledTimes(1);

        // Custom: Check arguments if needed
        const [event, urgency, status] = mockHandleSubmit.mock.calls[0];
        expect(urgency).toBe("High");
        expect(status).toBe("In Progress");
    });
});
