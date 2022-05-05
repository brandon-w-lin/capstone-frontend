<template>
  <div>
    <div class="column">test left</div>
    <div class="column">test right</div>
  </div>
  <div class="card m-1">
    <div class="card-body">
      <h2 class="card-subtitle text-muted">
        <i>{{ book.subtitle }}</i>
      </h2>
      <h1 class="card-title">
        {{ book.title }}
      </h1>
      <h3>{{ book.authors.join(", ") }}</h3>
      <div>{{ book.publisher }}</div>
      <div>{{ book.publishedDate }}</div>
      <div v-html="book.description"></div>
      <div>{{ book.categories[0] }}</div>
      <div v-for="identifier in book.industryIdentifiers" :key="identifier.type">
        {{ `${identifier.type}: ${identifier.identifier}` }}
      </div>
    </div>
  </div>
  <div class="card m-1">
    <div class="card-body">
      <a href="./" class="btn btn-primary">Back to all books</a>
      <a :href="'./books/' + this.$route.params.id + '/edit'" class="btn btn-primary">Edit</a>
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
      apiResponse: {},
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
      axios.get("https://www.googleapis.com/books/v1/volumes/" + this.$route.params.id).then((response) => {
        console.log(response.data);
        this.apiResponse = response.data;
        this.book = response.data.volumeInfo;
        // this.book.description = this.book.description.setHTML();
      });
    },
  },
  created: function () {
    this.showBook();
  },
};
</script>
