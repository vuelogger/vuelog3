<template>
  <h2 v-if="level == 2">
    <Text :text="data.rich_text" />
  </h2>
  <h3 v-else-if="level == 3">
    <Text :text="data.rich_text" />
  </h3>
</template>

<script setup>
import Text from "@/components/windows/post/blocks/Text.vue";
const { block } = defineProps(["block"]);
const data = computed(() => block[block.type]);
const level = computed(() => block.type.slice(-1));
</script>

<style lang="scss" scoped></style>
