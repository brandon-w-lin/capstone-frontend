<template>
  <div class="container">
    <div class="p-3 m-1 text-center">
      <h1>All books</h1>
      <p>
        Don't see the book you are looking for? Use the
        <b>search bar</b>
        to find new books!
      </p>
      <div class="d-lg-none">
        <form class="d-flex">
          <input
            type="search"
            @keyup.enter="search"
            v-model="searchQuery"
            class="form-main w-100"
            placeholder="Search books"
            aria-label="Search"
          />
          <!-- The second input box is needed (but hidden) to v-model the searchQuery...for some reason whenever there is only one input box, the searchQuery variable will not remain populated when calling the search() method and pushing to the route. -->
          <input v-show="false" v-model="searchQuery" />

          <router-link class="btn btn-outline-success" :to="{ path: '/books/search', query: { q: searchQuery } }">
            Search
          </router-link>
        </form>
      </div>
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
              alt="book cover image"
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

      searchQuery: "",
    };
  },
  methods: {
    search(searchQuery) {
      console.log("hello from search. Passing: ", searchQuery);
      // console.log("testing query: ", "books/search" + this.searchQuery);
      this.$router.push({ path: "/books/search", query: { q: searchQuery } });
      this.searchQuery = "";
    },
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
          });
        });
        console.log(this.books);
      });
    },
  },
  created: function () {
    this.getBooks();
  },
};
</script>

<style></style>
