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
      <!-- Padding added to the column before adding the card -->
      <div class="col-xl-6 p-3" v-for="song in songSearchResponse.items" :key="song.id.videoId">
        <div class="card yt-song">
          <div class="img-container">
            <img :src="song.snippet.thumbnails.default.url" alt="" />
          </div>
          <div class="content-container">
            <div class="row m-1" v-html="song.snippet.title"></div>
            <div class="row m-1">
              <div class="col-auto">
                <button
                  @click="$emit('changeSong', { YT_extension: song.id.videoId, title: song.snippet.title })"
                  class="btn btn-primary"
                >
                  Listen
                </button>
              </div>
              <div class="col-auto">
                <button class="btn btn-primary" @click="addSongToBook(song.id.videoId)">Add to book</button>
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
.yt-song {
  flex-direction: row;
  height: 90px;
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
