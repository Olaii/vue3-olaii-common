import OlaiiLoadingView from "../views/OlaiiLoadingView.vue";
import OlaiiErrorView from "../views/OlaiiErrorView.vue";
import OlaiiNotFoundView from "../views/OlaiiNotFoundView.vue";
import OlaiiNoOrganizationsView from "../views/OlaiiNoOrganizationsView.vue";
import { $gettext } from "../i18n";

/**
 * The routes every app has: loading (entry page), error, no-organizations and a catch-all 404.
 * Titles are functions, so they are translated when a page opens (see createOlaiiAuthGuard).
 *
 * @example
 * const router = createRouter({ history, routes: [...createOlaiiRoutes(), appRoutes] });
 */
export function createOlaiiRoutes({ homeRoute } = {}) {
  return [
    { path: "/", redirect: { name: "loading" } },
    {
      path: "/loading",
      name: "loading",
      component: OlaiiLoadingView,
      props: homeRoute ? { homeRoute } : {},
      meta: { public: true, title: () => $gettext("Loading") },
    },
    {
      path: "/error",
      name: "error",
      component: OlaiiErrorView,
      meta: { public: true, title: () => $gettext("Error") },
    },
    {
      path: "/no-organizations",
      name: "no-organizations",
      component: OlaiiNoOrganizationsView,
      meta: { title: () => $gettext("No organizations") },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: OlaiiNotFoundView,
      meta: { public: true, title: () => $gettext("Page not found") },
    },
  ];
}
