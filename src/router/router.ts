import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import Landing from "@/views/Landing.vue";
import Home from "@/views/Home.vue";
import Api from "@/views/Api.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", component: Landing },
  { path: "/home", component: Home },
  { path: "/api", component: Api },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
