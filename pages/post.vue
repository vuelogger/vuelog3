<template></template>

<script setup>
import { useWindowStore } from "@/stores/window";
import { usePostStore } from "@/stores/post";
import { useSeoMeta } from "unhead";
const route = useRoute();

const { setPage } = usePostStore();

// 여기서 request 하는 이유는 SEO가 여기서 되기 때문이다.
const request = function () {
  const number = parseInt(route.params.id);
  if (Number.isInteger(number)) {
    setPage(null);

    useFetch("/api/post/page", {
      method: "post",
      body: { number },
    }).then(({ data }) => {
      setPage(data.value);

      const page = data.value;
      let image = page?.cover;
      if (image) {
        // 바꾸지 않으면 일부 값이 사라짐
        image = image.replaceAll("%2F", "/");
      }

      useSeoMeta({
        title: page?.title,
        ogTitle: page?.title,
        description: page?.description,
        ogDescription: page?.description,
        ogImage: image,
        twitterCard: "summary_large_image",
      });
    });
  }
};

watch(
  route,
  () => {
    request();
  },
  { immediate: true }
);

onMounted(() => {
  const { openWindow } = useWindowStore();
  openWindow("Post");
});
</script>
