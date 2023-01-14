<template>
  <nav @mousemove="onMouseMove" @mouseleave="onMouseLeave">
    <div class="app-item" v-for="(info, name, i) in apps" :key="name">
      <img
        :style="{ width: widths[i] + 'px' }"
        :src="`/images/apps/${name}.png`"
        ref="appRef"
        @click="openApp(name)"
      />
      <p>{{ name }}</p>
    </div>
  </nav>
</template>

<script setup>
const MIN_WIDTH = 40;
const MAX_WIDTH = MIN_WIDTH * 1.8;
const SPEED = 0.1;
const STEP = (MAX_WIDTH - MIN_WIDTH) * SPEED;

const appRef = ref(null);

const apps = ref({
  BlogDiary: {},
  MusicPlayer: {},
  Post: {},
  Twitter: {},
});

const widths = ref(
  Array.from({ length: Object.keys(apps.value).length }, () => MIN_WIDTH)
);

let aniId = null;

const openApp = function (name) {};

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
  updateTo(Array.from({ length: widths.value.length }, () => MIN_WIDTH));
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  width: 40px;
  z-index: 100000;
  background-color: rgba(23, 38, 61, 0.5333333333);
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
      background-color: rgba(100, 100, 100, 0.7);
      padding: 0.5em 0.7em;
      border-radius: 5px;
      box-shadow: 0 0 1px 1px #5d5d5d;
    }

    img:hover + p {
      display: block;
    }
  }
}
</style>
