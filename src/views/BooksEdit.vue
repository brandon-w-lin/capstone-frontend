<template>
  <div class="home">Books Edit</div>
  <div>
    <form>
      <p>
        <span>ISBN:</span>
        <input type="text" v-model="book.isbn" placeholder="ISBN" />
      </p>
      <p>
        <span>Title:</span>
        <input type="text" v-model="book.title" placeholder="Title" />
      </p>
      <p>
        <span>Summary:</span>
        <input type="text" v-model="book.summary" placeholder="Summary" />
      </p>
      <p>
        <span>Author:</span>
        <input type="text" v-model="book.author" placeholder="Author" />
      </p>
      <p>
        <span>Publisher:</span>
        <input type="text" v-model="book.publisher" placeholder="Publisher" />
      </p>
      <p>
        <span>URL to cover image:</span>
        <input type="text" v-model="book.cover_image_url" placeholder="URL of image cover" />
      </p>
      <p>
        <span>Genre:</span>
        <input type="text" v-model="book.genre" placeholder="Genre" />
      </p>
      <p>
        <span>Year published:</span>
        <input type="text" v-model="book.year" placeholder="Year" />
      </p>
      <button @click="editBook()">Submit changes</button>
    </form>
  </div>
  <p></p>
  <div>
    <button @click="redirectBooksIndex()">Back to all books</button>
    <button @click="redirectBooksShow()">Back to Book</button>
    <button @click="deleteBook()">Delete</button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";

export default {
  data: function () {
    return {
      book: {},
    };
  },
  methods: {
    redirectBooksIndex: function () {
      console.log("Redirecting to /books");
      this.$router.push("/books");
    },
    redirectBooksShow: function () {
      console.log("Redirecting to /books/" + this.$route.params.id);
      this.$router.push("/books/" + this.$route.params.id);
    },
    showBook: function () {
      axios.get("/books/" + this.$route.params.id + ".json").then((response) => {
        console.log(response.data);
        this.book = response.data;
      });
    },
    editBook: function () {
      axios.patch("/books/" + this.$route.params.id + ".json", this.book).then((response) => {
        console.log("successfully updated book", response.data);
        this.book = response.data;
        // display a "success" message, then redirect
      });
      this.redirectBooksShow();
    },
    deleteBook: function () {
      axios.delete("/books/" + this.$route.params.id + ".json").then((response) => {
        console.log("successfully deleted book", response.data);
        this.book = response.data;
        // display a "success" message, then redirect
      });
      this.redirectBooksIndex();
    },
  },
  created: function () {
    this.showBook();
  },
};
</script>
