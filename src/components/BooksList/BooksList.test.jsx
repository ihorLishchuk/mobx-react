import React from "react";
import { render, screen } from "@testing-library/react";
import { BooksList } from "./BooksList";

describe("BooksList component", () => {
  it("renders 'No books yet.' when the books array is empty", () => {
    render(<BooksList books={[]} />);
    expect(screen.getByText("No books yet.")).toBeInTheDocument();
  });

  it("renders a list of books", () => {
    const books = [
      { name: "1984", author: "George Orwell" },
      { name: "Brave New World", author: "Aldous Huxley" },
    ];

    render(<BooksList books={books} />);

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(2);

    expect(screen.getByText("1984")).toBeInTheDocument();
    expect(screen.getByText(/by George Orwell/)).toBeInTheDocument();

    expect(screen.getByText("Brave New World")).toBeInTheDocument();
    expect(screen.getByText(/by Aldous Huxley/)).toBeInTheDocument();
  });
});
