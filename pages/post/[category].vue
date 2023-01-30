<template></template>

<script setup>
import { useWindowStore } from "@/stores/window";

const { openWindow } = useWindowStore();

onMounted(() => {
  openWindow("Post");
});
</script>
