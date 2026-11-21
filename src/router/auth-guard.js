import TokenService from "../services/token.service";
import ErrorService from "../services/error.service";
import { useOlaiiAuthStore } from "../stores/auth.store";
import { getOlaiiOptions } from "../options";

/**
 * Router guard for the apps: sets the document title, loads the user profile on the first navigation and lets the app
 * check access per route. Routes with meta.public skip the login check.
 *
 * @param {object} [config]
 * @param {string} [config.errorRoute] Name of the error route (default "error")
 * @param {Function} [config.checkAccess] (to, authStore) => true, or a route location to redirect to
 *
 * @example
 * router.beforeEach(
 *   createOlaiiAuthGuard({
 *     checkAccess: (to) =>
 *       to.name == "app.organizations.users" && !generalStore.permissions.can_view_users
 *         ? { name: "error", query: { message: "No permissions to view users!" } }
 *         : true,
 *   })
 * );
 */
export function createOlaiiAuthGuard({ errorRoute = "error", checkAccess } = {}) {
  return async (to) => {
    const { title } = getOlaiiOptions();
    document.title = to.meta?.title ? `${to.meta.title} • ${title}` : title;

    if (to.meta?.public) return true;

    TokenService.syncFromCookies();
    if (!TokenService.hasToken()) {
      return { name: errorRoute, query: { message: "Not logged in!" } };
    }

    const authStore = useOlaiiAuthStore();
    if (!authStore.userProfile) {
      try {
        await authStore.getUserProfile();
      } catch (error) {
        const parsed = ErrorService.showError(error);
        return { name: errorRoute, query: { message: parsed.message } };
      }
    }

    return checkAccess ? checkAccess(to, authStore) : true;
  };
}
