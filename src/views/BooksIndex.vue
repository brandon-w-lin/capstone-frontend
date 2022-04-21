<template>
  <div class="home">
    <h1>All books</h1>
    <div v-for="book in books" :key="book.id">
      {{ book }}
      <button @click="redirectBooksShow()">More Info</button>
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
      console.log("Redirecting to /books");
      this.$route.push("/books/" + book.id + ".json");
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
