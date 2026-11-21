import { useOlaiiContextStore } from "../stores/context.store";

/**
 * Router guard that loads the organization (and event) from the URL before an app page opens: on a direct link, a
 * reload, or a link to another organization. An organization or event in the URL that can't be loaded (doesn't
 * exist, no access) shows the 404 page. Routes without an :organizationId param are left alone.
 *
 * Register it with router.beforeEach, after createOlaiiAuthGuard. Not as beforeEnter: vue-router skips beforeEnter
 * when only the params change (/1/events -> /2/events), so the new organization would never load.
 *
 * @example
 * router.beforeEach(createOlaiiAuthGuard());
 * router.beforeEach(createOlaiiContextGuard());
 */
export function createOlaiiContextGuard({
  noOrganizationsRoute = "no-organizations",
  notFoundRoute = "not-found",
} = {}) {
  return async (to) => {
    // Only app pages: public pages (error, 404) and no-organizations have no organization in their path
    const isAppPage = to.matched.some((record) => record.path.includes(":organizationId"));
    if (!isAppPage) return true;

    const context = useOlaiiContextStore();
    const { organizationId, eventId } = to.params;

    const organizationLoaded = !organizationId || organizationId == context.organizationId;
    const eventLoaded = !eventId || eventId == context.eventId;
    if (organizationLoaded && eventLoaded && context.organization) return true;

    // strict: an organization or event in the URL that can't be loaded selects nothing else
    const selected = await context.restore(
      { organizationId, eventId },
      { pickFirstEvent: false, strict: true }
    );
    if (selected == "none") return { name: noOrganizationsRoute };
    if (selected == "not-found") {
      // The 404 page, keeping the URL
      return {
        name: notFoundRoute,
        params: { pathMatch: to.path.substring(1).split("/") },
        query: to.query,
        hash: to.hash,
      };
    }
    return true;
  };
}
