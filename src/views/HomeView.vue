<template>
  <div id="header">
    <div class="container">
      <div class="py-3">
        <h1 class="pt-3">Welcome to WhileYouRead</h1>
        <h4>A platform to pair your book with the perfect song.</h4>
      </div>
      <div>
        <div class="mb-4">
          <router-link to="/books" class="button-outline">Browse books with songs</router-link>
        </div>
        <div class="my-2">or search through the Google Book catalogue below:</div>
        <div>
          <form class="d-flex">
            <input
              class="form-main"
              type="search"
              @keyup.enter="search"
              v-model="searchQuery"
              placeholder="Search books"
              aria-label="Search"
            />
            <!-- The second input box is needed (but hidden) to v-model the searchQuery...for some reason whenever there is only one input box, the searchQuery variable will not remain populated when calling the search() method and pushing to the route. -->
            <input v-show="false" v-model="searchQuery" />

            <router-link class="button-outline" :to="{ path: '/books/search', query: { q: searchQuery } }">
              Search
            </router-link>
          </form>
        </div>
      </div>
      <!-- <div class="m-1">
        <input type="checkbox" id="chkBox-SearchBooksWithSongs" />
        <label for="chkBox-SearchBooksWithSongs">Include books that do not yet have songs</label>
      </div> -->
    </div>
  </div>
  <div class="divider1"></div>
  <div id="how-does-it-work">
    <div class="container">
      <h2>See how it works:</h2>
      <iframe
        id="intro-video"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/Zu5S2ZPF4-I"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </div>
  <div class="divider2"></div>
  <div class="absolute-bottom">
    <div class="container">
      <h2>Reach me at:</h2>
      <div class="my-1">
        <img src="@/assets/iconmonstr-linkedin-5.svg" alt="linkedin" style="height: 30px; width: auto" class="m-2" />

        <a href="https://www.linkedin.com/in/brandon-w-lin/" class="href">https://www.linkedin.com/in/brandon-w-lin/</a>
      </div>
      <div class="my-1">
        <img src="@/assets/Octicons-mark-github.svg" alt="github" style="height: 30px; width: auto" class="m-2" />
        <a href="https://github.com/brandon-w-lin" class="href">https://github.com/brandon-w-lin</a>
      </div>
      <h2>Contact Me:</h2>
      <!-- modify this form HTML and place wherever you want your form -->
      <form action="https://formspree.io/f/xnqwydyk" method="POST">
        <div class="my-1">
          <label for="name">Name:</label>
          <input type="name" name="name" class="form-main" />
        </div>
        <div class="my-1">
          <label for="email">Email:</label>
          <input type="email" name="email" class="form-main" />
        </div>
        <div class="my-1">
          <label for="message">Message:</label>
          <textarea name="message" class="form-main"></textarea>
        </div>

        <!--         
        <div class="row my-1">
          <div class="col-1">Name:</div>
          <div class="col">
            <input type="name" name="name" class="form-main" />
          </div>
        </div>
        <div class="row my-1">
          <div class="col-1">Email:</div>
          <div class="col">
            <input type="email" name="email" class="form-main" />
          </div>
        </div>
        <div class="row my-1">
          <div class="col-1">Message:</div>
          <div class="col">
            <textarea name="message" class="form-main"></textarea>
          </div>
        </div> -->
        <!-- your other form fields go here -->
        <div>
          <button type="submit" class="button-outline my-2">Send</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  data: function () {
    return { searchQuery: "" };
  },
  methods: {
    redirectBooksIndex: function () {
      console.log("Redirecting to /books");
      this.$router.push("/books");
    },
    search() {
      console.log("hello from search. Passing: ", this.searchQuery);
      // console.log("testing query: ", "books/search" + this.searchQuery);
      this.$router.push({ path: "/books/search", query: { q: this.searchQuery } });
      this.searchQuery = "";
    },
  },
};
</script>

<style>
.divider1 {
  background-image: url(@/assets/layered-waves-haikei-dark-to-green.svg);
  background-size: 100% 100%;
  height: 200px;
}

.divider2 {
  background-image: url(@/assets/layered-waves-haikei-green-to-dark.svg);
  background-size: 100% 100%;
  height: 200px;
}

#how-does-it-work {
  background-color: var(--color1-2);
  height: 350px;
}

label {
  display: inline-block;
  width: 100px;
  vertical-align: top;
}

@media (max-width: 768px) {
  #intro-video {
    width: 90%;
    /* height: auto; */
  }
}

.href {
  color: white;
}

.href:hover {
  color: var(--color1-5);
}
</style>
