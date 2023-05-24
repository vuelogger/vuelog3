<template>
  <!-- <img src="/images/background.webp" class="main-bg" alt="background" /> -->
  <picture class="main-bg">
    <source media="(min-width: 768px)" srcset="/images/desktop-bg.webp" />
    <img src="/images/mobile-bg.webp" alt="Responsive image" />
  </picture>
  <FallingStars />
  <Header />
  <Dock />
  <WindowList />
  <!-- <MouseIcon /> -->
  <NuxtPage />
</template>

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
  z-index: -1;

  * {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
