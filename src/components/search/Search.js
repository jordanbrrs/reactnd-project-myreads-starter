import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BooksGrid from '../book/BooksGrid';
import * as BooksAPI from '../../api/BooksAPI';
import { Debounce } from 'react-throttle';

class Search extends Component {

    static propTypes = {
        changeBookShelf: PropTypes.func.isRequired,
        books: PropTypes.array.isRequired
    }

    state = {
        books: []
    }

    searchBooks = async (text) => {
        if (!text || text === '') {
            this.updateState([]);
        } else {
            try {
                const books = await BooksAPI.search(text);
                if (Array.isArray(books)) {
                    this.updateState(books);
                } else {
                    this.updateState([])
                }
            } catch (exception) {
                alert(`Error: ${exception}`)
            }
        }
    }

    updateState = (array) => {
        this.setState(() => ({
            books: array
        }))
    }

    changeShelf = (booksResult, books) => {
        booksResult.map(br => {
            const book = books.find((b => b.id === br.id));
            if (book) {
                br.shelf = book.shelf;
            }
            return book;
        });

        return booksResult;
    }

    render() {

        const { changeBookShelf, books } = this.props;
        const booksResult = this.changeShelf(this.state.books, books);

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className='close-search' to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <Debounce time="200" handler="onChange">
                            <input type="text" onChange={(event) => this.searchBooks(event.target.value)} placeholder="Search by title or author" />
                        </Debounce>
                    </div>
                </div>
                <div className="search-books-results">
                    <BooksGrid books={booksResult} changeBookShelf={changeBookShelf}></BooksGrid>
                </div>
            </div>
        )
    }
}

export default Search;