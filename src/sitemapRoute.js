export default async () => {
  return await $fetch("/api/sitemap_routes", {
    method: "POST",
    headers: {
      "Contet-Type": "application/json",
    },
  });
};
