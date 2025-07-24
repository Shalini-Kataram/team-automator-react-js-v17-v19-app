import { render, screen } from "@testing-library/react";
import Popup from "./Popup";
import "@testing-library/jest-dom";

describe("Popup Component", () => {
    test("renders popup container", () => {
        render(
            <Popup>
                <p>Popup Content</p>
            </Popup>
        );

        // Check if overlay div is rendered
        const popupContainer = screen.getByText("Popup Content");
        expect(popupContainer).toBeInTheDocument();
    });

    test("renders children inside popup", () => {
        render(
            <Popup>
                <button>Click Me</button>
            </Popup>
        );

        const childButton = screen.getByRole("button", { name: "Click Me" });
        expect(childButton).toBeInTheDocument();
    });

    test("renders safely without onClose or isFormVisible", () => {
        const { container } = render(
            <Popup>
                <span>Safe Render</span>
            </Popup>
        );

        expect(container).toHaveTextContent("Safe Render");
    });
});
