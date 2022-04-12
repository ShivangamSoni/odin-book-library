let library = [];

const Book = function (title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
};

Book.prototype.toggleReadStatus = function () {
  this.isRead = !this.isRead;
};

const addBookToLibrary = function (title, author, pages, isRead) {
  const book = new Book(title, author, pages, isRead);
  library.push(book);
};

addBookToLibrary();
