const Library = function () {
  this.books = [];
};

Library.prototype.addBook = function (book) {
  this.books.push(book);
};

Library.prototype.deleteBook = function (index) {
  this.books.splice(index, 1);
};

Library.prototype.toggleStatusOfBook = function (index) {
  const book = this.books[index];
  book.toggleReadStatus();
};

export default Library;
