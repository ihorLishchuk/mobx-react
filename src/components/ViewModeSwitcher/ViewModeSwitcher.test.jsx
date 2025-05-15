import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ViewModeSwitcher } from "./ViewModeSwitcher";
import { VIEW_MODE } from "../../shared";

jest.mock("../../hooks", () => ({
  useViewMode: jest.fn(),
}));

import { useViewMode } from "../../hooks";

describe("ViewModeSwitcher", () => {
  let mockViewMode;

  beforeEach(() => {
    let internalMode = VIEW_MODE.PUBLIC;

    mockViewMode = {
      get mode() {
        return internalMode;
      },
      set mode(value) {
        internalMode = value;
      },
      get isPublic() {
        return internalMode === VIEW_MODE.PUBLIC;
      },
      get isPrivate() {
        return internalMode === VIEW_MODE.PRIVATE;
      },
    };

    useViewMode.mockReturnValue(mockViewMode);
  });

  it("renders both buttons", () => {
    const { getByText } = render(<ViewModeSwitcher />);
    expect(getByText("Public")).toBeInTheDocument();
    expect(getByText("Private")).toBeInTheDocument();
  });

  it("highlights the correct button based on mode", () => {
    const { getByText, rerender } = render(<ViewModeSwitcher />);
    const publicBtn = getByText("Public");
    const privateBtn = getByText("Private");

    expect(publicBtn.style.backgroundColor).toBe("lightblue");
    expect(privateBtn.style.backgroundColor).toBe("white");

    mockViewMode.mode = VIEW_MODE.PRIVATE;
    rerender(<ViewModeSwitcher />);

    expect(publicBtn.style.backgroundColor).toBe("white");
    expect(privateBtn.style.backgroundColor).toBe("lightblue");
  });

  it("updates mode on button click", () => {
    const { getByText, rerender } = render(<ViewModeSwitcher />);
    const publicBtn = getByText("Public");
    const privateBtn = getByText("Private");

    fireEvent.click(privateBtn);
    expect(mockViewMode.mode).toBe(VIEW_MODE.PRIVATE);

    rerender(<ViewModeSwitcher />);
    expect(privateBtn.style.backgroundColor).toBe("lightblue");

    fireEvent.click(publicBtn);
    expect(mockViewMode.mode).toBe(VIEW_MODE.PUBLIC);

    rerender(<ViewModeSwitcher />);
    expect(publicBtn.style.backgroundColor).toBe("lightblue");
  });
});