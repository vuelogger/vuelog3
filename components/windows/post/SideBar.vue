<template>
  <Transition name="slide-left">
    <aside class="sidebar" v-show="sidebarActive">
      <!-- 검색 -->
      <Search />
      <!-- 메뉴 -->
      <Menu :category="category" />
      <!-- 태그 목록 -->
      <!-- 목차 -->
    </aside>
  </Transition>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { usePostStore } from "@/stores/post";
import Search from "./sidebar/Search.vue";
import Menu from "./sidebar/Menu.vue";
const { sidebarActive } = storeToRefs(usePostStore());
const { category } = defineProps(["category"]);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base/variable.scss";
.sidebar {
  position: absolute;
  top: $window-header-height;
  left: 0;
  width: 230px;
  height: calc(100% - #{$window-header-height});
  background-color: white;
  border-right: 1px solid #eee;
  padding: 2rem 1rem;
  box-sizing: border-box;
  z-index: 3;
  overflow-y: auto;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-left-enter-to,
.slide-left-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s;
}

@media (max-width: $breakpoint-tablet) {
  .sidebar {
    top: $window-header-height-tablet;
    height: calc(100% - #{$window-header-height-tablet});
  }
}
</style>
