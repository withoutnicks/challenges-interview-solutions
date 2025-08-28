import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

import App from "../src/App";

vi.mock("../src/api", () => ({
  default: {
    list: () =>
      Promise.resolve([
        { id: 1, text: "Fressia", completed: false },
        { id: 2, text: "Jacky", completed: false },
      ]),
  },
}));

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(screen.getByText(/Supermarket list/i)).toBeInTheDocument();
  });

  it("no warnings in the console", () => {
    const spy = vi.spyOn(console, "warn");

    render(<App />);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it("button X deletes the item", async () => {
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("Fressia");

    const btn = screen.getAllByRole("button", { name: "X" })[0];

    await user.click(btn);

    expect(screen.queryByText("Fressia")).not.toBeInTheDocument();
  });

  it("input starts in focus", async () => {
    render(<App />);
    const _ipt = await screen.getByRole("textbox");

    expect(_ipt).toHaveFocus();
  });
});
