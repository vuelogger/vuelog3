<template>
  <div
    class="window-list"
    :style="{ cursor }"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @mousemove="onMouseMove($event)"
  >
    <CoupangPartners />
    <Window
      v-for="(w, i) of store.loadedWindows"
      :key="w.name"
      :name="w.name"
      v-show="!w.minimized"
      :style="{
        left: w.x + 'px',
        top: w.y + 'px',
        width: w.w + 'px',
        height: w.h + 'px',
        zIndex: i,
      }"
    />
  </div>
</template>

<script setup>
import { useWindowStore } from "@/stores/window";

const store = useWindowStore();

const cursor = ref("auto");

const getPt = function (event) {
  return { x: event.clientX, y: event.clientY };
};

let mode = null;
let startPt = null;
const onMouseDown = (e) => {
  if (window.innerWidth < 768) return;
  const { loadedWindowNum, setTopWindowOf, getTopWindowMode, getCursorOf } =
    useWindowStore();

  if (loadedWindowNum > 0) {
    startPt = getPt(e);
    mode = getTopWindowMode(startPt);
    cursor.value = getCursorOf(startPt);

    setTopWindowOf(startPt);
  }
};

const onMouseUp = () => {
  if (window.innerWidth < 768) return;
  mode = null;
  startPt = null;
  cursor.value = "auto";
};

let timer = null;
const onMouseMove = (e) => {
  if (window.innerWidth < 768) return;
  const { getCursorOf, resize, move } = useWindowStore();
  const endPt = getPt(e);

  // Left Click
  if (startPt) {
    if (mode) {
      if (mode.startsWith("resize")) {
        resize(endPt, mode);
      } else if (mode === "move") {
        move(startPt, endPt);
        startPt = endPt;
      }
    }
  } else {
    cursor.value = getCursorOf(endPt);
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/base/variable.scss";
.window-list {
  position: relative;
  height: calc(100% - $header-height);
}

@media (max-width: $breakpoint-tablet) {
  .window-list {
    height: calc(100% - $header-height-tablet);
  }
}
</style>
