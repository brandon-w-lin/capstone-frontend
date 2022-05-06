<template>
  <div class="container">
    <div class="row">
      <!-- Left side of page holding book info -->
      <div class="col-sm-6 p-2">
        <!-- holds book info -->
        <div class="card p-3 m-2">
          <!-- This row holds the picture and main book info -->
          <div class="row mb-2">
            <!-- Picture -->
            <div class="col-auto">
              <img :src="book.imageLinks.thumbnail" class="img-fluid img-thumbnail rounded-start" alt="..." />
            </div>

            <!-- Book Info -->
            <div class="col-auto text-left align-middle">
              <div class="row card-subtitle text-muted">
                <i>{{ book.subtitle }}</i>
              </div>
              <div class="row h1 card-title">
                {{ book.title }}
              </div>
              <div class="row h3">{{ book.authors.join(", ") }}</div>
              <div class="row">{{ book.publisher }}</div>
              <div class="row">{{ book.publishedDate }}</div>
              <div class="row">{{ book.categories[0] }}</div>
              <div class="row" v-for="identifier in book.industryIdentifiers" :key="identifier.type">
                {{ `${identifier.type}: ${identifier.identifier}` }}
              </div>
            </div>
          </div>

          <!-- Everything below the main book info (book description) -->
          <div class="row">
            <div class="col-auto" v-html="book.description"></div>
          </div>
        </div>

        <!-- holds buttons -->
        <div class="card m-2">
          <div class="row">
            <div class="col">Back to all books</div>
            <div class="col">Submit new song</div>
          </div>
        </div>
      </div>

      <!-- Right side of page holding top songs -->
      <div class="col-sm-6 p-2">
        <div class="row card m-2 h2">Most played songs for {{ book.title }}</div>
        <div class="row card m-2">Song 1</div>
        <div class="row card m-2">Song 2</div>
        <div class="row card m-2">Song 3</div>
      </div>
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
