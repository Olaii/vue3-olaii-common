import { format } from "date-fns";
import { sl } from "date-fns/locale";

export function formatCurrency(amount, currency = "EUR", locale = "sl-SI") {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
}

/** 21.11.2026 */
export function formatDate(date) {
  if (!date) return "";
  return format(new Date(date), "d.M.yyyy");
}

/** 21.11.2026 • 14:05, with options sobota, 21.11.2026 • 14:05:09 */
export function formatDateWithTime(date, showSeconds = false, showDay = false) {
  if (!date) return "";
  return format(
    new Date(date),
    `${showDay ? "eeee, " : ""}d.M.yyyy • HH:mm${showSeconds ? ":ss" : ""}`,
    { locale: sl }
  );
}
