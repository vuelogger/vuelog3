<template>
  <Transition name="slide-left">
    <aside class="sidebar" v-show="sidebarActive">
      <!-- 검색 -->
      <!-- <Search /> -->
      <!-- 메뉴 -->
      <Menu />
      <!-- 태그 목록 -->
      <!-- 목차 -->
    </aside>
  </Transition>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { usePostStore } from "@/stores/post";
// import Search from "./sidebar/Search.vue";
import Menu from "./sidebar/Menu.vue";
const { sidebarActive } = storeToRefs(usePostStore());
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base/transitions.scss";
@import "@/assets/scss/base/variable.scss";
.sidebar {
  position: absolute;
  top: $window-header-height;
  left: 0;
  width: 230px;
  height: calc(100% - #{$window-header-height});
  background-color: white;
  padding: 2rem 1rem;
  box-sizing: border-box;
  z-index: 3;
  overflow-y: auto;
}

@media (max-width: $breakpoint-tablet) {
  .sidebar {
    top: calc(#{$window-header-height-tablet} + 2px);
    height: calc(100% - #{$window-header-height-tablet} - 2px);
  }
}
</style>
