import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

// add RTL matchers to vitest
expect.extend(matchers);

// clean up after every test - unmount our components every time
afterEach(() => {
    cleanup();
});
