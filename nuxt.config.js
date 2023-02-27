import dynamicRoutes from "./src/sitemapRoute";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/scss/index.scss"],
  modules: [
    // ...
    "@pinia/nuxt",
    "@funken-studio/sitemap-nuxt-3",
  ],
  sitemap: {
    hostname: "https://vue-log.com",
    cacheTime: 1,
    routes: dynamicRoutes,
  },
  app: {
    head: {
      charset: "utf-16",
      viewport: "initial-scale=1",
      title: "Vuelog's Blog",
      meta: [
        {
          name: "google-site-verification",
          content: "CyvFDg064KG5R0wkwhlZdsVdG5zElVLGvRiGMJIuV8Q",
        },
      ],
    },
  },
});
