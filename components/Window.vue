<template>
  <section class="window" ref="win">
    <div class="header" @dblclick="onDBClick">
      <MacBtns
        class="btns"
        @close="close(name)"
        @minimize="minimize(name)"
        @maximize="onDBClick"
      />

      <component :is="loadedHeaderComp" />
    </div>
    <main class="body">
      <component :is="loadedComp" />
    </main>
  </section>
</template>

<script setup>
import { useWindowStore } from "@/stores/window";
const { name } = defineProps({ name: String });
const loadedComp = defineAsyncComponent(() =>
  import(`@/components/windows/${name}.vue`)
);

const loadedHeaderComp = defineAsyncComponent(() =>
  import(`@/components/windows/headers/${name}Header.vue`)
);

const { close, maximize, minimize } = useWindowStore();

const win = ref(null);
let timer = null;
const onDBClick = function () {
  if (window.innerWidth < 768) return;

  win.value.classList.add("ani");
  maximize();

  if (!timer) {
    timer = setTimeout(() => {
      win.value.classList.remove("ani");
      timer = null;
    }, 300);
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base/variable.scss";

.window {
  position: fixed;
  border: 1px solid #666;
  box-sizing: border-box;
  font-size: 50px;
  color: white;
  box-shadow: 1px 3px 5px 0px rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  overflow: hidden;

  .header {
    height: $window-header-height;
    background-color: #222;
    display: flex;
    align-items: center;
    padding: 0 1.5rem;
    user-select: none;

    .btns {
      padding-right: 1.5rem;
    }
  }

  &.ani {
    transition: all 0.3s;
  }

  .body {
    position: relative;
    overflow-y: auto;
    background-color: white;
    height: calc(100% - #{$window-header-height});
    display: flex;
  }
}

@media (max-width: $breakpoint-tablet) {
  .window {
    position: absolute;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    box-shadow: none;
    border-radius: 0;
    border: 0;

    .header {
      height: auto;
      padding: 0;

      .btns {
        display: none;
      }
    }

    .body {
      height: 100%;
    }
  }
}
</style>
