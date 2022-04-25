<template>
  <div class="card m-1">
    <h1>All songs</h1>
    <div class="card-body">
      <a href="/songs/submit" class="btn btn-primary">Submit a new song</a>
    </div>
  </div>

  <!-- cards not in use -->
  <!-- <div class="row">
      <div class="col-sm-4 mb-2" v-for="song in songs" :key="song.id">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ song.title }}</h5>
            <p class="card-text">Brief blurb about the song</p>
            <a :href="'/songs/' + song.id" class="btn btn-primary">More Info</a>
          </div>
        </div>
      </div>
    </div> -->
  <!-- <div class="card mb-3" style="max-width: 540px" v-for="song in songs" :key="song.id"> -->

  <!-- cards in use -->
  <div class="row">
    <div class="card m-3" style="max-width: 540px" v-for="song in songs" :key="song.id">
      <div class="row g-0">
        <div class="col-md-4 p-1 cover-image">
          <!-- <img :src="song.cover_image_url" class="img-fluid rounded-start" alt="..." /> -->
          <!-- Need to add cover to back end -->
          <!-- <img :src="song" class="img-fluid img-thumbnail rounded-start" alt="..." /> -->
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ song.title }}</h5>
            <p class="card-text">
              <!-- {{ song.summary.substring(0, charLimit) + (song.summary.length > charLimit ? "..." : "") }} -->
              Listen at:
              <br />
              <a :href="song.url">{{ song.url }}</a>
            </p>
            <a :href="'/songs/' + song.id" class="btn btn-primary">More Info</a>

            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      songs: [],
      charLimit: 200,
    };
  },
  methods: {
    getsongs: function () {
      axios.get("http://localhost:3000/songs.json").then((response) => {
        console.log(response.data);
        this.songs = response.data;
      });
    },
  },
  created: function () {
    this.getsongs();
  },
};
</script>
