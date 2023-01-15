<template>
  <header>
    <div class="logo">
      <img src="/images/logo.png" alt="logo" />
    </div>
    <span class="title">Vue Blog</span>
    <div class="made-by">
      <a v-for="(info, name) of icons" :href="info.href" target="_blank">
        <img :src="info.src" :alt="name" />
      </a>
    </div>

    <HeaderDateTime class="time" format="lll" />
  </header>
</template>

<script setup>
const icons = ref({
  nuxt: {
    src: "/images/header/nuxt.png",
    href: "https://nuxtjs.org/",
  },
  vue: {
    src: "/images/header/vue.png",
    href: "https://vuejs.org/",
  },
  pinia: {
    src: "/images/header/pinia.svg",
    href: "https://pinia.vuejs.org/",
  },
  notion: {
    src: "/images/header/notion.png",
    href: "https://www.notion.so/",
  },
});
</script>

<style lang="scss" scoped>
@import "~/assets/scss/base/variable.scss";
header {
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

  .made-by {
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: auto;

    a {
      height: 50%;
      margin-right: 2rem;

      img {
        height: 100%;
      }
    }
  }
}
</style>
