import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BooksGrid from '../book/BooksGrid';
import * as BooksAPI from '../../api/BooksAPI';

class Search extends Component {

    static propTypes = {
        changeBookShelf: PropTypes.func.isRequired
    }

    state = {
        books: []
    }

    searchBooks = (text) => {
        if (!text) {
            this.updateState([]);
        } else {
            BooksAPI.search(text).then((books) => {
                if (Array.isArray(books)) {
                    this.updateState(books);
                } else {
                    this.updateState([])
                }                           
            });
        }
    }

    updateState = (array) => {
        this.setState(() => ({
            books: array
        }))
    }

    render() {
        const { changeBookShelf } = this.props;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className='close-search' to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" onChange={(event) => this.searchBooks(event.target.value)} placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">                
                    <BooksGrid books={this.state.books} changeBookShelf={changeBookShelf}></BooksGrid>
                </div>
            </div>
        )
    }
}


export default Search;