import React from "react";
import { observer } from "mobx-react-lite";
import { useBooks } from "../../hooks";
import { BooksList, BookForm, ViewModeSwitcher } from "../../components";

export const BooksPage = observer(() => {  
  const { books, loading, error, refetch, addBook } = useBooks();

  const handleAdd = async ({ name, author }) => {
    const success = await addBook({ name, author });
    if (success) {
      refetch();
      return true;
    }
    return false;
  };

  return (
    <>
      <h1>Your books: {books?.length}</h1>

      <ViewModeSwitcher />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <BooksList books={books} />
      <BookForm onAdd={handleAdd} />
    </>
  );
})
