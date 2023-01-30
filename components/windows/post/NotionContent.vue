<template>
  <div class="content">
    <div v-for="p of post" :key="p.id">{{ p }}</div>
  </div>
</template>

<script setup>
import Block from "./Block.vue";
const { post } = defineProps(["post"]);
</script>

<style lang="scss" scoped></style>
