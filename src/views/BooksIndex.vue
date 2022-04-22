<template>
  <div class="card m-1">
    <h1>All books</h1>
    <div class="card-body">
      <a href="./submit" class="btn btn-primary">Submit a new book</a>
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
          <!-- <img :src="book.cover_image_url" class="img-fluid rounded-start" alt="..." /> -->
          <img :src="book.cover_image_url" class="img-fluid img-thumbnail rounded-start" alt="..." />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ book.title }}</h5>
            <p class="card-text">
              {{ book.summary.substring(0, charLimit) + (book.summary.length > charLimit ? "..." : "") }}
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
      books: [],
      charLimit: 200,
    };
  },
  methods: {
    getBooks: function () {
      axios.get("http://localhost:3000/books.json").then((response) => {
        console.log(response.data);
        this.books = response.data;
      });
    },
  },
  created: function () {
    this.getBooks();
  },
};
</script>
