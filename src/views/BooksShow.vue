<template>
  <div class="home">Books show</div>
  <div>
    {{ book }}
  </div>
  <div>
    <button @click="redirectBooksIndex()">Back to all books</button>
    <button @click="redirectBooksEdit()">Edit Book</button>
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
    redirectBooksEdit: function () {
      console.log("Redirecting to /books/" + this.$route.params.id + "/edit");
      this.$router.push("/books/" + this.$route.params.id + "/edit");
    },
    showBook: function () {
      axios.get("http://localhost:3000/books/" + this.$route.params.id + ".json").then((response) => {
        console.log(response.data);
        this.book = response.data;
      });
    },
  },
  created: function () {
    this.showBook();
  },
};
</script>
