import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
  {
    path: "/",
    component: () => import("@/components/echartsDemo.vue")
  },
  {
    path: "/edit",
    component: () => import("@/components/echartsDemo.vue")
  },

  {
    path: "/detail",
    component: () => import("@/components/echartsDemo.vue")
  },
  {
    path: "/excel",
    component: () => import("@/views/myExcel.vue")
  }
];

const router = new Router({
  routes
});

export default router;
