const now = new Date();
const offsetMs = now.getTimezoneOffset() * 60 * 1000;
const dateLocal = new Date(now.getTime() - offsetMs);
var date = dateLocal.toISOString().slice(0, 19).replace(/-/g, "-").replace("T", " ");
console.log(date)