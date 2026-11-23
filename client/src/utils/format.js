/** Short, readable booking id: last 6 chars of the Mongo id, uppercased. */
export const shortBookingId = (id) => id.slice(-6).toUpperCase();

/** Today's date in the user's local time zone, as "YYYY-MM-DD" (for <input type="date">). */
export const todayISO = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};
