import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Setup tests", () => {
    it("true test", () => {
        expect(true).toBe(true);
    });
    it("false test", () => {
        expect(false).toBe(false);
    });
});

describe("App", () => {
    it("Renders correctly", () => {
        render(<App />);
        screen.debug();
    });
});
