<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="#">Tunes For Tomes</a>
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
            <a class="nav-link active" aria-current="page" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/books">All Books</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/songs">All Songs</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled">Disabled</a>
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
export default {};
</script>
