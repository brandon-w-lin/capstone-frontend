<template>
  <div class="home">
    <h1>Welcome</h1>
    <button @click="redirectBooksIndex()">View all books</button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  data: function () {
    return {};
  },
  methods: {
    redirectBooksIndex: function () {
      console.log("Redirecting to /books");
      this.$route.push("/books");
    },
  },
};
</script>
