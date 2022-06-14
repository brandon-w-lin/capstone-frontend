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
            class="button-outline inline w-100 text-center py-1 my-3"
            :to="{ path: '/songs/submit', query: { bookID: this.$route.params.id } }"
          >
            Submit a song
          </router-link>
          <!-- Everything below the main book info (book description) -->
          <div class="row">
            <div class="col-auto" v-html="book.description"></div>
          </div>
        </div>
      </div>

      <!-- Top songs -->
      <div class="col-sm-6 p-2">
        <div class="card p-3 m-2 h2">Most played songs</div>

        <div v-for="song in songs" :key="song.YT_extension">
          <div class="card song m-2">
            <button
              @click="$emit('changeSong', song)"
              :class="song.YT_extension === currentSong.YT_extension ? 'button-no-format playing' : 'button-no-format'"
            >
              <div class="row">
                <div class="col-1">
                  <div v-if="song.YT_extension === currentSong.YT_extension" class="playing-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      class="bi bi-music-note-beamed"
                      viewBox="0 0 16 16"
                      fill="var(--color1-5)"
                    >
                      <path
                        d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z"
                      />
                      <path fill-rule="evenodd" d="M14 11V2h1v9h-1zM6 3v10H5V3h1z" />
                      <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z" />
                    </svg>
                    <!-- <img src="@/assets/music-note-beamed.svg" style="fill: green" alt="Now playing icon" /> -->
                  </div>
                </div>
                <div class="col">
                  {{ song.title }}
                </div>
              </div>
            </button>
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
  props: { currentSong: Object },
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
      axios.get("/booksongs/book/" + this.$route.params.id).then((response) => {
        console.log("Songs data received: ", response.data);
        this.associated_songs = response.data;
        response.data.length === 0 ? (this.associated_songs_exist = false) : (this.associated_songs_exist = true);
        response.data.forEach((song) => {
          console.log("need to look up: ", song.YT_extension);
          axios.get("/songs/id/" + song.YT_extension + ".json").then((response) => {
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
