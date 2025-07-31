import { format } from "date-fns";

export function formatDate(date) {
  if (!date) return "";
  return format(new Date(date), "d.M.yyyy");
}

export function formatDateWithTime(date, showSeconds) {
  if (!date) return "";
  return format(new Date(date), "d.M.yyyy • HH:mm" + (showSeconds ? ":ss" : ""));
}

export default {
  install: (app) => {
    app.config.globalProperties.$formatDate = formatDate;
    app.config.globalProperties.$formatDateWithTime = formatDateWithTime;
  },
};
