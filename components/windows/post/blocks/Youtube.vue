<template>
  <iframe
    :src="`https://www.youtube-nocookie.com/embed/${videoId}`"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</template>

<script setup>
const { block } = defineProps(["block"]);
const videoId = computed(() => {
  const url = block[block.type]?.external?.url;
  if (url) {
    const u = new URL(url);
    return u.searchParams.get("v");
  }
});
</script>

<style lang="scss" scoped></style>
