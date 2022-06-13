<template>
  <div id="header">
    <div class="container">
      <div class="py-3">
        <h1 class="pt-3">Welcome to WhileYouRead</h1>
        <h4>A platform to pair your book with the perfect song.</h4>
      </div>
      <div class="">
        <form class="d-flex">
          <input
            id="homepage-search-form"
            type="search"
            @keyup.enter="search"
            v-model="searchQuery"
            placeholder="Search books"
            aria-label="Search"
          />
          <!-- The second input box is needed (but hidden) to v-model the searchQuery...for some reason whenever there is only one input box, the searchQuery variable will not remain populated when calling the search() method and pushing to the route. -->
          <input v-show="false" v-model="searchQuery" />

          <router-link id="homepage-search-button" :to="{ path: '/books/search', query: { q: searchQuery } }">
            Search
          </router-link>
        </form>
      </div>
      <div class="m-1">
        <input type="checkbox" id="chkBox-SearchBooksWithSongs" />
        <label for="chkBox-SearchBooksWithSongs">Include books that do not yet have songs</label>
      </div>
    </div>
  </div>
  <div class="divider1"></div>
  <div id="body">
    <div class="container">place a carousel here</div>
  </div>
  <div id="footer" class="absolute-bottom">
    <div class="container">About | Contact me</div>
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
  background-image: url(@/assets/layered-waves-haikei.svg);
  background-size: 100% 100%;
  height: 300px;
}

#header {
  color: var(--font-high);
}

#body {
  background-color: var(--color1-2);
  color: var(--font-highest);
  height: 50vh;
}

#footer {
  background-color: var(--color1-2);
  color: var(--font-highest);
  height: 20vh;
}

#homepage-search-form {
  background-color: var(--font-med);
  width: 50%;
  padding: 5px;
}
#homepage-search-form::placeholder {
  color: var(--font-high);
}

#homepage-search-form:focus {
  background-color: var(--font-high);
  color: var(--color2-1);
  border: none;
}

#homepage-search-button {
  background-color: transparent;
  color: var(--color1-5);
  border: solid;
  border-color: var(--color1-4);
  border-radius: 5px;
  text-decoration: none;
  margin: 0px 2px;
  padding: 5px 25px;
}

#homepage-search-button:hover {
  border-color: var(--font-high);
  color: var(--font-high);
}
</style>
