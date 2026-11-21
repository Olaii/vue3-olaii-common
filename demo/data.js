// Made-up organizations and events, so the demo runs without the Olaii APIs

export const organizations = [
  { id: 1, name: "Olaii Club", permissions: { can_view_users: true }, modules: ["PARTNERS"] },
  { id: 2, name: "Festival Ljubljana", permissions: { can_view_users: false }, modules: [] },
];

export const events = [
  { id: 11, name: "Opening night", organization: organizations[0] },
  { id: 12, name: "New Year's Eve", organization: organizations[0] },
  { id: 21, name: "Summer festival", organization: organizations[1] },
];

const wait = () => new Promise((resolve) => setTimeout(resolve, 200));

function find(list, id) {
  const item = list.find((element) => element.id == id);
  if (!item) throw new Error(`Not found: ${id}`);
  return item;
}

export const context = {
  async fetchOrganizations(search) {
    await wait();
    return organizations.filter(
      (o) => !search || o.name.toLowerCase().includes(search.toLowerCase())
    );
  },
  async fetchOrganization(id) {
    await wait();
    return find(organizations, id);
  },
  async fetchEvents(organizationId) {
    await wait();
    return events.filter((e) => e.organization.id == organizationId);
  },
  async fetchEvent(organizationId, eventId) {
    await wait();
    const event = find(events, eventId);
    if (event.organization.id != organizationId)
      throw new Error(`Event ${eventId} is not in ${organizationId}`);
    return event;
  },
  async search(search) {
    const found = await this.fetchOrganizations(search);
    return [
      ...found.map((o) => ({ ...o, type: "ORGANIZATION" })),
      ...events
        .filter((e) => !search || e.name.toLowerCase().includes(search.toLowerCase()))
        .map((e) => ({ ...e, type: "EVENT" })),
    ];
  },
  organizationRoute: "organization",
  eventRoute: "event",
};

export const demoProfile = {
  id: 1,
  first_name: "Demo",
  last_name: "User",
  email: "demo@olaii.com",
  profile: { role: "MANAGER", allow_guestlist: true, allow_pass: true, allow_vouchers: true },
};
