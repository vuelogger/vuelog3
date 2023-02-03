<template>
  <audio controls preload="none" :src="src"></audio>
</template>

<script setup>
const { block } = defineProps(["block"]);
const src = computed(() => {
  return block[block.type]?.audio?.file?.url;
});
</script>

<style lang="scss" scoped></style>
