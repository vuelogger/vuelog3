<template>
  <header class="main-header">
    <div class="logo">
      <img src="/images/logo.png" alt="logo" />
    </div>
    <span class="title">Vue Blog</span>

    <MusicPlayer class="music-player" />
    <HeaderDateTime class="time" format="lll" />
    <div class="dock-btn">
      <HamburgerBtn />
    </div>
  </header>
</template>

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

  .music-player {
    margin-left: auto;
  }

  .dock-btn {
    display: none;
  }
}

@media (max-width: $breakpoint-tablet) {
  .main-header {
    height: $header-height-tablet;
    .time {
      display: none;
    }

    .dock-btn {
      display: block;
      height: 100%;
      padding: 0.7rem 0;
      box-sizing: border-box;
    }
  }
}
</style>
