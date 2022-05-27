<template>
  <div class="container">
    <div class="row p-2">
      <div class="card m-1">
        <div data-video="not used" data-autoplay="0" data-loop="1" id="player"></div>
      </div>
      <div class="card m-1">
        <a href="/songs" class="btn">Back to all songs</a>
        <!-- <button @click="redirectSongsIndex()">Back to all songs</button> -->
      </div>
      <!-- <div id="player"></div> -->
    </div>
  </div>

  <div>
    <button @click="redirectSongsEdit()">Edit song</button>
  </div>
</template>

<script>
/* global YT */
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";
// import YT from "https://www.youtube.com/iframe_api";

export default {
  data: function () {
    return {
      song: {},
      YTExtension: "wtHra9tFISY",
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
    onYouTubeIframeAPIReady() {
      var e = document.getElementById("player"),
        // t is the image tag that users interact with, injected into the e div
        t = document.createElement("img");
      // sets the image tag ID as youtube-icon, styles
      t.setAttribute("id", "youtube-icon"), (t.style.cssText = "cursor:pointer;cursor:hand"), e.appendChild(t);

      // creates an element for which the youtube iframe will inject
      var a = document.createElement("div");
      a.setAttribute("id", "youtube-player"), e.appendChild(a);

      // Image for the play/pause button
      var o = function (e) {
        var a = e ? "IDzX9gL.png" : "quyUPXN.png";
        t.setAttribute("src", "https://i.imgur.com/" + a);
      };

      // Handling the play/pause click
      e.onclick = function () {
        // If state is playing or buffering, pause, else play; also flip the state of the play/pause image
        r.getPlayerState() === YT.PlayerState.PLAYING || r.getPlayerState() === YT.PlayerState.BUFFERING
          ? (r.pauseVideo(), o(!1))
          : (r.playVideo(), o(!0));
      };

      var r = new YT.Player("youtube-player", {
        height: "0",
        width: "0",
        // videoId: e.dataset.video,
        videoId: this.song.YTExtension,
        playerVars: { autoplay: e.dataset.autoplay, loop: e.dataset.loop },
        events: {
          onReady: function () {
            r.setPlaybackQuality("small"), o(r.getPlayerState() !== YT.PlayerState.CUED);
          },
          onStateChange: function (e) {
            e.data === YT.PlayerState.ENDED && o(!1);
          },
        },
      });
    },

    redirectSongsIndex: function () {
      console.log("Redirecting to /songs");
      this.$router.push("/songs");
    },
    redirectSongsEdit: function () {
      console.log("Redirecting to /songs/" + this.$route.params.id + "/edit");
      this.$router.push("/songs/" + this.$route.params.id + "/edit");
    },
    showSong: function () {
      axios.get("/songs/" + this.$route.params.id + ".json").then((response) => {
        console.log(response.data);
        this.song = response.data;
        this.onYouTubeIframeAPIReady();
      });
    },
  },
  created: function () {
    this.showSong();
  },
  mounted: function () {
    // this.onYouTubeIframeAPIReady();
  },
};
</script>
