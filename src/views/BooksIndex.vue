<template>
  <div class="row card">
    <h1>All books</h1>
    <div class="card-body">
      <a href="/books/submit" class="btn btn-primary">Submit a new book</a>
    </div>
  </div>

  <div class="row">
    <!-- Padding added to the column before adding the card -->
    <div class="col-6 p-3" v-for="book in books" :key="book.id">
      <div class="card">
        <div class="row">
          <div class="col-sm-4 p-1 cover-image">
            <img
              :src="
                book.imageLinks
                  ? book.imageLinks.thumbnail || Object.values(book.imageLinks).pop()
                  : 'https://www.seekpng.com/png/full/96-965662_confused-travolta-pulp-fiction-side-john-travolta-confused.png'
              "
              class="img-fluid img-thumbnail rounded-start"
              alt=""
            />
          </div>
          <div class="col-sm-8">
            <div class="card-body text-left">
              <h5 class="card-title">{{ book.title }}</h5>
              <h6 class="card-subtitle">
                {{ book.authors ? book.authors.join(", ") : "Author(s) unknown" }}
              </h6>
              <p
                class="card-text"
                style="height: 100px; text-overflow: ellipsis; overflow: hidden"
                v-html="book.description"
              ></p>
              <router-link :to="/books/ + book.id" class="btn btn-primary">More Info</router-link>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
      </div>
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
    getBooks: function () {
      // First pulls the indexed books from the local backend
      axios.get("http://localhost:3000/books.json").then((response) => {
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
.centered {
  margin: 0 auto;
}
</style>
