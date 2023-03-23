<template>
  <div class="book-header">
    <button
      class="menu"
      @click.stop="menuClick"
      @mouseenter="menuHover = true"
      @mouseleave="menuHover = false"
    >
      <MenuBtn class="btn" :class="{ active: menuHover }" />
      <span>TOC</span>
    </button>
  </div>
</template>

<script setup>
import { useBookStore } from "@/stores/book";
const { toggleSidebar } = useBookStore();
const menuHover = ref(false);
const menuClick = function () {
  toggleSidebar();
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base/variable.scss";
.book-header {
  flex: 1;
  display: flex;
  align-items: center;
  color: white;
  font-size: 1.4rem;
  padding: 0 1rem;
  pointer-events: none;
  height: $window-header-height-tablet;

  button {
    cursor: pointer;
    pointer-events: initial;
  }

  .menu {
    position: relative;
    display: flex;
    align-items: center;
    height: 40%;

    .btn,
    span {
      display: flex;
    }

    span {
      margin-left: 1.2rem;
      transition: all 0.3s;
    }

    &:hover {
      span {
        transform: translateX(3px) scale(1.1);
      }
    }

    &:active {
      opacity: 0.7;
    }
  }
}
</style>
