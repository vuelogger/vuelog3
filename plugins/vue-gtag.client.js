import VueGtag from "vue-gtag-next";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: "G-VZ6M0S3CGH",
    },
  });
});
