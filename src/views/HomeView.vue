<template>
  <div class="container">
    <div class="card p-2" style="">
      <div style="margin-left: 20%; margin-right: 20%">
        <h1>Welcome to WhileYouRead</h1>
        <div style="text-align: left">
          <p>
            This website is a resource that pairs you with music to listen to while you read a book. Get deeper into
            your book by:
          </p>
          <ul>
            <li>Finding the book you are reading using the search bar</li>
            <li>Browse books and find songs that pair well with your selection</li>
            <li>Use our built in music player to listen while you read</li>
          </ul>
        </div>
        <div>
          <form class="d-flex">
            <input
              type="search"
              @keyup.enter="search"
              v-model="searchQuery"
              class="form-control me-2"
              placeholder="Search books"
              aria-label="Search"
            />
            <!-- The second input box is needed (but hidden) to v-model the searchQuery...for some reason whenever there is only one input box, the searchQuery variable will not remain populated when calling the search() method and pushing to the route. -->
            <input v-show="false" v-model="searchQuery" />

            <router-link class="btn btn-outline-success" :to="{ path: '/books/search', query: { q: searchQuery } }">
              Search
            </router-link>
          </form>
        </div>
        <div class="m-2">
          <button @click="redirectBooksIndex()" class="btn btn-primary">View all books</button>
        </div>
      </div>
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
