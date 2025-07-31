import { createRouter, createWebHistory } from "vue-router";
import components from "./components-list";
import { useOlaiiAuthStore } from "@/store/auth.store"

const routes = [];
components.forEach(c => {
  routes.push({
    path: c.path,
    name: c.name,
    component: () => c.component
  })
})

const router = createRouter({
  history: createWebHistory("/common"),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useOlaiiAuthStore();
  if (!from.name && !authStore.userProfile.value) await authStore.getUserProfile();
  next()
})

export default router;
