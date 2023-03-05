<template>
  <img class="image" :src="data?.file?.url" :alt="alt" loading="lazy" />
  <div class="img-caption">{{ alt }}</div>
</template>

<script setup>
const { block } = defineProps(["block"]);
const data = computed(() => block[block.type]);

const alt = computed(() => data?.caption?.[0].plain_text);
</script>

<style lang="scss" scoped></style>
