<template>
  <div class="night">
    <div v-for="s of stars" :key="s.top" class="star-wrap" :style="s">
      <div class="star"></div>
    </div>
  </div>
</template>

<script setup>
const stars = ref([]);
const STARS = 10;

onMounted(() => {
  if (window.innerWidth > 768) {
    setInterval(() => {
      if (stars.value.length > STARS) {
        stars.value.pop();
      }
      stars.value.unshift({
        top: (Math.random() * 100).toFixed(2) + "%",
        left: (Math.random() * 100).toFixed(2) + "%",
        width: (Math.random() * 200).toFixed(2) + 20 + "px",
      });
    }, 800);
  } else {
    stars.value = [];
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base/variable.scss";
$shooting-time: 3000ms;
$tail-length: 200px;
$shining-length: 30px;
.night {
  position: fixed;
  top: $header-height;
  left: -20%;
  width: 140%;
  height: 10%;
}

.star-wrap {
  position: absolute;
  left: 50%;
  top: 50%;
  width: $tail-length;
  height: 2px;
  transform: rotateZ(45deg);
}

.star {
  background: linear-gradient(
    -45deg,
    rgba(95, 145, 255, 1),
    rgba(0, 0, 255, 0)
  );
  width: 0;
  height: 100%;
  filter: drop-shadow(0 0 6px rgba(105, 155, 255, 1));
  animation: tail $shooting-time ease-in-out infinite,
    shooting $shooting-time ease-in-out infinite;
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: calc(50% - 1px);
    right: 0;
    height: 100%;
    background: linear-gradient(
      -45deg,
      rgba(0, 0, 255, 0),
      rgba(95, 145, 255, 1),
      rgba(0, 0, 255, 0)
    );
    border-radius: 100%;
    animation: shining $shooting-time ease-in-out infinite;
  }

  &::before {
    transform: translateX(50%) rotateZ(45deg);
  }

  &::after {
    transform: translateX(50%) rotateZ(-45deg);
  }
}

@keyframes tail {
  0% {
    width: 0;
  }

  30% {
    width: 100%;
  }

  100% {
    width: 0;
  }
}

@keyframes shining {
  0% {
    width: 0;
  }

  50% {
    width: $shining-length;
  }

  100% {
    width: 0;
  }
}

@keyframes shooting {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(#{$tail-length} * 3));
  }
}

@keyframes sky {
  0% {
    transform: rotate(45 - 5deg);
  }

  100% {
    transform: rotate(45 + 5deg);
  }
}
</style>
