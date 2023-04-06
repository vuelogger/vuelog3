<template>
  <div class="coupang-partners" v-if="show">
    <div class="close-btn" @click="show = false">
      <img src="@/assets/images/close.svg" alt="coupang-close" />
    </div>
    <div class="content">
      <iframe
        src="https://ads-partners.coupang.com/widgets.html?id=644983&template=carousel&trackingCode=AF0397919&subId=&width=350&height=60"
        width="300"
        height="150"
        frameborder="0"
        scrolling="no"
        referrerpolicy="unsafe-url"
      ></iframe>
      <p>
        쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
      </p>
    </div>
  </div>
</template>

<script setup>
const show = ref(false);

watch(show, () => {
  localStorage.setItem("vuelog-coupang-show", show.value);
});
onMounted(() => {
  const s = localStorage.getItem("vuelog-coupang-show");
  if (s) {
    show.value = s == "true";
  } else {
    show.value = true;
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base/variable.scss";

@keyframes slide {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0);
  }
}

.coupang-partners {
  position: absolute;
  top: 1rem;
  right: 1rem;
  box-sizing: border-box;
  user-select: none;
  animation: slide 0.7s;
  z-index: 0;

  .close-btn {
    transition: opacity 0.3s;
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-30%, -30%);
    margin-left: auto;
    z-index: 1;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.6rem;
    box-sizing: border-box;
    border-radius: 50%;
    background-color: #222;
    border: 1px solid #555;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .content {
    background-color: #222;
    backdrop-filter: blur(4px);
    padding: 1rem 2rem;
    border-radius: 1rem;
    border: 1px solid #555;
    iframe {
      width: 100%;
    }
    p {
      color: white;
      margin-top: 0.5rem;
      text-align: center;
    }
  }
}

@media (max-width: $breakpoint-tablet) {
  .coupang-partners {
    max-width: calc(100% - 2rem);
    min-width: calc(100% - 2rem);
  }
}
</style>
