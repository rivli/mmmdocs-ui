import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: () => import("@/pages/Home"),
    },
    {
      path: "/settings",
      component: () => import("@/pages/Settings"),
    },
    {
      path: "/about",
      component: () => import("@/pages/About"),
    },
    {
      path: "*",
      name: "Page Not Found",
      component: () => import("./pages/404"),
    },
  ],
});
