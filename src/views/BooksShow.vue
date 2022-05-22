<template>
  <div class="container">
    <div class="row">
      <!-- Left side of page holding book info -->
      <div class="col-sm-6 p-2">
        <!-- holds book info -->
        <div class="card p-3 m-2">
          <!-- This row holds the picture and main book info -->
          <div class="row" id="book-info">
            <!-- Picture -->
            <div class="img-container d-flex align-items-center">
              <img :src="book.imageLinks.thumbnail" alt="book cover image" />
            </div>

            <!-- Book Info -->
            <div style="width: 70%">
              <i>{{ book.subtitle }}</i>
              <div class="h1 text-left">
                {{ book.title }}
              </div>
              <div class="h2">{{ book.authors.join(", ") }}</div>
              <div>{{ book.publisher }}</div>
              <div>{{ book.publishedDate }}</div>
              <div>{{ book.categories[0] }}</div>
              <div v-for="identifier in book.industryIdentifiers" :key="identifier.type">
                {{ `${identifier.type}: ${identifier.identifier}` }}
              </div>
            </div>
          </div>

          <router-link
            class="btn btn-primary my-3"
            :to="{ path: '/songs/submit', query: { bookID: this.$route.params.id } }"
          >
            Submit a song
          </router-link>
          <!-- Everything below the main book info (book description) -->
          <div class="row pt-3">
            <div class="col-auto" v-html="book.description"></div>
          </div>
        </div>

        <!-- holds buttons -->
        <div class="card m-2"></div>
      </div>

      <!-- Right side of page holding top songs -->
      <div class="col-sm-6 p-2">
        <div class="card p-3 m-2 h2">Most played songs</div>

        <div v-for="song in songs" :key="song.YT_extension">
          <div class="card m-2">
            <button @click="$emit('changeSong', song)" class="card btn btn-light">{{ song.title }}</button>
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

<style>
#book-info {
  flex-direction: row;
}

.img-container {
  object-fit: cover;
  align-items: center;
}

img {
  width: 100%;
  height: auto;
}
</style>
