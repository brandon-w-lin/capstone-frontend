<template>
  <div class="card m-1">
    <div class="card-body">
      <h1>Submit a new book</h1>
    </div>
  </div>
  <div class="card m-1">
    <div class="card-body">
      <form>
        <p>
          <span>Google ID:</span>
          <input type="text" v-model="book.googleID" placeholder="Google ID" />
        </p>
        <!-- <p>
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
        </p> -->
      </form>
      <button @click="createBook()" class="btn btn-primary">Submit</button>
    </div>
  </div>
  <div class="card m-1">
    <div class="card-body">
      <a href="./" class="btn btn-primary">Back to all books</a>
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
      book: {},
    };
  },
  methods: {
    createBook: function () {
      axios.post("/books.json", this.book).then((response) => {
        console.log("successfully submitted book", response.data);
        this.book = response.data;
        // display a "success" message, then redirect
      });
    },
  },
};
</script>
