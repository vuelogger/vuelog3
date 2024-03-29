<template>
  <nav
    class="dock"
    :class="{ active: dockInfo.active }"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <button
      class="app-item"
      v-for="(name, i) in windowNames"
      :key="name"
      @click="selectDockItem(name)"
    >
      <img
        :style="{ width: widths[i] + 'px' }"
        :src="`/images/apps/${name}.webp`"
        ref="appRef"
        :alt="name"
        width="60"
      />
      <p>{{ name }}</p>
    </button>
  </nav>
  <div
    class="overlay"
    @click.self="closeDock"
    :class="{ active: dockInfo.active }"
  ></div>
</template>

<script setup>
import { useWindowStore, windowNames } from "@/stores/window";
import { useCommonStore } from "@/stores/common";

const { openWindow, loadedWindows } = useWindowStore();
const { dockInfo, closeDock } = useCommonStore();

const MIN_WIDTH = 40;
const MAX_WIDTH = MIN_WIDTH * 1.8;
const SPEED = 0.1;
const STEP = (MAX_WIDTH - MIN_WIDTH) * SPEED;

const appRef = ref(null);

const widths = ref(Array.from({ length: windowNames.length }, () => MIN_WIDTH));

let aniId = null;

const updateTo = function (goalWidths) {
  window.cancelAnimationFrame(aniId);
  aniId = null;

  let isAllDone = true;
  for (let i = 0; i < widths.value.length; i++) {
    let w = widths.value[i];
    if (goalWidths[i] < w) {
      w = Math.max(w - STEP, goalWidths[i]);
    } else if (goalWidths[i] > w) {
      w = Math.min(w + STEP, goalWidths[i]);
    } else {
      w = goalWidths[i];
    }

    if (w != goalWidths[i]) {
      isAllDone = false;
    }

    widths.value[i] = w;
  }

  if (!isAllDone) {
    aniId = window.requestAnimationFrame(() => {
      updateTo(goalWidths);
    });
  }
};

const onMouseMove = function (e) {
  if (window.innerWidth < 768) return;
  // Dock 안에서의 마우스의 위치를 구한다.
  const dockRect = e.target.getBoundingClientRect();
  const y = e.clientY - dockRect.top;

  const goalWidths = [];
  for (let i = 0; i < widths.value.length; i++) {
    // 각 app 아이콘에서 중심 위치를 구한다.
    const rect = appRef.value[i].getBoundingClientRect();
    const center = rect.top - dockRect.top + rect.height / 2;

    // 목표크기에서 (거리 / 3) 의 크기를 뺀다.
    // 가까울 수록 목표크기에 가까울 것이다.
    const dist = Math.abs(center - y);
    goalWidths[i] = Math.max(MAX_WIDTH - dist / 4, MIN_WIDTH);
  }

  // 목표 크기에 맞게 아이콘 크기를 변경한다.
  updateTo(goalWidths);
};

const onMouseLeave = function () {
  if (window.innerWidth < 768) return;
  updateTo(Array.from({ length: widths.value.length }, () => MIN_WIDTH));
};

const selectDockItem = function (name) {
  // Post를 열면서도 열려 있지 않은 경우만 열기
  // 열려있는 경우는 route 변경 안하기 위함
  const router = useRouter();
  if (name == "Post") {
    const isPostOpened =
      loadedWindows.filter((w) => w.name === "Post").length > 0;
    if (!isPostOpened) {
      router.push({ path: "/post" });
    }
  }

  if (window.innerWidth < 768) {
    closeDock();
  }
  openWindow(name);
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base/variable.scss";
.dock {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  width: 40px;
  z-index: 100000;
  background-color: #3636369c;
  box-shadow: 1px 1px 4px #888;
  border-radius: 1.4rem;
  padding: 1.2rem 0.6rem;
  cursor: default;

  .app-item {
    display: flex;
    align-items: center;
    margin-bottom: 0.7rem;
    &:last-child {
      margin-bottom: 0;
    }

    img {
      filter: drop-shadow(2px 2px 2px #000);
      border-radius: 10px;
    }

    p {
      display: none;
      margin-left: 1.8rem;
      color: #fff;
      font-size: 1.5rem;
      background-color: #3636369c;
      padding: 0.5em 0.7em;
      border-radius: 5px;
      box-shadow: 0 0 1px 1px #5d5d5d;
    }

    img:hover + p {
      display: block;
    }
  }
}

@media (max-width: $breakpoint-tablet) {
  .dock {
    transform: translate(-100%, -50%);
    transition: all 0.2s;
    opacity: 0;
    &.active {
      opacity: 1;
      transform: translate(0, -50%);

      .app-item {
        p {
          opacity: 1;
          transition: opacity 0.2s;
          transition-delay: 0.2s;
        }
      }
    }

    .app-item {
      p {
        display: block;
        opacity: 0;
        pointer-events: none;
      }
    }
  }

  .overlay {
    &.active {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1000;
      backdrop-filter: blur(2px);
    }
  }
}
</style>
