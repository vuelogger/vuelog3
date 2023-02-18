<template>
  <section class="window" ref="win">
    <div class="header" @dblclick="onDBClick">
      <MacBtns
        class="btns"
        @close="close(name)"
        @minimize="minimize(name)"
        @maximize="onDBClick"
      />

      <component :is="loadedHeaderComp" @return-to-top="returnToTop" />
    </div>
    <main class="body" ref="body">
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

const body = ref(null);

const returnToTop = function () {
  body.value.scrollTo(0, 0);
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base/variable.scss";
@import "@/assets/scss/base/mixins.scss";

.window {
  position: fixed;
  border: 1px solid #666;
  box-sizing: border-box;
  box-shadow: 1px 3px 5px 0px rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  overflow: hidden;
  user-select: none;

  .header {
    color: white;
    height: $window-header-height;
    background-color: #161616ad;
    backdrop-filter: blur(3px);
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
    overflow-y: auto;
    height: calc(100% - #{$window-header-height});
    display: flex;

    @include scrollTheme;
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
      background-color: #222;
      border-top: 2px solid #333;

      .btns {
        display: none;
      }
    }

    .body {
      height: calc(100% - #{$window-header-height-tablet});
      overflow-x: hidden;
    }
  }
}
</style>
