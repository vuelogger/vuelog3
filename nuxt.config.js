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
        {
          name: "naver-site-verification",
          content: "4d043e47da86db9a54e655b0c98b04051110c397",
        },
      ],
      script: [
        {
          src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8123307370591079",
          async: true,
          crossorigin: "anonymous",
        },
      ],
    },
  },
});
