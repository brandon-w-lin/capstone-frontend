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

        <div v-for="song in songs" :key="song.YT_extension">
          <div class="row card m-2">
            {{ song.title }}

            <button @click="$emit('changeSong', song)" class="btn btn-primary">Play this song</button>
          </div>
        </div>
        <div v-if="!associated_songs_exist">
          <div class="card m-2">Be the first to add a song!</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";

export default {
  emits: ["changeSong"],
  data: function () {
    return {
      apiResponse: {},
      book: {},
      associated_songs: {},
      songs: [],
      associated_songs_exist: true,
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
    getSongs: function () {
      console.log("getting songs for: ", this.$route.params.id);
      axios.get("http://localhost:3000/booksongs/book/" + this.$route.params.id).then((response) => {
        console.log("Songs data received: ", response.data);
        this.associated_songs = response.data;
        response.data.length === 0 ? (this.associated_songs_exist = false) : (this.associated_songs_exist = true);
        response.data.forEach((song) => {
          console.log("need to look up: ", song.YT_extension);
          axios.get("http://localhost:3000/songs/id/" + song.YT_extension + ".json").then((response) => {
            console.log(response.data);
            this.songs.push(response.data);
          });
        });
      });
    },
  },
  created: function () {
    this.showBook();
    this.getSongs();
  },
};
</script>
