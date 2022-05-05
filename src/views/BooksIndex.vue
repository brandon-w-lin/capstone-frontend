<template>
  <div class="card m-1">
    <h1>All books</h1>
    <div class="card-body">
      <a href="/books/submit" class="btn btn-primary">Submit a new book</a>
    </div>
  </div>

  <!-- cards not in use -->
  <!-- <div class="row">
      <div class="col-sm-4 mb-2" v-for="book in books" :key="book.id">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ book.title }}</h5>
            <p class="card-text">Brief blurb about the book</p>
            <a :href="'/books/' + book.id" class="btn btn-primary">More Info</a>
          </div>
        </div>
      </div>
    </div> -->
  <!-- <div class="card mb-3" style="max-width: 540px" v-for="book in books" :key="book.id"> -->

  <!-- cards in use -->
  <div class="row">
    <div class="card m-3" style="max-width: 540px" v-for="book in books" :key="book.id">
      <div class="row g-0">
        <div class="col-md-4 p-1 cover-image">
          <img :src="book.imageLinks.thumbnail" class="img-fluid img-thumbnail rounded-start" alt="..." />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ book.title }}</h5>
            <p
              class="card-text"
              v-html="book.description.substring(0, charLimit) + (book.description.length > charLimit ? '...' : '')"
            ></p>
            <a :href="'/books/' + book.id" class="btn btn-primary">More Info</a>

            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
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
          axios.get("https://www.googleapis.com/books/v1/volumes/" + book.googleID).then((response) => {
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
