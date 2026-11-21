// Demo app for trying the library during development (yarn dev). Not part of the build.
import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { createGettext } from "vue3-gettext";
import NicePlugin from "vue3-nice-elements";
import "/node_modules/vue3-nice-elements/dist/style.css";
import "@/styles/index.scss";
import {
  createOlaiiAuthGuard,
  createOlaiiCommon,
  createOlaiiContextGuard,
  createOlaiiRoutes,
  OlaiiAppLayout,
  TokenService,
  useOlaiiAuthStore,
  useOlaiiContextStore,
} from "@/index";
import App from "./App.vue";
import PageView from "./PageView.vue";
import OverviewView from "./OverviewView.vue";
import { context, demoProfile } from "./data";

const gettext = createGettext({
  availableLanguages: { en: "English", sl: "Slovenščina" },
  defaultLanguage: "en",
  mutedLanguages: ["en"],
});

const app = createApp(App);
app.use(createPinia());
app.use(gettext);
app.use(
  createOlaiiCommon({
    // Own app id, so the demo's cookies (language, organization, event) don't change the real apps' ones
    appId: "demo",
    apiURL: import.meta.env.VITE_API_URL || "https://pass-api.dev.olaii.com/",
    authURL: import.meta.env.VITE_AUTH_URL || "https://auth.dev.olaii.com/",
    title: "Olaii common",
    defaultLanguage: "en",
    gettext,
    context,
    debug: true,
  })
);

// Logged in (dev cookies on test.olaii.com): the real flow, starting at the loading page.
// Otherwise a made-up user and no login check, so the layout can be tried on localhost.
const loggedIn = TokenService.hasToken();
if (!loggedIn) useOlaiiAuthStore().userProfile = demoProfile;

const links = [
  { type: "TITLE", name: "Library" },
  { name: "Overview", path: "overview", icon: "icon-package" },
  // Event links only while an event is selected, like guestlist
  { type: "TITLE", name: "Event", hidden: () => !useOlaiiContextStore().event },
  {
    name: "Dashboard",
    path: "event",
    icon: "icon-home",
    hidden: () => !useOlaiiContextStore().event,
  },
  { type: "TITLE", name: "Organization" },
  { name: "Events", path: "organization", icon: "icon-calendar" },
  { name: "Users", path: "users", icon: "icon-users", disabled: () => true },
];

// The overview is the start page; the demo data always has organization 1. The library's "/" (the loading page) is
// replaced, but /loading still runs the real flow ("Back home" on the status pages).
const olaiiRoutes = createOlaiiRoutes().filter((route) => route.path != "/");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: { name: "overview", params: { organizationId: 1 } } },
    ...olaiiRoutes,
    {
      path: "/:organizationId",
      component: OlaiiAppLayout,
      props: { links },
      children: [
        { path: "", name: "organization", component: PageView, meta: { title: () => "Events" } },
        { path: "users", name: "users", component: PageView, meta: { title: () => "Users" } },
        {
          path: "overview",
          name: "overview",
          component: OverviewView,
          meta: { title: () => "Overview" },
        },
        {
          path: ":eventId",
          name: "event",
          component: PageView,
          meta: { title: () => "Dashboard" },
        },
      ],
    },
  ],
});
if (loggedIn) router.beforeEach(createOlaiiAuthGuard());
router.beforeEach(createOlaiiContextGuard());

app.use(router);
app.use(NicePlugin, { router, gettext });
app.mount("#app");
