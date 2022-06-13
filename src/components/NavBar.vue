<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <router-link to="/" class="navbar-brand">WhileYouRead</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/books" class="nav-link">All Books</router-link>
          </li>
          <!-- <li class="nav-item">
            <router-link to="/songs" class="nav-link">All Songs</router-link>
          </li> -->
        </ul>
        <!-- <button @click="changeTheme()">Change Theme</button> -->
        <form class="d-flex">
          <!-- <input
            type="search"
            @keyup.enter="search(searchQuery)"
            v-model="searchQuery"
            class="form-control me-2"
            placeholder="Search books"
            aria-label="Search"
          /> -->
          <input
            type="search"
            @keyup.enter="search(searchQuery)"
            v-model="searchQuery"
            class="form-main"
            placeholder="Search books"
            aria-label="Search"
          />
          <!-- The second input box is needed (but hidden) to v-model the searchQuery...for some reason whenever there is only one input box, the searchQuery variable will not remain populated when calling the search() method and pushing to the route. -->
          <input v-show="false" v-model="searchQuery" />

          <!-- <router-link class="btn btn-outline-success" :to="{ path: '/books/search', query: { q: searchQuery } }"> -->
          <router-link class="button-outline" :to="{ path: '/books/search', query: { q: searchQuery } }">
            Search
          </router-link>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data: function () {
    return {
      searchQuery: "",
      // theme: "dark",
      // themes: ["opt1", "opt2", "opt3", "dark"],
    };
  },
  methods: {
    search(searchQuery) {
      console.log("hello from search. Passing: ", searchQuery);
      // console.log("testing query: ", "books/search" + this.searchQuery);
      this.$router.push({ path: "/books/search", query: { q: searchQuery } });
      this.searchQuery = "";
    },
    // changeTheme() {
    //   console.log(this.themes.indexOf(this.theme));
    //   var next = this.themes.indexOf(this.theme) == this.themes.length - 1 ? 0 : this.themes.indexOf(this.theme) + 1;
    //   this.theme = this.themes[next];
    //   document.documentElement.className = this.theme;
    // },
  },
};
</script>

<style>
.navbar-brand,
.nav-link {
  color: var(--font-high);
}

.navbar-brand:hover,
.navbar-brand:active,
.navbar-brand:focus,
.nav-link:hover,
.nav-link:active,
.nav-link:focus {
  color: var(--color1-5);
}
</style>
