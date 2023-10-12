export default function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-us", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
