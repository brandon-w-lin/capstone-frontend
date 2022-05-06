// function onYouTubeIframeAPIReady() {
//   // e is the div in your page html that this script targets
//   var e = document.getElementById("youtube-audio"),
//     // t is the image tag that users interact with, injected into the e div
//     t = document.createElement("img");
//   // sets the image tag ID as youtube-icon, styles
//   t.setAttribute("id", "youtube-icon"), (t.style.cssText = "cursor:pointer;cursor:hand"), e.appendChild(t);

//   // creates an element for which the youtube iframe will inject
//   var a = document.createElement("div");
//   a.setAttribute("id", "youtube-player"), e.appendChild(a);

//   // Image for the play/pause button
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

//   // Calling to the youtube iframe
//   var r = new YT.Player("youtube-player", {
//     height: "0",
//     width: "0",
//     videoId: e.dataset.video,
//     playerVars: { autoplay: e.dataset.autoplay, loop: e.dataset.loop },
//     events: {
//       onReady: function (e) {
//         r.setPlaybackQuality("small"), o(r.getPlayerState() !== YT.PlayerState.CUED);
//       },
//       onStateChange: function (e) {
//         e.data === YT.PlayerState.ENDED && o(!1);
//       },
//     },
//   });
// }
