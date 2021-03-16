import React from 'react';
import { useQuery } from '@apollo/client';
import { getBookQuery } from '../queries/queries';

function BookDetails({ bookId }) {
  const { error, loading, data } = useQuery(getBookQuery, {
    variables: { id: bookId },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error?.message}</div>;

  function displayBookDetails() {
    if (data.book) {
      const {
        book: { name, author, genre },
      } = data;
      return (
        <div>
          <h2>{name}</h2>
          <p>{genre}</p>
          <p>{author.name}</p>
          <p>All books by this author:</p>
          <ul className='other-books'>
            {author.books.map((item) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected...</div>;
    }
  }
  return <div id='book-details'>{displayBookDetails()}</div>;
}

export default BookDetails;
