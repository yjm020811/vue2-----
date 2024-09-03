import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
  {
    path: "/excel",
    component: () => import("@/views/myExcel.vue")
  }
];

const router = new Router({
  routes
});

export default router;
