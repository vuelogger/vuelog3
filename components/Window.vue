<template>
  <div class="window" ref="win">
    <div class="header" @dblclick.self="onDBClick">
      <MacBtns
        class="btns"
        @close="close(name)"
        @minimize="minimize(name)"
        @maximize="onDBClick"
      />
    </div>
    <component :is="loadedComp" />
  </div>
</template>

<script setup>
import { useWindowStore } from "@/stores/window";
const { name } = defineProps({ name: String });
const loadedComp = defineAsyncComponent(() =>
  import(`@/components/windows/${name}.vue`)
);
const { headerHeightCss, close, maximize, minimize } = useWindowStore();

const win = ref(null);
let timer = null;
const onDBClick = function () {
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
    height: v-bind(headerHeightCss);
    background-color: #333;
    display: flex;
    align-items: center;
    padding: 0 1.5rem;
    user-select: none;
  }

  &.ani {
    transition: all 0.3s;
  }
}
</style>
