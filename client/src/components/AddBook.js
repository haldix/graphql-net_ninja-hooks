import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from '../queries/queries';

const initState = {
  name: '',
  genre: '',
  authorId: '',
};

function AddBook() {
  const [addBook, { error }] = useMutation(addBookMutation);
  const { error: authorError, loading, data: authors } = useQuery(
    getAuthorsQuery
  );

  const [state, setState] = useState(initState);

  const handleChange = (e) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitForm = (e) => {
    e.preventDefault();

    // use the addBookMutation
    addBook({
      variables: {
        name: state.name,
        genre: state.genre,
        authorId: state.authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });

    setState(initState);
  };

  const displayAuthors = () => {
    if (loading) {
      return <option disabled>Loading authors</option>;
    } else {
      return authors.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };
  if (error || authorError) {
    return (
      <div>
        Error: {error?.message} {authorError?.message}
      </div>
    );
  }
  return (
    <form id='add-book' onSubmit={submitForm}>
      <div className='field'>
        <label>Book name:</label>
        <input
          type='text'
          name='name'
          value={state.name}
          onChange={handleChange}
        />
      </div>
      <div className='field'>
        <label>Genre:</label>
        <input
          type='text'
          name='genre'
          value={state.genre}
          onChange={handleChange}
        />
      </div>
      <div className='field'>
        <label>Author:</label>
        <select name='authorId' value={state.authorId} onChange={handleChange}>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default AddBook;
