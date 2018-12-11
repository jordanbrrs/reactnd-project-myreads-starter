import React from 'react'
import * as BooksAPI from './api/BooksAPI'
import './App.css'
import './components/book/BookShelf'
import BookShelf from './components/book/BookShelf';
import Search from './components/search/Search';
import { Route, Link } from 'react-router-dom';

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks() {
    BooksAPI.getAll().then((books) => {
      this.updateStateBooks(books);
    });
  }

  updateStateBooks(books) {
    this.setState(() => ({
      books
    }))
  }

  changeBookShelf = (book, shelf) => {
    try {
      this.setState((previous) => ({
        books: previous.books.filter(b => b.id !== book.id)
      }))

      BooksAPI.update(book, shelf).then((response) => {
        this.getAllBooks();
      })

    } catch (exception) {
      alert(exception);
    }
  }

  render() {

    const shelfs = [
      { id: 'currentlyReading', name: 'Currently Reading', books: this.state.books.filter(b => b.shelf === 'currentlyReading') },
      { id: 'wantToRead', name: "Want To Read", books: this.state.books.filter(b => b.shelf === 'wantToRead') },
      { id: 'read', name: 'Read', books: this.state.books.filter(b => b.shelf === 'read') }
    ]

    return (
      <div className="app">

        <Route path='/search' render={() => (
          <Search changeBookShelf={this.changeBookShelf}></Search>
        )} />

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {shelfs.map((shelf) => (
                  <BookShelf key={shelf.id} title={shelf.name} books={shelf.books}
                    changeBookShelf={this.changeBookShelf} />
                ))}
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
