import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/Layout";
import NotFound from "@/views/NotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/views/TasksList")
      },
      {
        path: "/tasks/new",
        name: "create",
        component: () => import("@/views/TaskCreate")
      },
      {
        path: "/tasks/:id",
        name: "view",
        component: () => import("@/views/TaskView"),
        props: true
      }
    ]
  },
  {
    path: "/404",
    name: "404",
    component: NotFound
  },
  {
    path: "*",
    redirect: "/404"
  }
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes
});

export default router;
