import React from 'react'
import * as BooksAPI from './api/BooksAPI'
import './App.css'
import './components/book/BookShelf'
import ListBooks from './components/book/ListBooks';
import Search from './components/search/Search';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    this.getAllBooks();
  }

  async getAllBooks() {
    try {
      const books = await BooksAPI.getAll();      
      this.updateStateBooks(books);      
    } catch (exception) {
      alert(`Error: ${exception}`)
    }
  }

  updateStateBooks(books) {
    this.setState(() => ({
      books
    }))
  }

  changeBookShelf = async (book, shelf) => {
    try {
      this.setState((previous) => ({
        books: previous.books.filter(b => b.id !== book.id)
      }))
      await BooksAPI.update(book, shelf);
      this.getAllBooks();      
    } catch (exception) {
      alert(`Error: ${exception}`)
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
          <Search changeBookShelf={this.changeBookShelf} books={this.state.books} ></Search>
        )} />
        <Route exact path='/' render={() => (
          <ListBooks shelfs={shelfs} changeBookShelf={this.changeBookShelf} />          
        )} />
      </div>
    )
  }
}

export default BooksApp
