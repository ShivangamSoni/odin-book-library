// Book Class
const Book = function (title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
};

Book.prototype.toggleReadStatus = function () {
  this.isRead = !this.isRead;
};

// Library
let library = [];

const addBookToLibrary = (book) => {
  library.push(book);
};
const toggleStatus = (e) => {
  const index = e.target.dataset.id;
  const book = library[index];
  book.toggleReadStatus();
  renderLibrary();
};

const deleteBook = (e) => {
  const index = e.target.dataset.id;
  library.splice(index, 1);
  renderLibrary();
};

// Book List
const booksList = document.querySelector(".booksList");

const header = document.querySelector(".header");
const main = document.querySelector(".main");

// Modal Elements
const addBtn = document.querySelector(".addBtn");
const modal = document.querySelector(".addModal");
const modalCloseBtn = document.querySelector(".modal-closeBtn");
const addBookForm = document.querySelector(".addModal-form");

const clearBookList = () => {
  booksList.innerHTML = "";
};

const renderLibrary = () => {
  clearBookList();

  const sectionTitle = document.querySelector(".main > .sectionTitle");
  if (library.length === 0) {
    sectionTitle.textContent = "Your Books (0). Add Some!";
    return;
  } else {
    sectionTitle.textContent = `Your Books (${library.length}).`;
  }

  library.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("bookCard");

    const cardInfo = document.createElement("div");
    cardInfo.classList.add("bookCard-info");

    const title = document.createElement("h3");
    title.classList.add("bookCard-title");
    title.innerHTML = `${book.title}&nbsp;`;

    const pages = document.createElement("span");
    pages.classList.add("bookCard-pages");
    pages.textContent = `(${book.pages} Pages)`;

    title.appendChild(pages);

    const author = document.createElement("h4");
    author.classList.add("bookCard-author");
    author.innerHTML = `By: <strong>${book.author}</strong>`;

    cardInfo.appendChild(title);
    cardInfo.appendChild(author);

    const cardActions = document.createElement("div");
    cardActions.classList.add("bookCard-actions");

    const readStatusButton = document.createElement("button");
    readStatusButton.classList.add("bookCard-readStatus", "btn");
    if (book.isRead) {
      readStatusButton.classList.add("checked");
      readStatusButton.title = "Read";
    } else {
      readStatusButton.title = "Not Read Yet";
    }
    readStatusButton.dataset.id = index;
    readStatusButton.addEventListener("click", toggleStatus);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("bookCard-btn", "btn");
    deleteButton.title = "Delete Book";
    deleteButton.innerHTML = `<img src="./Assets/icons/close-box-multiple.svg" alt="Delete Book" />`;
    deleteButton.dataset.id = index;
    deleteButton.addEventListener("click", deleteBook);

    cardActions.appendChild(readStatusButton);
    cardActions.appendChild(deleteButton);

    bookCard.appendChild(cardInfo);
    bookCard.appendChild(cardActions);

    booksList.appendChild(bookCard);
  });
};

const closeAndResetModal = () => {
  header.classList.remove("hide");
  main.classList.remove("hide");
  modal.classList.remove("show");

  Array.from(addBookForm).forEach((input) => {
    if (input.type === "checkbox") {
      input.checked = false;
    } else {
      input.value = "";
    }
  });
};

addBtn.addEventListener("click", (e) => {
  header.classList.add("hide");
  main.classList.add("hide");
  modal.classList.add("show");
});

modalCloseBtn.addEventListener("click", closeAndResetModal);

addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = {};

  Array.from(e.target).forEach((input) => {
    if (input.type === "submit") {
      return;
    }

    let value;
    if (input.type === "checkbox") {
      value = input.checked;
    } else if (input.type === "number") {
      value = input.valueAsNumber;
    } else {
      value = input.value;
    }

    formData[input.name] = value;
  });

  const book = new Book(formData.title, formData.author, formData.pages, formData.read);
  addBookToLibrary(book);
  renderLibrary();
  closeAndResetModal();
});

renderLibrary();
