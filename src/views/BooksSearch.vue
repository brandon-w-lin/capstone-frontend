<template>
  <div class="container">
    <div class="card">
      <h1>Search results</h1>
    </div>

    <div class="row">
      <!-- Padding added to the column before adding the card -->
      <div class="col-6 p-3" v-for="book in results" :key="book.id">
        <div class="card">
          <div class="row">
            <div class="col-sm-4 p-1 cover-image">
              <img
                :src="
                  book.volumeInfo.imageLinks
                    ? Object.values(book.volumeInfo.imageLinks).pop()
                    : 'https://www.seekpng.com/png/full/96-965662_confused-travolta-pulp-fiction-side-john-travolta-confused.png'
                "
                class="img-fluid img-thumbnail rounded-start"
                alt=""
              />
            </div>
            <div class="col-sm-8">
              <div class="card-body text-left">
                <h5 class="card-title">{{ book.volumeInfo.title }}</h5>
                <h6 class="card-subtitle">
                  {{ book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Author(s) unknown" }}
                </h6>
                <p
                  class="card-text"
                  style="height: 100px; text-overflow: ellipsis; overflow: hidden"
                  v-html="book.volumeInfo.description"
                ></p>
                <router-link :to="/books/ + book.id" class="btn btn-primary">More info</router-link>
                <button @click="addBook(book.id)" class="btn btn-primary">Add this book to our database</button>
              </div>
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
      results: [],
      charLimit: 200,
    };
  },
  methods: {
    googleBooksSearch: function () {
      let queryRoute = this.$route.query.q;
      console.log("query route is: ", queryRoute.split(" ").join("+"));
      axios.get("https://www.googleapis.com/books/v1/volumes?q=" + queryRoute.split(" ").join("+")).then((response) => {
        console.log(
          "API response from:" + "https://www.googleapis.com/books/v1/volumes?q=" + queryRoute.split(" ").join("+"),
          response.data
        );
        this.results = response.data.items;
      });
    },
    addBook(bookID) {
      console.log("attempting to add book :", bookID);
      axios.post("http://localhost:3000/books.json", { google_book_extension: bookID }).then((response) => {
        console.log("successfully submitted book", response.data);
        // display a "success" message, then redirect
      });
    },
  },
  created: function () {
    this.googleBooksSearch();
    this.$watch(
      // Allows the search results to change from same base route
      () => this.$route.query,
      (toQuery, previousQuery) => {
        if (this.$route.name === "books-search" && toQuery != previousQuery) {
          console.log("current route: ", this.$route);
          console.log("old query: ", previousQuery);
          console.log("new query: ", toQuery);
          this.googleBooksSearch();
        }
      }
    );
  },
};
</script>
