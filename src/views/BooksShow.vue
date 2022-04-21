<template>
  <div class="home">Books show</div>
  {{ book }}
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
