export async function getQuery() {
  await this.$router.isReady();
  const query = this.$route.query;
  delete query.id;
  return query;
}

export function clone(o) {
  return Object.assign({}, o);
}

export default {
  install: (app) => {
    app.config.globalProperties.$getQuery = getQuery;
    app.config.globalProperties.$clone = clone;
  },
};
