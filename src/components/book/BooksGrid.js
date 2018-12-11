import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Book from './Book';

class BooksGrid extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        changeBookShelf: PropTypes.func.isRequired
    }

    changeBookShelf = (book, shelf) => {
        this.props.changeBookShelf(book, shelf);
    }

    render() {
        const { books } = this.props;
        return (
            <ol className="books-grid">
                {books.map((book) => (
                    <Book key={book.id} book={book} changeBookShelf={this.changeBookShelf} />
                ))}
            </ol>
        );
    }

}

export default BooksGrid;