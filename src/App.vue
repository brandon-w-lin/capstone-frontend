<template>
  <NavBar />
  <div class="container">
    <router-view />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

body {
  background-color: #284b63;
}

.cover-image {
  /* object-fit: cover; */
  margin: auto;
}
</style>
