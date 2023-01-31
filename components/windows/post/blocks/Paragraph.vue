<template>
  <p>
    <Text :text="data.rich_text" />
  </p>
</template>

<script setup>
import Text from "@/components/windows/post/blocks/Text.vue";
const { data } = defineProps(["data"]);
</script>

<style lang="scss" scoped></style>
