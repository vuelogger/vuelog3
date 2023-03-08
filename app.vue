<template>
  <img src="/images/bg.jpg" class="main-bg" />
  <Header />
  <Dock />
  <WindowList />
  <!-- <CoupangPartners /> -->
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
  object-fit: cover;
  z-index: -1;
}
</style>
