export function formatCurrency(amount) {
  return new Intl.NumberFormat("sl-SI", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export default {
  install: (app) => {
    app.config.globalProperties.$formatCurrency = formatCurrency;
  },
};
