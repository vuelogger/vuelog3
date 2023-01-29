<template>
  <header class="main-header">
    <div class="left">
      <div class="logo">
        <img src="/images/logo.png" alt="logo" />
      </div>
      <span class="title">Vue Blog</span>
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
  background-color: rgba(0, 0, 0, 0.3);
  padding: 0 2.5rem;
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
    .music-player {
      margin-left: auto;
    }

    .dock-btn {
      display: none;
    }
  }
}

@media (max-width: $breakpoint-tablet) {
  .main-header {
    height: $header-height-tablet;
    background-color: #222;

    .right {
      .time {
        display: none;
      }

      .dock-btn {
        display: block;
        height: 100%;
        padding: 1.5rem 0;
        box-sizing: border-box;
        margin-left: 1.5rem;
      }
    }
  }
}
</style>
