import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries';

// components
import BookDetails from './BookDetails';

function BookList() {
  const { error, loading, data } = useQuery(getBooksQuery);
  const [selected, setSelected] = useState(null);

  function displayBooks() {
    if (loading) {
      return <div>Loading books...</div>;
    } else {
      return data.books.map((book) => {
        return (
          <li key={book.id} onClick={() => setSelected(book.id)}>
            {book.name}
          </li>
        );
      });
    }
  }
  if (error) {
    return <div>Error: {error?.message}</div>;
  }
  return (
    <div>
      <ul id='book-list'>{displayBooks()}</ul>
      <BookDetails bookId={selected} />
    </div>
  );
}

export default BookList;
