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
              @click="playPauseButtonHandler(song)"
              :class="song.YT_extension === currentSong.YT_extension ? 'button-no-format playing' : 'button-no-format'"
            >
              <div class="row">
                <div class="col-1">
                  <div v-if="song.YT_extension === currentSong.YT_extension">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 16 16"
                      :class="playerState ? 'pause-btn' : 'play-btn'"
                    >
                      <path class="p1" />
                      <path class="p2" />
                    </svg>
                    <!-- <svg
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
                    </svg> -->
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
  emits: ["changeSong", "changePlayerState"],
  props: { currentSong: Object, playerState: Boolean },
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
    playPauseButtonHandler(song) {
      // check if the song on which this button was clicked is the current song
      // Yes => check playerState
      // playing => pause
      // paused => play
      // No => change song
      console.log("song.YT_extension: ", song.YT_extension);
      console.log("this.currentSong.YT_extension: ", this.currentSong.YT_extension);
      if (song.YT_extension === this.currentSong.YT_extension) {
        this.$emit("changePlayerState", !this.playerState);
      } else {
        // Determine which songs are following the current song
        let upNext = this.songs.filter((s) => this.songs.indexOf(s) > this.songs.indexOf(song));

        // console.log(upNext.map((s) => s.title));
        this.$emit("changeSong", song, upNext);
      }
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
    changeSongLocal: function (song) {
      // Determine which songs are following the current song
      let upNext = this.songs.filter((s) => this.songs.indexOf(s) > this.songs.indexOf(song));

      // console.log(upNext.map((s) => s.title));
      this.$emit("changeSong", song, upNext);
    },
    // getUpNext: function (song, songs) {},
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

.play-btn,
.pause-btn,
.add-btn,
.added-btn {
  fill: var(--font-high);
}

.play-btn:hover,
.pause-btn:hover,
.add-btn:hover,
.added-btn:hover {
  cursor: pointer;
}

.play-btn .p1 {
  d: path("M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z");
}
.play-btn .p2 {
  d: path(
    "M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"
  );
}

.play-btn:hover path {
  d: path(
    "M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"
  );
}

.pause-btn .p1 {
  d: path(
    "M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z"
  );
}

.pause-btn .p2 {
  d: path(
    "M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"
  );
}

.pause-btn:hover path {
  d: path(
    "M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm6.25-7C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z"
  );
}
</style>
