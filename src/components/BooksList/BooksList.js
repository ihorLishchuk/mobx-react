import React from "react";

export const BooksList = ({ books }) => {
  if (!books.length) return <p>No books yet.</p>;

  return (
    <ul>
      {books.map((book, i) => (
        <li key={book.name + i + book.author}>
          <strong>{book.name}</strong> by {book.author}
        </li>
      ))}
    </ul>
  );
}
