<template></template>

<script setup>
import { useWindowStore } from "@/stores/window";

onMounted(() => {
  const { openWindow } = useWindowStore();
  openWindow("Book");
});
</script>
