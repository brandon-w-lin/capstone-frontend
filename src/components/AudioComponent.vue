<template>
  <div class="container">
    <div class="row p-2">
      <div class="col-auto">
        <div class="card m-1">
          <div id="newplayer">
            <img
              :src="'http://i.imgur.com/' + playPauseGraphic"
              @click="playPause()"
              id="playPauseButton"
              alt="Play/Pause Button"
            />
            <div id="youtube-player"></div>
          </div>
        </div>
      </div>
      <div class="col card m-1">
        Stuff about the song playing
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
      <button @click="changeSong('yB-c85V8Zsg')">change song</button>
      <button @click="onYouTubeIframeAPIReady('wtHra9tFISY')">Make the player</button>
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
  data: function () {
    return {
      song: {},
      YTExtension: "wtHra9tFISY",
      playPauseGraphic: "quyUPXN.png",
      playing: false,
      YTplayer: {},
      currentSong: {
        YTExtension: "",
        title: "test",
        length: 100,
      },
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
      console.log("called onYouTubeIframeAPIReady for" + song);
      this.YTplayer = new YT.Player("youtube-player", {
        height: "300",
        width: "400",
        // videoId: e.dataset.video,
        videoId: song,
        playerVars: { autoplay: 1 },
        events: {
          onReady: function () {
            console.log("hello from clickSong onReady event");
            this.YTplayer.setPlaybackQuality("small");
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
      console.log(this.YTplayer.getPlayerState());
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

    stopProgressBar() {
      console.log("hello from stopProgressBar");
      clearInterval(this.progressBar);
    },

    // Needs to get element value rather than tracking the currentTime variable. Using currentTime will move the time position to itself
    scrollTo() {
      this.YTplayer.seekTo(document.getElementById("progressBar").value, true);
    },

    changeSong(song) {
      console.log("changing song to " + song);
      this.YTplayer.loadVideoById(song);
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
      this.playPauseGraphic = this.YTplayer.getPlayerState() === 1 ? "IDzX9gL.png" : "quyUPXN.png";
    },
  },
  created: function () {
    // this.showSong();
  },
  mounted: function () {
    // this.onYouTubeIframeAPIReady();
  },
};
</script>

<style>
#playPauseButton {
  cursor: pointer;
  cursor: hand;
}
</style>
