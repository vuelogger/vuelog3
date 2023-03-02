<template></template>

<script>
import { useWindowStore } from "@/stores/window";
import { useSeoMeta } from "unhead";
useSeoMeta({
  title: "My Amazing Site",
  ogTitle: "My Amazing Site",
  description: "This is my amazing site, let me tell you all about it.",
  ogDescription: "This is my amazing site, let me tell you all about it.",
  ogImage: "https://example.com/image.png",
  twitterCard: "summary_large_image",
});

const { openWindow } = useWindowStore();

onMounted(() => {
  openWindow("Post");
});
</script>
