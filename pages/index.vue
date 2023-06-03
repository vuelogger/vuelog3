<template></template>

<script setup>
import { useWindowStore } from "@/stores/window";

const { closeAllWindows } = useWindowStore();

onMounted(() => {
  closeAllWindows();
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
      content: "/logo.svg",
    },
    {
      hid: "twitter:image",
      name: "twitter:image",
      content: "/logo.svg",
    },
    {
      hid: "og:url",
      property: "og:url",
      content: "https://vue-log.com",
    },
    {
      hid: "description",
      name: "description",
      content:
        "Vue와 Blog를 합친 뷰로그(Vuelog)입니다. Vue와 관련된 얘기들을 다룹니다.",
    },
    {
      hid: "og:description",
      property: "og:description",
      content:
        "Vue와 Blog를 합친 뷰로그(Vuelog)입니다. Vue와 관련된 얘기들을 다룹니다.",
    },
    {
      hid: "twitter:description",
      name: "twitter:description",
      content:
        "Vue와 Blog를 합친 뷰로그(Vuelog)입니다. Vue와 관련된 얘기들을 다룹니다.",
    },
  ],
});
</script>
