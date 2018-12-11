import React, { Component } from 'react';
import BooksGrid from './BooksGrid';
import PropTypes from 'prop-types';

class BookShelf extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        changeBookShelf: PropTypes.func.isRequired
    }

    changeBookShelf = (book, shelf) => {
        this.props.changeBookShelf(book, shelf);
    }

    render() {
        const { title, books } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title"> {title}</h2>
                <div className="bookshelf-books">
                    <BooksGrid books={books} changeBookShelf={this.changeBookShelf} />
                </div>
            </div>
        );
    }

}
export default BookShelf;