import React from 'react'
import * as BooksAPI from './api/BooksAPI'
import './App.css'
import './components/book/BookShelf'
import BookShelf from './components/book/BookShelf';

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.updateBooks(books);
    });
  }

  updateBooks(books) {
    this.setState(() => ({
      books
    }))
  }

  render() {

    const shelfs = [
      { id: 'currentlyReading', name: 'Currently Reading' },
      { id: 'wantToRead', name: "Want To Read" },
      { id: 'read', name: 'Read' }
    ]

    if (this.state.books.length > 0) {
      console.log(this.state.books);
    }

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {shelfs.map((shelf) => (
                    <BookShelf key={shelf.id} title={shelf.name} books={this.state.books.filter(b => b.shelf === shelf.id)} />
                  ))}
                </div>
              </div>
              <div className="open-search">
                <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default BooksApp
