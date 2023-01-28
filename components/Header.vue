<template>
  <header class="main-header">
    <div class="logo" @click="openDock">
      <img src="/images/logo.png" alt="logo" />
    </div>
    <span class="title">Vue Blog</span>

    <HeaderDateTime class="time" format="lll" />
  </header>
</template>

<script setup>
import { BREAKPOINT_TABLET } from "@/utils/config";

const breakpointTabletCSS = BREAKPOINT_TABLET + "px";

const openDock = function () {
  if (window && window.innerWidth < BREAKPOINT_TABLET) {
    const dock = document.querySelector(".dock");

    if (dock) {
      if (dock.classList.contains("active")) {
      } else {
      }
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/base/variable.scss";
.main-header {
  display: flex;
  align-items: center;
  height: $header-height;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 0 1.5rem;
  color: white;
  font-size: 1.4rem;
  font-weight: bold;

  .logo {
    height: 100%;
    display: flex;
    align-items: center;
    img {
      height: 70%;
      object-fit: contain;
      filter: invert(1) brightness(5);
    }
  }

  .title {
    margin-left: 1.5rem;
  }

  .time {
    margin-left: auto;
  }
}

@media (max-width: $breakpoint-tablet) {
  .main-header {
    .time {
      display: none;
    }
  }
}
</style>
