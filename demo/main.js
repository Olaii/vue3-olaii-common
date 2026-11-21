// Demo app for trying the library during development (yarn dev). Not part of the build.
import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { createGettext } from "vue3-gettext";
import NicePlugin from "vue3-nice-elements";
import "/node_modules/vue3-nice-elements/dist/style.css";
import { createOlaiiCommon } from "@/index";
import App from "./App.vue";
import HomeView from "./HomeView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", name: "home", component: HomeView }],
});

const gettext = createGettext({ defaultLanguage: "en", mutedLanguages: ["en"] });

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(gettext);
app.use(NicePlugin, { router, gettext });
app.use(
  createOlaiiCommon({
    appId: "common",
    apiURL: import.meta.env.VITE_API_URL || "https://pass-api.dev.olaii.com/",
    authURL: import.meta.env.VITE_AUTH_URL || "https://auth.dev.olaii.com/",
    production: false,
    debug: true,
  })
);
app.mount("#app");
