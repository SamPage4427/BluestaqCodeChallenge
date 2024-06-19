// query for the specific classes in the HTML
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal__close");

// checks if the response is 200 if not returns error code
function checkResponse(res) {
  if (res.status !== 200) {
    Promise.reject(`Error: ${res.status}`);
  } else {
    return res.json();
  }
}

//function to open modal to display the titles of the author
const openModal = (modal) => {
  modal.classList.add("modal__opened");
};

const closeModal = (modal) => {
  modal.classList.remove("modal__opened");
};

modalClose.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal(modal);
});

// fetch the list of all authors and display them as buttons/list items
function list() {
  // fetch the list of authors
  fetch("https://poetrydb.org/author", {
    method: "GET",
  })
    .then(checkResponse)
    .then((data) => {
      console.log(data);
      const authors = data.authors;
      const authorsList = document.getElementById("authors-list");
      authors.forEach((item) => {
        // create buttons for authors
        const authorItem = document.createElement("button");
        const author = item;
        console.log(author);
        // add event listner to each button
        authorItem.addEventListener("click", (e) => {
          e.preventDefault();
          openModal(modal);
          // fetch list of titles by specific author
          fetch(`https://poetrydb.org/author/${author}/title`, {
            method: "GET",
          })
            .then(checkResponse)
            .then((data) => {
              const titles = data;
              const limitedTitles = titles.slice(0, 5); // limit number of titles to 5
              const titleList = document.getElementById("title-list");
              titleList.innerHTML = ""; // clear previous titles
              // create list items for each title
              limitedTitles.forEach((title) => {
                const titleItem = document.createElement("li");
                titleItem.textContent = `Title: ${title.title}`;
                titleList.appendChild(titleItem);
              });
            })
            .catch((err) => console.error(`Error: ${err}`));
        });
        authorItem.textContent = `${item}`;
        authorsList.appendChild(authorItem);
      });
    })
    .catch((err) => console.error(`Error: ${err}`));
}

// fetch the list of a specific author and returns the titles of each poem
function titleList() {
  const authorName = "William Wordsworth";
  fetch(`https://poetrydb.org/author/${authorName}/title`, {
    method: "GET",
  })
    .then(checkResponse)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.error(`Error: ${err}`));
}

// Add a search feature for users to find poems by poet's last name and partial title.
function authorTitleList() {
  fetch(`https://poetrydb.org/author,title/author;title`, {
    method: "GET",
  })
    .then(checkResponse)
    .then((data) => {
      console.log(data);
    });
}

list();
authorTitleList();
