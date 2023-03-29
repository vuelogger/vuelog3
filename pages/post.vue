<template></template>

<script setup>
import { useWindowStore } from "@/stores/window";
import { usePostStore } from "@/stores/post";
import { useSeoMeta } from "unhead";
const route = useRoute();

const { setPage } = usePostStore();

const request = async function () {
  const number = parseInt(route.params.id);
  if (Number.isInteger(number)) {
    setPage(null);
    const { data } = await useFetch("/api/post/page", {
      method: "post",
      body: { number },
    });

    setPage(data.value);

    let image = data.value?.cover;
    if (image) {
      // 바꾸지 않으면 일부 값이 사라짐
      image = image.replaceAll("%2F", "/");
    }

    useSeoMeta({
      title: data.value?.title,
      ogTitle: data.value?.title,
      description: data.value?.description,
      ogDescription: data.value?.description,
      ogImage: image,
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
