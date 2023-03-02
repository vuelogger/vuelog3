<template></template>

<script setup>
import { useWindowStore } from "@/stores/window";

const { openWindow } = useWindowStore();

onMounted(() => {
  openWindow("Post");
});

useHead({
  titleTemplate: "Vuelog",
  meta: [
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
  ],
});
</script>
