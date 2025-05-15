import { useEffect, useState, useCallback } from "react";
import { BooksRepository } from "../../repositories";
import { useViewMode } from "../../hooks";

export const useBooks = (booksRepository = new BooksRepository()) => {
  const viewMode = useViewMode();
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const books = await booksRepository.getBooks(viewMode.isPrivate);
      setBooks(books);
    } catch (e) {
      setError("Failed to load books");
    } finally {
      setLoading(false);
    }
  }, []);

  const addBook = async ({ name, author }) => {
    try {
      return await booksRepository.addBook({ name, author });
    } catch {
      return false;
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks, viewMode.mode]);

  return { books, loading, error, refetch: fetchBooks, addBook };
}
