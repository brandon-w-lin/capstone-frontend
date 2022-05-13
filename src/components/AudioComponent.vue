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
          <input type="range" min="0" max="100" :value="currentTime" class="slider" id="myRange" />
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
      currentTime: 0,
      progressBar: 0,
    };
  },
  methods: {
    startProgressBar() {
      console.log("hello from startProgressBar");
      this.progressBar = setInterval(this.trackTime, 1000);
    },
    stopProgressBar() {
      console.log("hello from stopProgressBar");
      clearInterval(this.progressBar);
    },
    trackTime() {
      this.currentTime = this.YTplayer.getCurrentTime();
      console.log(this.currentTime);
    },
    changeSong(song) {
      console.log("changing song to " + song);
      this.YTplayer.loadVideoById(song);
    },
    onYouTubeIframeAPIReady(song) {
      console.log("called onYouTubeIframeAPIReady for" + song);
      this.YTplayer = new YT.Player("youtube-player", {
        height: "0",
        width: "0",
        // videoId: e.dataset.video,
        videoId: song,
        // playerVars: { autoplay: e.dataset.autoplay, loop: e.dataset.loop },
        events: {
          onReady: function () {
            console.log("hello from clickSong onReady event");
            this.YTplayer.setPlaybackQuality("small");
          },
          onStateChange: function (e) {
            e.data === YT.PlayerState.ENDED;
          },
        },
      });
    },
    playPause() {
      this.playing = !this.playing;
      this.playPauseGraphic = this.playing ? "IDzX9gL.png" : "quyUPXN.png";
      this.YTplayer.getPlayerState() === YT.PlayerState.PLAYING ||
      this.YTplayer.getPlayerState() === YT.PlayerState.BUFFERING
        ? this.YTplayer.pauseVideo()
        : this.YTplayer.playVideo();
      this.YTplayer.getPlayerState() === 1 ? this.stopProgressBar() : this.startProgressBar();
      // console.log("player state is: " + this.YTplayer.getPlayerState());
      // this.progressBar(this.YTplayer.getPlayerState());
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
