<template></template>

<script setup>
import { useWindowStore } from "@/stores/window";
import { usePostStore } from "@/stores/post";
import { useSeoMeta } from "unhead";
const route = useRoute();

const { setPage } = usePostStore();

const request = async function () {
  if (route.params.id && route.params.id.includes("-")) {
    setPage(null);
    const { data } = await useFetch("/api/page", {
      method: "post",
      body: { blockId: route.params.id },
    });
    setPage(data.value);

    useSeoMeta({
      title: data.value?.title,
      ogTitle: data.value?.title,
      description: data.value?.description,
      ogDescription: data.value?.description,
      // ogImage: data.value?.cover,
      twitterCard: "summary_large_image",
    });
  }
};

watch(
  route,
  async () => {
    await request();
  },
  { immediate: true }
);

onMounted(() => {
  const { openWindow } = useWindowStore();
  openWindow("Post");
});
</script>
