import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BookForm } from "./BookForm";

describe("BookForm", () => {
  it("renders input fields and submit button", () => {
    const { getByPlaceholderText, getByText } = render(<BookForm onAdd={jest.fn()} />);

    expect(getByPlaceholderText("Book name")).toBeInTheDocument();
    expect(getByPlaceholderText("Author")).toBeInTheDocument();
    expect(getByText("Add Book")).toBeInTheDocument();
  });

  it("updates input values", () => {
    const { getByPlaceholderText } = render(<BookForm onAdd={jest.fn()} />);

    const nameInput = getByPlaceholderText("Book name");
    const authorInput = getByPlaceholderText("Author");

    fireEvent.change(nameInput, { target: { value: "1984" } });
    fireEvent.change(authorInput, { target: { value: "Orwell" } });

    expect(nameInput.value).toBe("1984");
    expect(authorInput.value).toBe("Orwell");
  });

  it("calls onAdd with correct data and clears inputs on success", async () => {
    const mockOnAdd = jest.fn().mockResolvedValue(true);
    const { getByPlaceholderText, getByText } = render(<BookForm onAdd={mockOnAdd} />);

    const nameInput = getByPlaceholderText("Book name");
    const authorInput = getByPlaceholderText("Author");

    fireEvent.change(nameInput, { target: { value: "Sapiens" } });
    fireEvent.change(authorInput, { target: { value: "Harari" } });

    fireEvent.click(getByText("Add Book"));

    await waitFor(() => {
      expect(mockOnAdd).toHaveBeenCalledWith({ name: "Sapiens", author: "Harari" });
      expect(nameInput.value).toBe("");
      expect(authorInput.value).toBe("");
    });
  });

  it("does not clear inputs if onAdd fails", async () => {
    const mockOnAdd = jest.fn().mockResolvedValue(false);
    const { getByPlaceholderText, getByText } = render(<BookForm onAdd={mockOnAdd} />);

    const nameInput = getByPlaceholderText("Book name");
    const authorInput = getByPlaceholderText("Author");

    fireEvent.change(nameInput, { target: { value: "Test Book" } });
    fireEvent.change(authorInput, { target: { value: "Test Author" } });

    fireEvent.click(getByText("Add Book"));

    await waitFor(() => {
      expect(mockOnAdd).toHaveBeenCalledWith({ name: "Test Book", author: "Test Author" });
      expect(nameInput.value).toBe("Test Book");
      expect(authorInput.value).toBe("Test Author");
    });
  });
});
