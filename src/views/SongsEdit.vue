<template>
  <div class="home">Songs Edit</div>
  <div>
    <form>
      <p>
        <span>URL:</span>
        <input type="text" v-model="song.url" placeholder="URL" />
      </p>
      <p>
        <span>Title:</span>
        <input type="text" v-model="song.title" placeholder="Title" />
      </p>
      <p>
        <span>Artist:</span>
        <input type="text" v-model="song.artist" placeholder="Artist" />
      </p>
      <p>
        <span>Album:</span>
        <input type="text" v-model="song.album" placeholder="Album" />
      </p>
      <p>
        <span>Genre:</span>
        <input type="text" v-model="song.genre" placeholder="Genre" />
      </p>
      <p>
        <span>URL to cover image:</span>
        <input type="text" v-model="song.cover_image_url" placeholder="URL of image cover" />
      </p>
      <p>
        <span>Year:</span>
        <input type="text" v-model="song.year" placeholder="Year" />
      </p>
      <button @click="editSong()">Submit changes</button>
    </form>
  </div>
  <p></p>
  <div>
    <button @click="redirectSongsIndex()">Back to all songs</button>
    <button @click="redirectSongsShow()">Back to song</button>
    <button @click="deleteSong()">Delete</button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";

export default {
  data: function () {
    return {
      song: {},
    };
  },
  methods: {
    redirectSongsIndex: function () {
      console.log("Redirecting to /songs");
      this.$router.push("/songs");
    },
    redirectSongsShow: function () {
      console.log("Redirecting to /songs/" + this.$route.params.id);
      this.$router.push("/songs/" + this.$route.params.id);
    },
    showSong: function () {
      axios.get("http://localhost:3000/songs/" + this.$route.params.id + ".json").then((response) => {
        console.log(response.data);
        this.song = response.data;
      });
    },
    editSong: function () {
      axios.patch("http://localhost:3000/songs/" + this.$route.params.id + ".json", this.song).then((response) => {
        console.log("successfully updated song", response.data);
        this.song = response.data;
        // display a "success" message, then redirect
      });
      this.redirectsongsShow();
    },
    deleteSong: function () {
      axios.delete("http://localhost:3000/songs/" + this.$route.params.id + ".json").then((response) => {
        console.log("successfully deleted song", response.data);
        this.song = response.data;
        // display a "success" message, then redirect
      });
      this.redirectSongsIndex();
    },
  },
  created: function () {
    this.showSong();
  },
};
</script>
