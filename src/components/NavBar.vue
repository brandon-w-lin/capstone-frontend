<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
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
            <!-- <a class="nav-link active" aria-current="page" href="/">Home</a> -->
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <!-- <a class="nav-link" href="/books">All Books</a> -->
            <router-link to="/books" class="nav-link">All Books</router-link>
          </li>
          <li class="nav-item">
            <!-- <a class="nav-link" href="/songs">All Songs</a> -->
            <router-link to="/songs" class="nav-link">All Songs</router-link>
          </li>
        </ul>
        <form class="d-flex">
          <input
            v-model="searchQuery"
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <router-link class="btn btn-outline-success" :to="{ path: '/books/search', query: { q: searchQuery } }">
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
    };
  },
  methods: {
    search: function (query) {
      console.log("testing query: ", "books/search" + query);
      this.$router.push({ path: "/books/search", query: { q: query } });
    },
  },
};
</script>
