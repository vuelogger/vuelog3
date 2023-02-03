<template>
  <div class="menu-btn">
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.menu-btn {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  aspect-ratio: 1;

  &.active {
    .bar {
      &:nth-child(1) {
        width: 60%;
      }

      &:nth-child(2) {
        width: 95%;
      }

      &:nth-child(3) {
        width: 40%;
      }
    }
  }

  .bar {
    flex: 0 0 auto;
    height: 2px;
    background-color: white;
    border-radius: 3rem;
    transition: all 0.3s;
    &:nth-child(1) {
      width: 100%;
    }

    &:nth-child(2) {
      width: 55%;
    }
    &:nth-child(3) {
      width: 80%;
    }
  }
}
</style>
