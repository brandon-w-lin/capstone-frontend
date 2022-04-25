<template>
  <div class="home">songs show</div>
  <div>
    {{ song }}
  </div>
  <div>
    <button @click="redirectSongsIndex()">Back to all songs</button>
    <button @click="redirectSongsEdit()">Edit song</button>
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
    redirectSongsEdit: function () {
      console.log("Redirecting to /songs/" + this.$route.params.id + "/edit");
      this.$router.push("/songs/" + this.$route.params.id + "/edit");
    },
    showSong: function () {
      axios.get("http://localhost:3000/songs/" + this.$route.params.id + ".json").then((response) => {
        console.log(response.data);
        this.song = response.data;
      });
    },
  },
  created: function () {
    this.showSong();
  },
};
</script>
