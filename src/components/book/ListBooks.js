import React from 'react';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';

const ListBooks = props => {
    const { shelfs, changeBookShelf } = props;
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {shelfs.map((shelf) => (
                        <BookShelf key={shelf.id} title={shelf.name} books={shelf.books}
                            changeBookShelf={changeBookShelf} />
                    ))}
                </div>
            </div>
            <div className="open-search">
                <Link to='/search'>Add a book</Link>
            </div>
        </div>
    );
}

ListBooks.propTypes = {
    shelfs: PropTypes.array.isRequired,
    changeBookShelf: PropTypes.func.isRequired
}

export default ListBooks;