<template>
  <TestChild btn-text="testing" />
  <IndexPage :books="books" :catalogued_books="catalogued_books" />
</template>

<script>
import axios from "axios";
import TestChild from "../components/TestChild.vue";
import IndexPage from "../components/IndexPage.vue";

export default {
  components: {
    TestChild,
    IndexPage,
  },
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
        // enhancement: can this be done in a batch instead of one by one? Will need to put some pagination in to limit the load time if the database gets big
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

<style>
.centered {
  margin: 0 auto;
}
</style>
