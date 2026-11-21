/* eslint-disable no-console */
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import StorageService from "../services/storage.service";
import { getOlaiiOptions } from "../options";

function contextOptions() {
  const { context } = getOlaiiOptions();
  if (!context) throw new Error("[OlaiiCommon] The context option is not set");
  return context;
}

/**
 * The selected organization (and event, in apps that have events). The selection is kept in cookies, so the app
 * opens on the same organization next time. Data is loaded with the app's own functions from options.context.
 */
export const useOlaiiContextStore = defineStore("olaii-context", () => {
  const organizations = ref([]);
  const organization = ref(null);
  const event = ref(null);

  const organizationId = computed(() => organization.value?.id ?? null);
  const eventId = computed(() => event.value?.id ?? null);
  // Permissions of the user in the selected organization, e.g. { can_view_users: true }
  const permissions = computed(() => organization.value?.permissions || {});
  // Modules enabled for the organization, as a map: { PARTNERS: true }
  const modules = computed(() =>
    Object.fromEntries((organization.value?.modules || []).map((name) => [name, true]))
  );
  // "Event - Organization" for view headers
  const viewHeader = computed(() =>
    [event.value?.name, organization.value?.name].filter(Boolean).join(" - ")
  );

  async function getOrganizations(search) {
    organizations.value = await contextOptions().fetchOrganizations(search);
    return organizations.value;
  }

  function setOrganization(data) {
    if (data?.id != organizationId.value) setEvent(null); // An event belongs to one organization
    organization.value = data;
    if (data) StorageService.setOrganization(data.id);
    else StorageService.removeOrganization();
  }

  function setEvent(data) {
    event.value = data;
    if (data) StorageService.setEvent(data.id);
    else StorageService.removeEvent();
  }

  async function selectOrganization(id) {
    if (id == organizationId.value) return organization.value;
    setOrganization(await contextOptions().fetchOrganization(id));
    return organization.value;
  }

  async function selectEvent(id) {
    if (id == eventId.value) return event.value;
    setEvent(await contextOptions().fetchEvent(organizationId.value, id));
    return event.value;
  }

  // Loads the item with this id, or returns null when it can't (deleted, no access). `forget` removes the cookie it
  // came from, so a stale saved id isn't tried again; ids from the URL have no cookie to forget.
  async function loadSaved(id, load, forget) {
    if (id == null) return null;
    try {
      return await load(id);
    } catch (error) {
      console.error("[CONTEXT] Could not load", id, error);
      forget?.();
      return null;
    }
  }

  /**
   * Selects the organization (and event) to open the app with, in this order:
   * the ids from the URL, the ids saved in cookies, then the user's first organization (and its first event).
   *
   * @param {object} [ids] organizationId / eventId from the URL
   * @param {object} [config]
   * @param {boolean} [config.pickFirstEvent] Select the organization's first event when none is in the URL or
   *   cookie (default true). The context guard turns it off: an organization page doesn't select an event by itself.
   * @param {boolean} [config.strict] Ids from the URL must load; otherwise nothing more is selected and
   *   "not-found" is returned (default false: fall back to the cookie or the first one). The context guard uses it.
   *
   * @returns {Promise<"event" | "organization" | "none" | "not-found">} What was selected; "none" when the user has
   *   no organizations, "organization" when the app has no events or the organization has none.
   */
  async function restore(
    { organizationId: routeOrganizationId, eventId: routeEventId } = {},
    { pickFirstEvent = true, strict = false } = {}
  ) {
    const context = contextOptions();
    // Read both cookies first: selecting an organization clears the saved event
    const cookieOrganizationId = StorageService.getOrganization();
    const cookieEventId = StorageService.getEvent();
    const savedOrganizationId = routeOrganizationId ?? cookieOrganizationId;

    // 1. Organization
    const forgetOrganization =
      routeOrganizationId == null ? () => StorageService.removeOrganization() : null;
    const saved = await loadSaved(savedOrganizationId, selectOrganization, forgetOrganization);
    if (!saved && strict && routeOrganizationId != null) return "not-found";
    if (!saved) {
      const all = await getOrganizations();
      if (!all.length) return "none";
      setOrganization(all[0]);
    }

    // 2. Event, only in apps with events
    if (!context.fetchEvents) return "organization";

    // The saved event belongs to the saved organization, so it's only used when that organization opened
    const sameOrganization =
      cookieOrganizationId != null && cookieOrganizationId == organizationId.value;
    const savedEventId = routeEventId ?? (sameOrganization ? cookieEventId : null);
    const forgetEvent = routeEventId == null ? () => StorageService.removeEvent() : null;
    const savedEvent = await loadSaved(savedEventId, selectEvent, forgetEvent);
    if (!savedEvent && strict && routeEventId != null) return "not-found";
    if (!savedEvent) {
      if (!pickFirstEvent) return "organization";
      const events = await context.fetchEvents(organizationId.value);
      if (!events.length) return "organization";
      setEvent(events[0]);
    }
    return "event";
  }

  function cleanStore() {
    organizations.value = [];
    organization.value = null;
    event.value = null;
  }

  return {
    organizations,
    organization,
    event,
    organizationId,
    eventId,
    permissions,
    modules,
    viewHeader,
    getOrganizations,
    setOrganization,
    setEvent,
    selectOrganization,
    selectEvent,
    restore,
    cleanStore,
  };
});
