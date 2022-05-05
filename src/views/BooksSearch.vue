<template>
  <div class="card">
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
    <div class="card m-3" style="max-width: 540px" v-for="book in results" :key="book.id">
      <div class="row g-0">
        <div class="col-md-4 p-1 cover-image">
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
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ book.volumeInfo.title }}</h5>
            <h6 class="card-subtitle">{{ book.volumeInfo.authors.join(", ") }}</h6>

            <p class="card-text">
              {{
                book.volumeInfo.description.substring(0, charLimit) +
                (book.volumeInfo.description.length > charLimit ? "..." : "")
              }}
            </p>
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
      results: [],
      charLimit: 200,
    };
  },
  methods: {
    googleBooksSearch: function () {
      axios
        .get("https://www.googleapis.com/books/v1/volumes?q=gardens+of+the+moon+inauthor:steven+erikson")
        .then((response) => {
          console.log(response.data);
          this.results = response.data.items;
        });
    },
  },
  created: function () {
    this.googleBooksSearch();
  },
};
</script>
