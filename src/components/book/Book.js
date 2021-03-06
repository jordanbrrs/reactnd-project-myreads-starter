import React from 'react';
import PropTypes from 'prop-types';

const Book = props => {
    const {book, changeBookShelf} = props;
    return (
        <li>
            <div className="book">
                <div className="book-top">
                    { book.imageLinks && book.imageLinks.thumbnail && 
                        <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                    }        
                    <div className="book-shelf-changer">
                        <select value={book.shelf || 'none'} onChange={(event) => changeBookShelf(book, event.target.value)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
            </div>
        </li>
    );
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    changeBookShelf: PropTypes.func.isRequired
}

export default Book;