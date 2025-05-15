import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BooksPage } from "./BooksPage";

const defaultUseBooksMock = {
  books: [{ name: "Test Book", author: "Test Author" }],
  loading: false,
  error: null,
  refetch: jest.fn(),
  addBook: jest.fn().mockResolvedValue(true),
};

jest.mock("../../hooks", () => ({
  useBooks: jest.fn(),
  useViewMode: jest.fn(),
}));

jest.mock("../../components/ViewModeSwitcher/ViewModeSwitcher", () => ({
  ViewModeSwitcher: () => <div data-testid="mock-switcher" />,
}));

import { useBooks } from "../../hooks";

describe("BooksPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders list of books", () => {
    useBooks.mockReturnValue(defaultUseBooksMock);

    render(<BooksPage />);
    expect(screen.getByText(/Your books:/i)).toBeInTheDocument();
    expect(screen.getByText("Test Book")).toBeInTheDocument();
    expect(screen.getByText(/by Test Author/i)).toBeInTheDocument();
  });

  it("shows loading state", () => {
    useBooks.mockReturnValue({
      books: [],
      loading: true,
      error: null,
      refetch: jest.fn(),
      addBook: jest.fn(),
    });

    render(<BooksPage />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows error message", () => {
    useBooks.mockReturnValue({
      books: [],
      loading: false,
      error: "Failed to load",
      refetch: jest.fn(),
      addBook: jest.fn(),
    });

    render(<BooksPage />);
    expect(screen.getByText("Failed to load")).toBeInTheDocument();
  });
});
