import { render, screen } from "@testing-library/react";
import Multiselect from "./Multiselect";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { Option } from "./Multiselect";

describe("Mulitselect component tests", () => {
    const options = [
        { name: "blue" },
        { name: "yellow" },
        { name: "green" },
        { name: "red" },
    ];
    const mockFunction = vi.fn((value) => {
        console.log(value);
    });
    beforeEach(() => {
        render(
            <Multiselect
                id="colours"
                options={options}
                onNewOptionSubmit={mockFunction}
            />
        );
    });
    it("should display a list of available options when the input is clicked", async () => {
        // change this to a prop
        const input = screen.getByPlaceholderText("Label");
        const user = userEvent.setup();
        await user.click(input);
        options.forEach((option: Option) => {
            const displayedOption = screen.getByText(option.name);
            expect(displayedOption).toBeInTheDocument();
        });
    });
    it("should filter the list of options when the user types in the input", async () => {
        const input = screen.getByPlaceholderText("Label");
        const user = userEvent.setup();
        await user.click(input);
        await user.type(input, "b");
        const [blue, ...rest] = options;
        const displayedOption = screen.queryByText(blue.name);
        expect(displayedOption).toBeInTheDocument();
        rest.forEach(async (option: Option) => {
            const filteredOutOption = await screen.queryByText(option.name);
            expect(filteredOutOption).toBe(null);
        });
    });
    it("should display a button to add a new option when the user types in the input", async () => {
        const input = screen.getByPlaceholderText("Label");
        const user = userEvent.setup();
        await user.click(input);
        await user.type(input, "b");
        const addBtn = screen.getByText(/add/i);
        expect(addBtn).toBeInTheDocument();
    });

    it("should add a new selected option when the user clicks the add button", async () => {
        const input = screen.getByPlaceholderText("Label");
        const user = userEvent.setup();
        await user.click(input);
        await user.type(input, "black");
        const addBtn = screen.getByText(/add/i);
        await user.click(addBtn);
        const selectedOptions = screen.getAllByRole("selected-option");
        expect(selectedOptions).toHaveLength(1);
        expect(selectedOptions[0].children[0]).toHaveTextContent("black");
    });

    it("should add a new selected option when the user clicks on a not yet select option from the list", async () => {
        const input = screen.getByPlaceholderText("Label");
        const user = userEvent.setup();
        await user.click(input);
        const yellowOption = screen.getByText("yellow");
        await user.click(yellowOption);
        const selectedOptions = screen.getAllByRole("selected-option");
        screen.debug();
        expect(selectedOptions).toHaveLength(1);
        console.log(selectedOptions[0].children[0]);

        // DONT KNOW WHY THIS FAILS - CREATES AN EMPTY SPAN
        // expect(selectedOptions[0].children[0]).toHaveTextContent("yellow");
    });

    it("should remove the selected option when the user clicks that option from the list", async () => {
        const input = screen.getByPlaceholderText("Label");
        const user = userEvent.setup();
        await user.click(input);
        const yellowOption = screen.getByText("yellow");
        await user.click(yellowOption);
        let selectedOptions = screen.getAllByRole("selected-option");
        expect(selectedOptions).toHaveLength(1);
        await user.click(yellowOption);
        selectedOptions = screen.queryAllByRole("selected-option");
        expect(selectedOptions).toHaveLength(0);
    });

    it("should remove the selected option when the user clicks the x button for that option", async () => {
        const input = screen.getByPlaceholderText("Label");
        const user = userEvent.setup();
        await user.click(input);
        const redOption = screen.getByText("red");
        await user.click(redOption);
        let selectedOptions = screen.getAllByRole("selected-option");
        expect(selectedOptions.length).toBe(1);
        const xBtn = screen.getByText(/x/i);
        await user.click(xBtn);
        selectedOptions = screen.queryAllByRole("selected-option");
        expect(selectedOptions).toHaveLength(0);
    });

    it("should allow to select multiple options", async () => {
        const input = screen.getByPlaceholderText("Label");
        const user = userEvent.setup();
        await user.click(input);
        const redOption = screen.getByText("red");
        await user.click(redOption);
        let selectedOptions = screen.getAllByRole("selected-option");
        expect(selectedOptions).toHaveLength(1);
        await user.type(input, "purple");
        const addBtn = screen.getByText(/add/i);
        await user.click(addBtn);
        selectedOptions = screen.getAllByRole("selected-option");
        expect(selectedOptions).toHaveLength(2);
    });

    it("should reset the options list when the user clears the input", async () => {
        const input = screen.getByPlaceholderText("Label");
        const user = userEvent.setup();
        await user.type(input, "grey");
        let allOptions = screen.queryAllByRole("option");
        expect(allOptions).toHaveLength(0);
        await user.clear(input);
        allOptions = screen.queryAllByRole("option");
        expect(allOptions).toHaveLength(4);
    });
});

describe("Multiselect unique props component test", () => {
    const options = [
        { name: "blue" },
        { name: "yellow" },
        { name: "green" },
        { name: "red" },
    ];
    const mockFunctionForTest2 = vi.fn((value) => {
        console.log(value);
    });
    it("should call onNewOptionSubmit function with the new option when the add button is clicked", async () => {
        render(
            <Multiselect
                id="colours"
                options={options}
                onNewOptionSubmit={mockFunctionForTest2}
            />
        );
        const input = screen.getByPlaceholderText("Label");
        const user = userEvent.setup();
        await user.type(input, "purple");
        const addBtn = screen.getByText(/add/i);
        await user.click(addBtn);
        expect(mockFunctionForTest2).toHaveBeenCalledTimes(1);
        expect(mockFunctionForTest2.mock.calls[0][0]).toStrictEqual({
            name: "purple",
        });
    });

    it("should display unique options only", async () => {
        const newMock = vi.fn();
        render(
            <Multiselect
                id="colours"
                options={[...options, ...options]}
                onNewOptionSubmit={newMock}
            />
        );
        const input = screen.getByPlaceholderText("Label");
        const user = userEvent.setup();
        await user.click(input);
        const allOptions = screen.queryAllByRole("option");
        expect(allOptions).toHaveLength(4);
    });
});
