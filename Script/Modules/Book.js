const Book = function (title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
};

Book.prototype.toggleReadStatus = function () {
  this.isRead = !this.isRead;
};

export default Book;
