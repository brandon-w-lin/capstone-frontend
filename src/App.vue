<template>
  <NavBar class="fixed-top" />

  <!-- ref is required for telling this.$refs which component holds the method that needs to be called whenever the other views emit the change-song event 
    current-song is passing prop down to set the title of the song in the player -->
  <div class="container" style="margin-top: 75px; margin-bottom: 150px">
    <!-- @change-song is listening for whenever the changeSong event is emitted from the children in the router, and on that event calls the passChangeSong method here in the parent -->
    <router-view @change-song="passChangeSong" :current-song="currentSong" />
  </div>
  <AudioComponent class="fixed-bottom" ref="audioComponent" :current-song="currentSong" />
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import AudioComponent from "@/components/AudioComponent.vue";

export default {
  components: {
    NavBar,
    AudioComponent,
  },
  methods: {
    // This method is called when one of the other views emits the changeSong event. The argument is listening for the payload emitted, so even though the @change-song="passChangeSong" does not contain an argument, it is required here.

    passChangeSong(song) {
      console.log("A song was selected and passed to the /App page. Passing along to the AudioComponent: ", song);
      // sets currentSong -> used as prop -> render song title in the AudioComponent
      this.currentSong = song;
      this.$refs.audioComponent.selectedSongController(song);
    },
  },
  data() {
    return {
      // sets title in AudioComponent
      currentSong: {},
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  height: 100%;
}

.sticky-bottom {
  position: sticky;
  bottom: 0;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

body {
  background-color: #284b63;
}

.cover-image {
  /* object-fit: cover; */
  margin: auto;
}

.playing {
  background-color: orange;
}
</style>
