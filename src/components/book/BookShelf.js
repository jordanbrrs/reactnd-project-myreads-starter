import React from 'react';
import BooksGrid from './BooksGrid';
import PropTypes from 'prop-types';

const BookShelf = props => {

    const changeBookShelf = (book, shelf) => {
        props.changeBookShelf(book, shelf);
    }

    const { title, books } = props;
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title"> {title}</h2>
            <div className="bookshelf-books">
                <BooksGrid books={books} changeBookShelf={changeBookShelf} />
            </div>
        </div>
    );
}

BookShelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    changeBookShelf: PropTypes.func.isRequired
}

export default BookShelf;