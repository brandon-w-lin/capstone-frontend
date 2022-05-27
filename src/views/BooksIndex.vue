<template>
  <div class="card m-1">
    <h1>All books</h1>
    <p>
      Don't see the book you are looking for? Use the
      <b>search bar</b>
      to find new books!
    </p>
  </div>

  <div class="row">
    <!-- Padding added to the column before adding the card -->
    <div class="col-xxl-4 col-lg-6 p-3" v-for="book in books" :key="book.id">
      <router-link :to="/books/ + book.id" class="card book selected">
        <div class="img-container">
          <img
            :src="
              book.imageLinks
                ? book.imageLinks.thumbnail || Object.values(book.imageLinks).pop()
                : 'https://www.seekpng.com/png/full/96-965662_confused-travolta-pulp-fiction-side-john-travolta-confused.png'
            "
            class="img-fluid float-left zoom"
            style="width: 100%; min-height: 100%"
            alt=""
          />
        </div>
        <div class="content-container p-2 align-middle">
          <h5 class="card-title">{{ book.title }}</h5>
          <h6 class="card-subtitle">
            {{ book.authors ? book.authors.join(", ") : "Author(s) unknown" }}
          </h6>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      // Google API Data
      books: [],

      // My API
      catalogued_books: [],
      charLimit: 200,
    };
  },
  methods: {
    removeTags(string) {
      string === null || string === "" ? false : (string = string.toString());
      return string.replace(/(<([^>]+)>)/gi, "");
    },
    getBooks: function () {
      // First pulls the indexed books from the local backend
      axios.get("/books.json").then((response) => {
        console.log("books in my API: ", response.data);
        this.catalogued_books = response.data;

        // Then, pulls book data from the google books API
        response.data.forEach((book) => {
          axios.get("https://www.googleapis.com/books/v1/volumes/" + book.google_book_extension).then((response) => {
            let temp = response.data.volumeInfo;
            temp.id = response.data.id;
            this.books.push(temp);
            console.log(this.books);
          });
        });
      });
    },
  },
  created: function () {
    this.getBooks();
  },
};
</script>

<style>
.card {
  border: none;
}

.content-container {
  width: 70%;
  margin: auto;
}

.img-container {
  width: 30%;
}

.img-container {
  object-fit: cover;
}

.book {
  flex-direction: row;
  height: 175px;
  overflow: hidden;
  text-decoration: none;
  box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.6);
  transition: 0.5s, color 0.5s;
  color: black;
}

.book:hover {
  box-shadow: 0px 0px 12px 2px rgba(172, 170, 244, 0.7);
  color: #305376;
}

.book img {
  transition: transform 0.2s;
}

.book:hover img {
  transform: scale(1.1);
}
</style>
