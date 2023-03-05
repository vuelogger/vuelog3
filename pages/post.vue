<template></template>

<script setup>
import { useWindowStore } from "@/stores/window";
import { usePostStore } from "@/stores/post";
import { useSeoMeta } from "unhead";
const route = useRoute();

const { setPage } = usePostStore();

const request = function () {
  if (route.params.id && route.params.id.includes("-")) {
    setPage(null);
    useFetch("/api/page", {
      method: "post",
      body: { blockId: route.params.id },
    }).then(({ data }) => {
      setPage(data.value);

      let image = data.value?.cover;
      if (image) {
        // 바꾸지 않으면 일부 값이 사라짐
        image = image.replaceAll("%2F", "/");
      }

      // useHead로 써보자 값은 제대로 들어가는 모양인데 왜 west-2로 들어갈까
      useSeoMeta({
        title: data.value?.title,
        ogTitle: data.value?.title,
        description: data.value?.description,
        ogDescription: data.value?.description,
        ogImage: image,
        twitterCard: "summary_large_image",
      });
    });
  }
};

watch(route, request, { immediate: true });

onMounted(() => {
  const { openWindow } = useWindowStore();
  openWindow("Post");
});
</script>
