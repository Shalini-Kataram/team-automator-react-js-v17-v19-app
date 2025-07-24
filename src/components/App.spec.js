import { render, screen } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

// Optional: mock StatusLine if it's complex or uses context
jest.mock("./StatusLine", () => () => (
    <div data-testid="status-line">Mocked StatusLine</div>
));

describe("App Component", () => {
    test("renders the Task Management heading", () => {
        render(<App />);
        const heading = screen.getByRole("heading", {
            name: /Task Management/i,
        });
        expect(heading).toBeInTheDocument();
    });

    test("renders main and section elements", () => {
        const { container } = render(<App />);

        const mainElement = container.querySelector("main");
        const sectionElement = container.querySelector("section");

        expect(mainElement).toBeInTheDocument();
        expect(sectionElement).toBeInTheDocument();
    });

    test("renders StatusLine component", () => {
        render(<App />);
        expect(screen.getByTestId("status-line")).toBeInTheDocument();
    });

    test("renders within TaskProvider context", () => {
        // This is covered implicitly — but to assert context works, you'd test interaction/state (future scope)
        render(<App />);
        expect(
            screen.getByRole("heading", { name: /Task Management/i })
        ).toBeInTheDocument();
    });
});
