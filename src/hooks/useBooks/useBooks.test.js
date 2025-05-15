import React from "react";
import { render, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useBooks } from "./useBooks";

function TestComponent({ booksRepository, resultRef }) {
  const state = useBooks(booksRepository);
  resultRef.current = state;
  return null;
}

describe("useBooks", () => {
  let mockRepo;
  let resultRef;

  beforeEach(() => {
    mockRepo = {
      getBooks: jest.fn(),
      addBook: jest.fn(),
    };
    resultRef = { current: null };
  });

  it("fetches books on mount and sets loading to false", async () => {
    const mockBooks = [{ name: "1984", author: "Orwell" }];
    mockRepo.getBooks.mockResolvedValue(mockBooks);

    await act(async () => {
      render(<TestComponent booksRepository={mockRepo} resultRef={resultRef} />);
    });

    await waitFor(() => {
      expect(resultRef.current.loading).toBe(false);
      expect(resultRef.current.books).toEqual(mockBooks);
      expect(resultRef.current.error).toBeNull();
    });
  });

  it("handles error during fetching books", async () => {
    mockRepo.getBooks.mockRejectedValue(new Error("Network error"));

    await act(async () => {
      render(<TestComponent booksRepository={mockRepo} resultRef={resultRef} />);
    });

    await waitFor(() => {
      expect(resultRef.current.loading).toBe(false);
      expect(resultRef.current.books).toEqual([]);
      expect(resultRef.current.error).toBe("Failed to load books");
    });
  });

  it("adds a book successfully", async () => {
    mockRepo.getBooks.mockResolvedValue([]);
    mockRepo.addBook.mockResolvedValue(true);

    await act(async () => {
      render(<TestComponent booksRepository={mockRepo} resultRef={resultRef} />);
    });

    await waitFor(() => resultRef.current && !resultRef.current.loading);

    let success;
    await act(async () => {
      success = await resultRef.current.addBook({
        name: "Brave New World",
        author: "Huxley",
      });
    });

    expect(success).toBe(true);
    expect(mockRepo.addBook).toHaveBeenCalledWith({
      name: "Brave New World",
      author: "Huxley",
    });
  });

  it("returns false if adding book fails", async () => {
    mockRepo.getBooks.mockResolvedValue([]);
    mockRepo.addBook.mockRejectedValue(new Error("fail"));

    await act(async () => {
      render(<TestComponent booksRepository={mockRepo} resultRef={resultRef} />);
    });

    await waitFor(() => resultRef.current && !resultRef.current.loading);

    let success;
    await act(async () => {
      success = await resultRef.current.addBook({
        name: "Fail Book",
        author: "Nobody",
      });
    });

    expect(success).toBe(false);
  });

  it("allows manual refetch of books", async () => {
    const books1 = [{ name: "Book 1", author: "A" }];
    const books2 = [{ name: "Book 2", author: "B" }];

    mockRepo.getBooks
      .mockResolvedValueOnce(books1)
      .mockResolvedValueOnce(books2);

    await act(async () => {
      render(<TestComponent booksRepository={mockRepo} resultRef={resultRef} />);
    });

    await waitFor(() => resultRef.current.books.length === 1);

    await act(async () => {
      await resultRef.current.refetch();
    });

    await waitFor(() => {
      expect(resultRef.current.books).toEqual(books2);
    });
  });
});
