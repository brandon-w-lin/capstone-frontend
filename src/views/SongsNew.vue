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
                  :class="song.id.videoId === currentSong.YT_extension ? 'pause-btn' : 'play-btn'"
                >
                  <path class="p1" />
                  <path class="p2" />
                </svg>

                <button
                  @click="$emit('changeSong', { YT_extension: song.id.videoId, title: song.snippet.title })"
                  class="button-outline"
                >
                  Listen
                </button>
              </div>
              <div class="col-auto">
                <button class="button-outline" @click="addSongToBook(song.id.videoId)">Add to book</button>
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
  emits: ["changeSong"],
  props: { currentSong: Object },
  data: function () {
    return {
      song: {},
      book: {},
      searchQuery: "",
      songSearchResponse: {},
    };
  },
  methods: {
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
  },
  created() {
    this.showBook();
  },
};
</script>

<style>
.play-btn,
.pause-btn {
  fill: var(--font-high);
}

.play-btn:hover,
.pause-btn:hover {
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
.yt-song:hover .pause-btn {
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
