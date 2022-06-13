<template>
  <div id="player">
    <div class="container">
      <div class="row">
        <!-- Navigation buttons -->
        <div class="col-auto my-1 p-1 d-flex align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 16 16" class="clickable">
            <path
              d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.54-.313 1.232.066 1.232.696v7.384c0 .63-.692 1.01-1.232.697L5 8.753V12a.5.5 0 0 1-1 0V4z"
            />
          </svg>
          <!-- <img
            src="@/assets/skip-start-circle.svg"
            id="skip-start-button"
            alt="skip start button"
            style="height: 40px"
          /> -->
        </div>
        <div class="col-auto my-1 p-1 d-flex align-items-center">
          <!-- <div v-if="this.YTplayer.getPlayerState() === 1">testing</div>
          <div v-else>else hit</div> -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 16 16"
            class="clickable"
            @click="playPause()"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path :d="playPauseGraphic" />
          </svg>

          <!-- <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 16 16" class="clickable">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path
              d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"
            />
          </svg> -->
          <!-- <img
            :src="playPauseGraphic"
            @click="playPause()"
            id="playPauseButton"
            alt="Play/Pause Button"
            style="height: 50px"
          /> -->
        </div>
        <div class="col-auto my-1 p-1 d-flex align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 16 16" class="clickable">
            <path
              d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.693 3.3 4 3.678 4 4.308v7.384c0 .63.692 1.01 1.233.697L11.5 8.753V12a.5.5 0 0 0 1 0V4z"
            />
          </svg>
          <!-- <img src="@/assets/skip-end-circle.svg" id="skip-end-button" alt="skip end button" style="height: 40px" /> -->
          <div id="youtube-player"></div>
        </div>

        <!-- About and scroll -->
        <div class="col m-1">
          <i v-if="currentSong.title" v-html="currentSong.title"></i>
          <i v-else>No song selected</i>
          <div class="slidecontainer">
            <span>{{ this.formattedCurrentTime }}</span>
            <input
              type="range"
              min="0"
              :max="this.duration"
              :value="currentTime"
              class="slider"
              id="progressBar"
              @change="scrollTo()"
            />
            <span>{{ formatTime(this.duration) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global YT */
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
// import axios from "axios";
// import YT from "https://www.youtube.com/iframe_api";

export default {
  name: "AudioComponent",
  props: {
    currentSong: Object,
  },
  data: function () {
    return {
      song: {},
      YT_extension: "wtHra9tFISY",
      playPauseGraphic:
        "M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z",
      playing: false,
      YTplayer: {},
      playerIsReady: false,
      duration: 0,
      currentTime: 0,
      formattedCurrentTime: 0,
      formattedDuration: 0,
      progressBar: 0,
      path_play:
        "M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z",
      path_pause:
        "M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z",
    };
  },
  methods: {
    // Creates the youtube player from which the music will come
    onYouTubeIframeAPIReady(song) {
      console.log("called onYouTubeIframeAPIReady");
      this.YTplayer = new YT.Player("youtube-player", {
        height: "0",
        width: "0",
        // videoId: e.dataset.video,
        videoId: song.YT_extension,
        playerVars: { autoplay: 1 },
        events: {
          onReady: () => {
            this.YTplayer.setPlaybackQuality("small");
            this.playerIsReady = true;
            console.log("Music player is now ready: ", this.playerIsReady);
          },
          onStateChange: this.musicController,
          // onStateChange: function (e) {
          //   e.data === YT.PlayerState.ENDED;
          // },
          // onStateChange: function () {
          // },
        },
      });
    },
    // Routes actions in the music player whenever the YT player state changes
    musicController() {
      // console.log(this.YTplayer.getPlayerState());
      this.duration = this.YTplayer.getDuration();
      this.formattedDuration = this.formatTime(this.duration);
      this.playPauseGraphicChange();
      this.YTplayer.getPlayerState() !== 1 ? this.stopProgressBar() : this.startProgressBar();
    },

    // Creates and destroys the 1s interval that updates the scroll bar
    startProgressBar() {
      console.log("hello from startProgressBar");
      this.progressBar = setInterval(this.trackTime, 1000);
    },
    stopProgressBar() {
      console.log("hello from stopProgressBar");
      clearInterval(this.progressBar);
    },
    formatTime(input_seconds) {
      // Formatting for render on screen
      var dateObj = new Date(Math.floor(input_seconds * 1000));
      var hours = dateObj.getUTCHours();
      var minutes = dateObj.getUTCMinutes();
      var seconds = dateObj.getSeconds();

      var o1 = input_seconds > 3600 ? hours.toString().padStart(2, "0") + ":" : "";
      var o2 = minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
      return o1 + o2;
    },
    trackTime() {
      this.currentTime = this.YTplayer.getCurrentTime();
      this.formattedCurrentTime = this.formatTime(this.currentTime);
      // document.getElementById("progressBar").value = this.currentTime;
      console.log(this.currentTime);
    },
    // Needs to get element value rather than tracking the currentTime variable. Using currentTime will move the time position to itself
    scrollTo() {
      this.YTplayer.seekTo(document.getElementById("progressBar").value, true);
    },
    selectedSongController(song) {
      // check if the player is already created
      console.log("Selected song received in AudioComponent: ", song);
      if (this.playerIsReady) {
        console.log("Player is already created, so passing the song to changeSong method");
        this.changeSong(song);
      } else {
        console.log("Music player is not yet created, so calling the onYoutubeIframeReady method");
        this.onYouTubeIframeAPIReady(song);
      }
    },
    changeSong(song) {
      console.log("changing song to " + song);
      this.YTplayer.loadVideoById(song.YT_extension);
    },

    playPause() {
      // this.playing = !this.playing;
      this.YTplayer.getPlayerState() === YT.PlayerState.PLAYING ||
      this.YTplayer.getPlayerState() === YT.PlayerState.BUFFERING
        ? this.YTplayer.pauseVideo()
        : this.YTplayer.playVideo();
      // console.log("player state is: " + this.YTplayer.getPlayerState());
      // this.progressBar(this.YTplayer.getPlayerState());
    },
    playPauseGraphicChange() {
      this.playPauseGraphic = this.YTplayer.getPlayerState() === 1 ? this.path_pause : this.path_play;
    },
  },
};
</script>

<style>
#player {
  background-color: var(--neutral-2);
}

.clickable {
  cursor: pointer;
  cursor: hand;
  fill: var(--font-high);
}
.clickable:hover {
  fill: var(--color1-5);
}

/* *********************** */
/* Range slider formatting */
/* *********************** */

/* Styles needed to override basic appearance for range slider */

input[type="range"] {
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%; /* Specific width is required for Firefox. */
  background: transparent; /* Otherwise white in Chrome */
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
}

input[type="range"]:focus {
  outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
}

input[type="range"]::-ms-track {
  width: 100%;
  cursor: pointer;

  /* Hides the slider so custom styles can be added */
  background: transparent;
  border-color: transparent;
  color: transparent;
}

/*Chrome*/
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  input[type="range"] {
    overflow: hidden;
    width: 80%;
    -webkit-appearance: none;
    background-color: var(--neutral-3);
    border-radius: 5px;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    height: 10px;
    -webkit-appearance: none;
    color: var(--neutral-3);
    margin-top: 0px; /* margin-top = (track height in pixels / 2) - (thumb height in pixels /2) */
  }

  input[type="range"]::-webkit-slider-thumb {
    width: 10px;
    -webkit-appearance: none;
    height: 10px;
    border-radius: 50%;
    cursor: ew-resize;
    background: var(--color1-5);
    box-shadow: calc(-80vw - 5px) 0 0 80vw var(--color1-5);
  }
}
</style>
