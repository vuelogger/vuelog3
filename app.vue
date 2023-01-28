<template>
  <img src="/images/bg.jpg" class="main-bg" />
  <Header />
  <Dock />
  <WindowList />
  <NuxtPage />
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  // TODO: Desktop 환경에서만 적용하도록 하기
  window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("VUELOG_POS", new Date());
  });
});
</script>

<style lang="scss">
#__nuxt {
  width: 100%;
  height: 100%;
}
.main-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}
</style>
