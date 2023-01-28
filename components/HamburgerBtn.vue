<template>
  <button :class="{ active: dockInfo.active }" @click="toggleDock">
    <div></div>
    <div></div>
    <div></div>
  </button>
</template>

<script setup>
import { useCommonStore } from "@/stores/common";
const { dockInfo, toggleDock } = useCommonStore();
</script>

<style lang="scss" scoped>
$border-radius: 30px;
$transition-time: 0.3s;
button {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  aspect-ratio: 1;
  cursor: pointer;
  transition: all $transition-time;

  div {
    width: 100%;
    height: 20%;
    background-color: white;
    border-radius: $border-radius;
    transition: all $transition-time;
  }

  &.active {
    transform: rotate(-45deg);
    div {
      &:nth-child(1) {
        width: 20%;
        height: 35%;
        border-radius: $border-radius $border-radius 0 0;
      }

      &:nth-child(3) {
        width: 20%;
        height: 35%;
        border-radius: 0 0 $border-radius $border-radius;
      }
    }
  }
}
</style>
