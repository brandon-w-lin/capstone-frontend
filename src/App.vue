<template>
  <NavBar class="fixed-top" />

  <!-- ref is required for telling this.$refs which component holds the method that needs to be called whenever the other views emit the change-song event 
    current-song is passing prop down to set the title of the song in the player -->
  <div style="margin-top: 60px; margin-bottom: 150px">
    <!-- @change-song is listening for whenever the changeSong event is emitted from the children in the router, and on that event calls the passChangeSong method here in the parent -->
    <router-view
      @change-song="passChangeSong"
      :current-song="currentSong"
      @change-player-state="playPause"
      :player-state="playerState"
    />
  </div>
  <AudioComponent
    class="fixed-bottom"
    ref="audioComponent"
    @change-song="updateCurrentSong"
    @change-player-state="updatePlayerState"
    :current-song="currentSong"
    :player-state="playerState"
  />
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import AudioComponent from "@/components/AudioComponent.vue";

export default {
  components: {
    NavBar,
    AudioComponent,
  },
  data() {
    return {
      currentSong: {}, // sets title in AudioComponent
      playerState: false,
    };
  },
  methods: {
    // This method is called when one of the other views emits the changeSong event. The argument is listening for the payload emitted, so even though the @change-song="passChangeSong" does not contain an argument, it is required here.
    playPause() {
      this.$refs.audioComponent.playPause();
    },
    updatePlayerState() {
      this.playerState = !this.playerState;
      console.log("from App.vue: state is playing: ", this.playerState);
    },
    updateCurrentSong(song) {
      this.currentSong = song;
    },
    passChangeSong(song, upNext) {
      console.log("A song was selected and passed to the /App page. Passing along to the AudioComponent: ", song);

      this.currentSong = song;
      this.$refs.audioComponent.selectedSongController(song, upNext);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--font-high);
}

/* color scheme */

:root {
  --neutral-1: #151515;
  --neutral-2: #252525;
  --neutral-3: #353535;
  --neutral-4: #505050;
  --color1-1: #0e3733;
  --color1-2: #125e57;
  --color1-3: #12877c;
  --color1-4: #13b1a4;
  --color1-5: #12e0cc;
  --color2-1: #001220;
  --color2-2: #112837e7;
  --bg-page: var(--neutral-1);
  --bg-card: var(--neutral-2);
  --bg-card-hover: var(--color1-3);
  --bg-form: var(--font-med);
  --bg-form-focus: var(--font-high);
  --shadow: transparent;
  --accent: var(--color1-5);
  --font-highest: #ffffff;
  --font-high: #e0fbfc;
  --font-med: #e0fbfca2;
  --font-low: #e0fbfc51;
}

.button-no-format {
  background-color: transparent;
  border: none;
  text-decoration: none;
  margin: 0px 2px;
  padding: 5px 25px;
  color: inherit;
}

.button-outline {
  background-color: transparent;
  color: var(--color1-5);
  border: solid;
  border-color: var(--color1-4);
  border-radius: 5px;
  text-decoration: none;
  margin: 0px 2px;
  padding: 5px 25px;
}

.button-outline:hover {
  border-color: var(--font-high);
  color: var(--font-high);
}

.form-main {
  background-color: var(--font-med);
  width: 50%;
  padding: 5px;
}
.form-main::placeholder {
  color: var(--font-high);
}

.form-main:focus {
  background-color: var(--font-high);
  color: var(--color2-1);
  border: none;
}
/* .wyr-form {
  background-color: var(--bg-card);
  color: var(--font-high);
  outline: none;
  border: var(--color3);
}

.wyr-form.inline {
  background-color: var(--color3);
  color: var(--font-highest);
  outline: none;
  border: var(--color4);
}

.wyr-form:focus {
  background-color: var(--color3);
}

.wyr-form.inline:focus {
  background-color: var(--color4);
}

::placeholder {
  color: var(--font-low);
  /* color: var(--font-low); 
} */

body {
  background-color: var(--bg-page);
}

nav {
  padding: 30px;
  color: var(--font-high);
  background-color: var(--bg-page);
}

nav a {
  font-weight: bold;
  color: var(--font-high);
}

nav a.router-link-exact-active {
  color: var(--accent);
}

.card {
  border: none;
  background-color: var(--bg-card);
  color: var(--font-high);
}

.cover-image {
  /* object-fit: cover; */
  margin: auto;
}

.playing {
  /* background-color: var(--color1-5); */
  color: var(--color1-5);
}

@keyframes pulse {
  0% {
    transform: scale(0.9);
    /* box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7); */
  }

  70% {
    transform: scale(1);
    /* box-shadow: 0 0 0 10px rgba(0, 0, 0, 0); */
  }

  100% {
    transform: scale(0.9);
    /* box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); */
  }
}

/* For styling book cards */
.content-container {
  width: 70%;
  margin: auto;
}

.img-container {
  width: 30%;
  object-fit: cover;
}

.book {
  flex-direction: row;
  height: 175px;
  overflow: hidden;
  text-decoration: none;
  transition: 0.5s, color 0.5s;
  /* box-shadow: 0px 0px 4px 2px var(--color1-2); */
}

.book:hover {
  /* box-shadow: 0px 0px 5px 2px var(--font-med); */
  color: var(--font-highest);
  background-color: var(--bg-card-hover);
}

.book img {
  transition: transform 0.2s;
  filter: saturate(0.87);
}

.book:hover img {
  transform: scale(1.05);
}

.song {
  background-color: var(--bg-card);
  overflow: hidden;
  text-decoration: none;
  transition: 0.5s, color 0.5s;
}

.song:hover {
  color: var(--font-highest);
  background-color: var(--bg-card-hover);
}
</style>
