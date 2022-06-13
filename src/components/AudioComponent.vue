<template>
  <div style="background: grey">
    <div class="container">
      <div class="row">
        <!-- Navigation buttons -->
        <div class="col-auto my-1 p-1 d-flex align-items-center">
          <img
            src="@/assets/skip-start-circle.svg"
            id="skip-start-button"
            alt="skip start button"
            style="height: 40px"
          />
        </div>
        <div class="col-auto my-1 p-1 d-flex align-items-center">
          <img
            :src="playPauseGraphic"
            @click="playPause()"
            id="playPauseButton"
            alt="Play/Pause Button"
            style="height: 50px"
          />
        </div>
        <div class="col-auto my-1 p-1 d-flex align-items-center">
          <img src="@/assets/skip-end-circle.svg" id="skip-end-button" alt="skip end button" style="height: 40px" />
          <div id="youtube-player"></div>
        </div>

        <!-- About and scroll -->
        <div class="col m-1">
          <i v-if="currentSong.title">{{ currentSong.title }}</i>
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
      playPauseGraphic: require("../assets/play-circle.svg"),
      playing: false,
      YTplayer: {},
      playerIsReady: false,
      duration: 0,
      currentTime: 0,
      formattedCurrentTime: 0,
      formattedDuration: 0,
      progressBar: 0,
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
      this.playPauseGraphic =
        this.YTplayer.getPlayerState() === 1
          ? require("../assets/pause-circle.svg")
          : require("../assets/play-circle.svg");
    },
  },
};
</script>

<style>
#playPauseButton {
  cursor: pointer;
  cursor: hand;
}
</style>
