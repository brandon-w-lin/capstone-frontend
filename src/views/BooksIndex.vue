<template>
  <div class="home">
    <h1>All books</h1>
    <div v-for="book in books" :key="book.id">
      {{ book }}
      <button @click="redirectBooksShow(book)">More Info</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";

export default {
  data: function () {
    return {
      books: [],
    };
  },
  methods: {
    redirectBooksShow: function (book) {
      console.log("Redirecting to /books/" + book.id);
      this.$router.push("/books/" + book.id);
    },
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
