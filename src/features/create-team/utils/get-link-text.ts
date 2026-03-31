export const getLinkText = (url: string) => {
  if (!url) return "Your-Team";
  try {
    const { pathname } = new URL(url);
    const parts = pathname.split("/").filter(Boolean);
    return parts[parts.length - 1] || url;
  } catch {
    return url;
  }
};