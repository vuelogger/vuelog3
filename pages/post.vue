<template></template>

<script setup>
import { useWindowStore } from "@/stores/window";
import { usePostStore } from "@/stores/post";
import { useSeoMeta } from "unhead";
const route = useRoute();

const { setPage } = usePostStore();

const request = async function () {
  if (route.params.id) {
    setPage(null);
    const { data } = await useFetch("/api/page", {
      method: "post",
      body: { blockId: route.params.id },
    });
    setPage(data.value);

    if (data.value?.cover) {
      fetch(data.value?.cover)
        .then((response) => response.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const imageBase64 = reader.result.split(",")[1];
            const image = `data:image/jpeg;base64,${imageBase64}`;

            useSeoMeta({
              title: data.value?.title,
              ogTitle: data.value?.title,
              description: data.value?.description,
              ogDescription: data.value?.description,
              ogImage: image,
              twitterCard: "summary_large_image",
            });
          };
        });
    } else {
      useSeoMeta({
        title: data.value?.title,
        ogTitle: data.value?.title,
        description: data.value?.description,
        ogDescription: data.value?.description,
        twitterCard: "summary_large_image",
      });
    }
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
