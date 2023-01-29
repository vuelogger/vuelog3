<template>
  <aside class="sidebar">
    <!-- 검색 -->
    <!-- 메뉴 -->
    <ul>
      <li v-for="l of list" :key="l.id">{{ l.category }}</li>
    </ul>
    <!-- 목차 -->
  </aside>
</template>

<script setup>
const { list } = defineProps(["list"]);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base/variable.scss";
.sidebar {
  width: 300px;
  height: 100%;
  background-color: white;
  border: 1px solid gray;
  color: black;
}
@media (max-width: $breakpoint-tablet) {
  .sidebar {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
