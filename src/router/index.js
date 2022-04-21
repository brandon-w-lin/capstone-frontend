import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BooksIndex from "../views/BooksIndex.vue";
import BooksShow from "../views/BooksShow.vue";
import BooksEdit from "../views/BooksEdit.vue";
import BooksNew from "../views/BooksNew.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
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
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
