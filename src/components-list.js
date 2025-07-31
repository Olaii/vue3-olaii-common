// Add component here to create new route and navigation list item

const components = [
  {
    path: "/",
    name: "home",
    title: "Home",
    component: import("@/demo/DemoHome.vue")
  },
  {
    path: "/auth-store",
    name: "auth-store",
    title: "Auth store",
    component: import("@/demo/DemoAuthStore.vue")
  },
  {
    path: "/general-store",
    name: "general-store",
    title: "General store",
    component: import("@/demo/DemoGeneralStore.vue")
  },
  // {
  //   path: "/olaii-user",
  //   name: "olaii-user",
  //   title: "Olaii User",
  //   component: import("@/demo/DemoOlaiiUser.vue")
  // },
];

export default components;
