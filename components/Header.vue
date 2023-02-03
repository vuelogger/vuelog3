<template>
  <header class="main-header">
    <div class="left">
      <div class="logo">
        <img src="/images/logo.png" alt="logo" />
      </div>
      <span class="title">VueLog</span>
    </div>

    <div class="right">
      <MusicPlayer class="music-player" />
      <HeaderDateTime class="time" format="lll" />
      <div class="dock-btn">
        <HamburgerBtn />
      </div>
    </div>
  </header>
</template>

<style lang="scss">
@import "~/assets/scss/base/variable.scss";
.main-header {
  display: flex;
  height: $header-height;
  background-color: rgba(98, 98, 98, 0.3);
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
        // filter: invert(1) brightness(5);
        filter: drop-shadow(1px 1px 1px black) drop-shadow(-1px -1px 1px black)
          drop-shadow(1px -1px 1px black) drop-shadow(-1px 1px 1px black)
          brightness(1.5);
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
