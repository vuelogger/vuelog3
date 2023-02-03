<template></template>

<script setup>
import { useWindowStore } from "@/stores/window";

const { closeAllWindows } = useWindowStore();

onMounted(() => {
  closeAllWindows();
});
</script>
