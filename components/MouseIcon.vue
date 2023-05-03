<template>
  <img
    ref="icon"
    :style="{ left: x.toFixed(2) + 'px', top: y.toFixed(2) + 'px' }"
    src="@/assets/images/mouse-icon.webp"
    alt="icon"
  />
</template>

<script setup>
let x = ref(-100);
let y = ref(-100);
let target = { x: -100, y: -100 };
const SPEED = 0.03;

const icon = ref(null);

const update = function () {
  const diffX = target.x - x.value;
  const diffY = target.y - y.value;

  x.value += diffX * SPEED;
  y.value += diffY * SPEED;

  requestAnimationFrame(update);
};

onMounted(() => {
  window.addEventListener("mousemove", (e) => {
    console.log(icon.value);
    if (icon.value) {
      target.x = e.clientX;
      target.y = e.clientY;
    }
  });

  requestAnimationFrame(update);
});
</script>

<style lang="scss" scoped>
img {
  position: fixed;
  z-index: 10000000;
  margin-left: 5px;
  margin-top: 5px;
}
</style>
