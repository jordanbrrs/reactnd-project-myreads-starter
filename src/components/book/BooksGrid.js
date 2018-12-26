import React from 'react'
import PropTypes from 'prop-types';
import Book from './Book';

const BooksGrid = props => {

    const changeBookShelf = (book, shelf) => {
        props.changeBookShelf(book, shelf);
    }
    const { books } = props;        
    return (
        <ol className="books-grid">
            {books.map((book) => (
                <Book key={book.id} book={book} changeBookShelf={changeBookShelf} />
            ))}
        </ol>
    )
}

BooksGrid.propTypes = {
    books: PropTypes.array.isRequired,
    changeBookShelf: PropTypes.func.isRequired
}

export default BooksGrid;