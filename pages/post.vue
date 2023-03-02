<template></template>

<script setup>
import { useWindowStore } from "@/stores/window";
import { usePostStore } from "@/stores/post";
import { useSeoMeta } from "unhead";

const route = useRoute();
const { data } = await useFetch("/api/page", {
  method: "post",
  body: { blockId: route.params.id },
});

const { setPage } = usePostStore();
setPage(data.value);
console.log(data.value?.title);

useSeoMeta({
  title: data.value?.title,
  ogTitle: data.value?.title,
  description: data.value?.description,
  ogDescription: data.value?.description,
  ogImage: data.value?.cover,
  twitterCard: "summary_large_image",
});

onMounted(() => {
  const { openWindow } = useWindowStore();
  openWindow("Post");
});
</script>
