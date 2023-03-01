import dynamicRoutes from "./src/sitemapRoute";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/scss/index.scss"],
  modules: [
    // ...
    "@pinia/nuxt",
    "@funken-studio/sitemap-nuxt-3",
    "@nuxtjs/robots",
  ],
  sitemap: {
    hostname: "https://vue-log.com",
    cacheTime: 1,
    routes: dynamicRoutes,
  },
  robots: {
    UserAgent: "*",
    Allow: "/",
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
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
        {
          hid: "og:title",
          property: "og:title",
          content: "Vuelog's Blog",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "/logo.png",
        },
        {
          hid: "og:locale",
          property: "og:locale",
          content: "ko_KR",
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: "/logo.png",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: "https://vue-log.com",
        },
        {
          hid: "description",
          name: "description",
          content: "Welcome to my VueLog!!",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "Welcome to my VueLog!!",
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: "Welcome to my VueLog!!",
        },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
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
