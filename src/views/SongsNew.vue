<template>
  <div class="card m-1">
    <div class="card-body">
      <h1>Submit a new song</h1>
    </div>
  </div>
  <div class="card m-1">
    <div class="card-body">
      <form>
        <p>
          <span>ISBN:</span>
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
      </form>
      <button @click="createSong()" class="btn btn-primary">Submit</button>
    </div>
  </div>
  <div class="card m-1">
    <div class="card-body">
      <a href="./" class="btn btn-primary">Back to all songs</a>
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
      song: {},
    };
  },
  methods: {
    createSong: function () {
      axios.post("http://localhost:3000/songs.json", this.song).then((response) => {
        console.log("successfully submitted song", response.data);
        this.song = response.data;
        // display a "success" message, then redirect
      });
    },
  },
};
</script>
