export default function isValidURL(str) {
  const a = document.createElement('a');
  a.href = str;
  const path = a.pathname?.slice(1);
  if (str.length > 0) return path && path != window.location.host;
  return path;
}
