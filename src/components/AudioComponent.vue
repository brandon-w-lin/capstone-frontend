<template>
  <div class="container">
    <div class="row p-2">
      <div class="col-auto">
        <div class="card m-1">
          <!-- <div data-video="not used" data-autoplay="0" data-loop="1" id="player"></div> -->
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
      <div class="col card m-1">Stuff about the song playing</div>
      <!-- <button id="chg-btn">change song (old code)</button> -->
      <button @click="changeSong('yB-c85V8Zsg')">change song</button>
      <button @click="onYouTubeIframeAPIReady('wtHra9tFISY')">Make the player</button>
      <!-- <button @click="old_onYouTubeIframeAPIReady()">Make the player (old)</button> -->
      <button @click="getYTData()">Get youtube data</button>
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
    };
  },
  methods: {
    // parseYTExtension: function (ytlink) {
    //   console.log("song passed through was: ", ytlink);
    //   let part = "";
    //   if (ytlink.search("&") == -1) {
    //     console.log("there is no ampersand");
    //     part = ytlink.substring(ytlink.lastIndexOf("?v") + 3, ytlink.length);
    //   } else {
    //     console.log("there is an ampersand");
    //     part = ytlink.substring(ytlink.lastIndexOf("?v") + 3, ytlink.lastIndexOf("&"));
    //   }
    //   console.log("returning: ", part);
    //   return part;
    // },
    changeSong(song) {
      this.song = song;
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
    },
    // old_onYouTubeIframeAPIReady() {
    //   var e = document.getElementById("player"),
    //     // t is the image tag that users interact with, injected into the e div
    //     t = document.createElement("img");
    //   // sets the image tag ID as youtube-icon, styles
    //   t.setAttribute("id", "youtube-icon"), (t.style.cssText = "cursor:pointer;cursor:hand"), e.appendChild(t);

    //   // creates an element for which the youtube iframe will inject
    //   var a = document.createElement("div");
    //   a.setAttribute("id", "youtube-player"), e.appendChild(a);

    //   // Image for the play/pause button
    //   // make a function to flip flop the play and pause, on click
    //   var o = function (e) {
    //     var a = e ? "IDzX9gL.png" : "quyUPXN.png";
    //     t.setAttribute("src", "https://i.imgur.com/" + a);
    //   };

    //   // Handling the play/pause click
    //   e.onclick = function () {
    //     // If state is playing or buffering, pause, else play; also flip the state of the play/pause image
    //     r.getPlayerState() === YT.PlayerState.PLAYING || r.getPlayerState() === YT.PlayerState.BUFFERING
    //       ? (r.pauseVideo(), o(!1))
    //       : (r.playVideo(), o(!0));
    //   };

    //   document.getElementById("chg-btn").onclick = function () {
    //     console.log("hello from change button click");
    //     r.loadVideoById("yB-c85V8Zsg");
    //   };

    //   var r = new YT.Player("youtube-player", {
    //     height: "200",
    //     width: "200",
    //     // videoId: e.dataset.video,
    //     videoId: "wtHra9tFISY",
    //     playerVars: { autoplay: e.dataset.autoplay, loop: e.dataset.loop },
    //     events: {
    //       onReady: function () {
    //         r.setPlaybackQuality("small"), o(r.getPlayerState() !== YT.PlayerState.CUED);
    //       },
    //       onStateChange: function (e) {
    //         e.data === YT.PlayerState.ENDED && o(!1);
    //       },
    //     },
    //   });
    // },

    // redirectSongsIndex: function () {
    //   console.log("Redirecting to /songs");
    //   this.$router.push("/songs");
    // },
    // redirectSongsEdit: function () {
    //   console.log("Redirecting to /songs/" + this.$route.params.id + "/edit");
    //   this.$router.push("/songs/" + this.$route.params.id + "/edit");
    // },
    // showSong: function () {
    //   axios.get("http://localhost:3000/songs/" + this.$route.params.id + ".json").then((response) => {
    //     console.log(response.data);
    //     this.song = response.data;
    //     this.onYouTubeIframeAPIReady();
    //   });
    // },
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
