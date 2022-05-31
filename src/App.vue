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
}

/* color scheme */
:root.opt1 {
  --color1: #293241;
  --color2: #3d5a80;
  --color3: #98c1d9;
  --color4: #e0fbfc;
  --color5: #ee6c4d;
  --bg-page: #0f0f10;
  --bg-card: #303041;
  --shadow: #000000;
  --accent: #0ea2f6;
  --font-high: #e0fbfce0;
  --font-med: #e0fbfca2;
  --font-low: #e0fbfc51;
  --success: #0ea2f6;
}

:root.dark {
  --color1: #0f0f10;
  --color2: #303041;
  --color3: #3d3a50;
  --color4: #f4fcfe;
  --color5: #0ea2f6;
  --font-high: #f4fcfee0;
  --font-med: #f4fcfea2;
  --font-low: #f4fcfe51;
}

.brandon-button {
  background-color: transparent;
  color: var(--accent);
  border: solid;
  border-color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  width: 200px;
  border-radius: 5px;
}

.brandon-button:hover {
  background-color: var(--accent);
  color: var(--font-high);
}

body {
  background-color: var(--bg-page);
}

nav {
  padding: 30px;
  color: var(--font-high);
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
  box-shadow: 0px 0px 4px 1px var(--shadow);
}

.cover-image {
  /* object-fit: cover; */
  margin: auto;
}

.playing {
  background-color: var(--accent);
}

.playing-icon {
  animation: pulse 1.5s infinite;
  transform: scale(1);
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
}

.book:hover {
  box-shadow: 0px 0px 12px 2px var(--accent);
  color: var(--accent);
}

.book img {
  transition: transform 0.2s;
  filter: saturate(0.87);
}

.book:hover img {
  transform: scale(1.1);
}
</style>
