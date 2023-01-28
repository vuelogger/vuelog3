<template>
  <div
    class="window-list"
    :style="{ cursor }"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @mousemove="onMouseMove($event)"
  >
    <Window
      v-for="w of loadedWindows"
      :key="w.name"
      :name="w.name"
      v-show="!w.minimized"
      :style="{
        left: w.x + 'px',
        top: w.y + 'px',
        width: w.w + 'px',
        height: w.h + 'px',
      }"
    />
  </div>
</template>

<script setup>
import { getPt } from "@/composable/common";
import { useWindowStore } from "@/stores/window";

const { loadedWindows } = useWindowStore();

const cursor = ref("auto");

let mode = null;
let startPt = null;
const onMouseDown = (e) => {
  const { windowNum, setTopWindow, getTopWindowMode, getCursorOf } =
    useWindowStore();

  if (windowNum > 0) {
    startPt = getPt(e);
    mode = getTopWindowMode(startPt);
    cursor.value = getCursorOf(startPt);

    setTopWindow(startPt);
  }
};

const onMouseUp = () => {
  mode = null;
  startPt = null;
  cursor.value = "auto";
};

let timer = null;
const onMouseMove = (e) => {
  if (!timer) {
    timer = setTimeout(() => {
      const { getCursorOf, resize, move } = useWindowStore();
      const endPt = getPt(e);

      // Left Click
      if (startPt) {
        if (mode.startsWith("resize")) {
          resize(endPt, mode);
        } else if (mode === "move") {
          move(startPt, endPt);
          startPt = endPt;
        }
      } else {
        cursor.value = getCursorOf(endPt);
      }
      timer = null;
    }, 30);
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base/variable.scss";
.window-list {
  position: relative;
  height: calc(100% - $header-height);
}
</style>
