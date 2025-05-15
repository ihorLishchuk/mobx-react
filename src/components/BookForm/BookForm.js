import React, { useState } from "react";
export function BookForm({ onAdd }) {
    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const success = await onAdd({ name, author });
      if (success) {
        setName("");
        setAuthor("");
      }
    };
  
    return (
      <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Book name"
        />
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
        />
        <button type="submit">Add Book</button>
      </form>
    );
  }