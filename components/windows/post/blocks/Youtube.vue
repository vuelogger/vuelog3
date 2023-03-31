<template>
  <iframe
    :src="`https://www.youtube-nocookie.com/embed/${videoId}`"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    class="youtube"
  ></iframe>
</template>

<script setup>
const { block } = defineProps(["block"]);
console.log(block);
const videoId = computed(() => {
  const url = block[block.type]?.external?.url;
  console.log(url);
  if (url) {
    const u = new URL(url);
    let value = u.searchParams.get("v");
    if (value) {
      return value;
    } else {
      const str = url.split("/");
      console.log(str);
      return str[str.length - 1];
    }
  }
});
</script>

<style lang="scss" scoped>
.youtube {
  aspect-ratio: 1.6 / 1;
  border-radius: 1rem;
}
</style>
