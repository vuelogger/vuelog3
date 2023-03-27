<template>
  <div></div>
</template>

<script setup>
import { useWindowStore } from "@/stores/window";

onMounted(() => {
  const { openWindow } = useWindowStore();

  openWindow("GuestBook");
});
</script>

<style lang="scss" scoped></style>
