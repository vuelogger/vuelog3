<template>
  <header class="main-header">
    <div class="left">
      <NuxtLink to="/" class="logo" @click="closeAllWindows">
        <img src="/images/logo.svg" alt="logo" />
      </NuxtLink>
      <span class="title">VueLog</span>
    </div>

    <div class="right">
      <MusicPlayer />
      <HeaderDateTime class="time" />
      <div class="dock-btn">
        <HamburgerBtn />
      </div>
    </div>
  </header>
</template>

<script setup>
import { useWindowStore } from "@/stores/window";
const { closeAllWindows } = useWindowStore();
</script>

<style lang="scss">
@import "~/assets/scss/base/variable.scss";
.main-header {
  display: flex;
  height: $header-height;
  background-color: #333;
  padding-left: 2.5rem;
  padding-right: 1.5rem;
  color: white;
  font-size: 1.4rem;
  font-weight: bold;

  .left {
    display: flex;
    align-items: center;
    height: 100%;
    .logo {
      height: 100%;
      display: flex;
      align-items: center;
      img {
        height: 50%;
        object-fit: contain;
        filter: invert(1) brightness(5) drop-shadow(2px 2px 2px black);
        // filter: drop-shadow(1px 1px 1px black) drop-shadow(-1px -1px 1px black)
        //   drop-shadow(1px -1px 1px black) drop-shadow(-1px 1px 1px black)
        //   brightness(1.5);
      }
    }

    .title {
      margin-left: 1.5rem;
    }
  }

  .right {
    display: flex;
    align-items: center;
    margin-left: auto;
    height: 100%;
  }
}

@media (max-width: $breakpoint-tablet) {
  .main-header {
    height: $header-height-tablet;
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    .right {
      .time {
        display: none;
      }

      .dock-btn {
        height: 40%;
        margin-left: 1rem;
      }
    }
  }
}
</style>
