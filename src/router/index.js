import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

// Books
import BooksIndex from "../views/BooksIndex.vue";
import BooksShow from "../views/BooksShow.vue";
import BooksEdit from "../views/BooksEdit.vue";
import BooksNew from "../views/BooksNew.vue";
import BooksSearch from "../views/BooksSearch.vue";
// Songs
import SongsIndex from "../views/SongsIndex.vue";
import SongsShow from "../views/SongsShow.vue";
import SongsEdit from "../views/SongsEdit.vue";
import SongsNew from "../views/SongsNew.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  // Books
  {
    path: "/books",
    name: "books-index",
    component: BooksIndex,
  },
  {
    path: "/books/:id",
    name: "books-show",
    component: BooksShow,
  },
  {
    path: "/books/:id/edit",
    name: "books-edit",
    component: BooksEdit,
  },
  {
    path: "/books/submit",
    name: "books-new",
    component: BooksNew,
  },
  {
    path: "/books/search",
    name: "books-search",
    component: BooksSearch,
  },
  // Songs
  {
    path: "/songs",
    name: "songs-index",
    component: SongsIndex,
  },
  {
    path: "/songs/:id",
    name: "songs-show",
    component: SongsShow,
  },
  {
    path: "/songs/:id/edit",
    name: "songs-edit",
    component: SongsEdit,
  },
  {
    path: "/songs/submit",
    name: "songs-new",
    component: SongsNew,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
