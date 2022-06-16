<template>
  <div class="container">
    <div class="card m-1">
      <div class="card-body">
        <h1>
          Submit a new song for
          <u>
            {{ book.title }}
          </u>
        </h1>
        <form class="d-flex">
          <input
            type="search"
            @keyup.enter="searchSongs(searchQuery)"
            v-model="searchQuery"
            class="form-control me-2"
            placeholder="Search songs"
            aria-label="Search"
          />
          <!-- The second input box is needed (but hidden) to v-model the searchQuery...for some reason whenever there is only one input box, the searchQuery variable will not remain populated when calling the search() method and pushing to the route. -->
          <input v-show="false" v-model="searchQuery" />

          <!-- <router-link class="btn btn-outline-success" :to="{ path: '/books/search', query: { q: searchQuery } }">
            Search
          </router-link> -->
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-6 p-3" v-for="song in songSearchResponse.items" :key="song.id.videoId">
        <div class="card yt-song">
          <div class="img-container">
            <img :src="song.snippet.thumbnails.default.url" alt="" />
          </div>
          <div class="content-container">
            <div class="row m-1" v-html="song.snippet.title"></div>
            <div class="row m-1">
              <div class="col-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 16 16"
                  :class="song.id.videoId === currentSong.YT_extension && playerState ? 'pause-btn' : 'play-btn'"
                  @click="playPauseButtonHandler(song)"
                >
                  <path class="p1" />
                  <path class="p2" />
                </svg>
              </div>
              <div class="col-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 16 16"
                  :class="associated_songs.has(song.id.videoId) ? 'added-btn' : 'add-btn'"
                >
                  <path class="p1" />
                  <path class="p2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="row">
            <div class="col-sm-4 p-1 cover-image">
              <img
                :src="
                  book.volumeInfo.imageLinks
                    ? Object.values(book.volumeInfo.imageLinks).pop()
                    : 'https://www.seekpng.com/png/full/96-965662_confused-travolta-pulp-fiction-side-john-travolta-confused.png'
                "
                class="img-fluid img-thumbnail rounded-start"
                alt=""
              />
            </div>
            <div class="col-sm-8">
              <div class="card-body text-left">
                <h5 class="card-title">{{ book.volumeInfo.title }}</h5>
                <h6 class="card-subtitle">
                  {{ book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Author(s) unknown" }}
                </h6>
                <p
                  class="card-text"
                  style="height: 100px; text-overflow: ellipsis; overflow: hidden"
                  v-html="book.volumeInfo.description"
                ></p>
                <router-link :to="/books/ + book.id" class="btn btn-primary">More info</router-link>
                <button @click="addBook(book.id)" class="btn btn-primary">Add this book to our database</button>
              </div>
            </div>
          </div> -->
      </div>
    </div>
    <div class="card d-flex flex-row justify-content-center m-1 p-1" v-if="songSearchResponse.nextPageToken">
      <div v-if="songSearchResponse.prevPageToken">
        <button
          class="btn btn-primary"
          @click="searchSongs(searchQuery + '&pageToken=' + songSearchResponse.prevPageToken)"
        >
          Previous page
        </button>
      </div>
      <div v-if="songSearchResponse.nextPageToken">
        <button
          class="btn btn-primary"
          @click="searchSongs(searchQuery + '&pageToken=' + songSearchResponse.nextPageToken)"
        >
          Next page
        </button>
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
      song: {},
      book: {},
      searchQuery: "",
      songSearchResponse: {},
      associated_songs: new Set(),
    };
  },
  methods: {
    getSongs: function (bookID) {
      // console.log("getting songs for: ", this.$route.params.id);
      axios.get("/booksongs/book/" + bookID).then((response) => {
        // console.log("Songs data received: ", response.data);
        response.data.forEach((song) => this.associated_songs.add(song.YT_extension));
      });
    },
    addSongToBook(songID) {
      axios
        .post("/book_songs.json", {
          google_book_extension: this.$route.query.bookID,
          YT_extension: songID,
        })
        .then((response) => {
          console.log("creating booksong association for book / song ID's: ", this.$route.query.bookID, songID);
          console.log("response: ", response);
        });
      this.$router.push("/books/" + this.$route.query.bookID);
    },
    searchSongs(searchQuery) {
      axios.get("/songs/search?q=" + searchQuery).then((response) => {
        console.log("Submitted request for youtube songs matching: ", searchQuery);
        console.log(response.data);
        this.songSearchResponse = response.data;
      });
    },
    createSong: function () {
      axios.post("/songs.json", this.song).then((response) => {
        console.log("successfully submitted song", response.data);
        this.song = response.data;
        // display a "success" message, then redirect
      });
    },
    showBook: function () {
      axios.get("https://www.googleapis.com/books/v1/volumes/" + this.$route.query.bookID).then((response) => {
        console.log(response.data);
        this.apiResponse = response.data;
        this.book = response.data.volumeInfo;
        // this.book.description = this.book.description.setHTML();
      });
    },
    playPauseButtonHandler(song) {
      // check if the song on which this button was clicked is the current song
      // Yes => check playerState
      // playing => pause
      // paused => play
      // No => change song

      if (song.id.videoId === this.currentSong.YT_extension) {
        this.$emit("changePlayerState", !this.playerState);
      } else {
        this.$emit("changeSong", { YT_extension: song.id.videoId, title: song.snippet.title }, {});
      }
    },
  },
  created() {
    this.showBook();
    this.getSongs(this.$route.query.bookID);
  },
};
</script>

<style>
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

.add-btn .p1 {
  fill-rule: "evenodd";
  d: path(
    "M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"
  );
}

.add-btn .p2 {
  d: path(
    "m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"
  );
}

.add-btn:hover path {
  d: path(
    "M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zM8.5 6v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0z"
  );
}

.added-btn path {
  d: path(
    "M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"
  );
}

/* .added-btn:hover .p1 {
  fill-rule: "evenodd";
  d: path("M5.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z");
} */

/* .added-btn:hover .p2 {
  d: path(
    "m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"
  );
} */

.yt-song {
  flex-direction: row;
  height: 90px;
}

.yt-song img {
  transition: transform 0.2s;
  filter: saturate(0.87);
}
.yt-song:hover {
  background-color: var(--bg-card-hover);
  color: var(--font-highest);
}
.yt-song:hover .play-btn,
.yt-song:hover .pause-btn,
.yt-song:hover .add-btn,
.yt-song:hover .added-btn {
  fill: var(--font-highest);
}

.yt-song:hover .button-outline {
  border-color: var(--font-highest);
  color: var(--font-highest);
}
.yt-song:hover .button-outline {
  border-color: var(--font-highest);
  color: var(--font-highest);
}
.yt-song .button-outline:hover {
  color: var(--color1-2);
  background-color: var(--font-highest);
}

.yt-song:hover img {
  transform: scale(1.05);
}

.yt-song .img-container {
  width: 20%; /* if changing, need to also adjust in content-container */
  background-color: black;
  overflow: hidden;
  justify-content: center;
  align-items: center;
}

.yt-song .img-container img {
  display: flex;
  max-height: 100%;
  width: auto;
  max-width: 100%;
  margin: auto;
}
.yt-song .content-container {
  width: 80%; /* if changing, need to also adjust in img-container */
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
