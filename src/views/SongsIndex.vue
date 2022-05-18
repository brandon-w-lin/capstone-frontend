<template>
  <div class="card m-1">
    <h1>All songs</h1>
    <div class="card-body">
      <router-link to="/songs/submit" class="btn btn-primary">Submit a new song</router-link>
    </div>
  </div>

  <div class="row">
    <div class="col-6 p-3" v-for="song in songs" :key="song.id">
      <div class="card">
        <div class="row">
          <!-- <div class="col-sm-4 p-1 cover-image">
            <img
              :src="
                song.imageLinks
                  ? song.imageLinks.thumbnail || Object.values(song.imageLinks).pop()
                  : 'https://www.seekpng.com/png/full/96-965662_confused-travolta-pulp-fiction-side-john-travolta-confused.png'
              "
              class="img-fluid img-thumbnail rounded-start"
              alt=""
            />
          </div> -->
          <div class="col-sm-8">
            <div class="card-body text-left">
              <h5 class="card-title">{{ song.title }}</h5>

              <button @click="$emit('changeSong', song)" class="btn btn-primary">Play this song</button>

              <!-- <router-link :to="/songs/ + song.id" class="btn btn-primary">More Info</router-link> -->
              <!-- <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  emits: ["changeSong"],
  data: function () {
    return {
      songs: [],
      charLimit: 200,
    };
  },
  methods: {
    getSongs: function () {
      axios.get("http://localhost:3000/songs.json").then((response) => {
        console.log(response.data);
        this.songs = response.data;
      });
    },
  },
  created: function () {
    this.getSongs();
  },
};
</script>
