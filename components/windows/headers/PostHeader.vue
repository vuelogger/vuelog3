<template>
  <div class="post-header">
    <button
      class="menu"
      @click.stop="menuClick"
      @mouseenter="menuHover = true"
      @mouseleave="menuHover = false"
    >
      <MenuBtn class="btn" :class="{ active: menuHover }" />
      <span>Menu</span>
    </button>
    <button class="return-top" @click="$emit('returnToTop')">
      <span>Return to top</span>
      <img
        src="@/assets/images/windows/post/sidebar/return-to-top.svg"
        alt="return-top"
      />
    </button>
  </div>
</template>

<script setup>
import { usePostStore } from "@/stores/post";
const { toggleSidebar } = usePostStore();
const menuHover = ref(false);
const menuClick = function () {
  toggleSidebar();
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base/variable.scss";
.post-header {
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

  .return-top {
    display: flex;
    height: 40%;
    margin-left: auto;
    img {
      height: 100%;
      transform: scale(1.5);
      transition: all 0.3s;
    }
    span {
      margin-right: 1.3rem;
      transition: all 0.3s;
      white-space: nowrap;
    }
    &:hover {
      span {
        transform: translateX(-3px) scale(1.1);
      }
      img {
        transform: scale(1.5) translateY(-6px);
      }
    }
    &:active {
      opacity: 0.7;
    }
  }
}

@media (max-width: $breakpoint-tablet) {
  .post-header {
    padding: 0 2.5rem;

    .return-top {
      &:hover {
        span {
          transform: none;
        }
        img {
          transform: scale(1.5);
        }
      }
    }
  }
}
</style>
