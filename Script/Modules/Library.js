const Library = class Library {
  books = [];

  addBook(book) {
    this.books.push(book);
  }

  deleteBook(index) {
    this.books.splice(index, 1);
  }

  toggleStatusOfBook(index) {
    const book = this.books[index];
    book.toggleReadStatus();
  }
};

export default Library;
