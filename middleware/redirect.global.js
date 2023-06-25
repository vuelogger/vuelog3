export default defineNuxtRouteMiddleware((to, from) => {
  console.log("to", "https://blogcreator.blog" + to.path);
  return navigateTo("https://blogcreator.blog" + to.path, {
    redirectCode: 301,
    external: true,
  });
});
