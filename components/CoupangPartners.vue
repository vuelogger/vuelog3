<template>
  <div class="coupang-partners">
    <!-- X 이미지 추가 -->
    <iframe
      src="https://ads-partners.coupang.com/widgets.html?id=644983&template=carousel&trackingCode=AF0397919&subId=&width=350&height=60"
      width="350"
      height="60"
      frameborder="0"
      scrolling="no"
      referrerpolicy="unsafe-url"
    ></iframe>
    <p>
      이 광고는 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를
      제공받습니다.
    </p>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "@/assets/scss/base/variable.scss";
.coupang-partners {
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem 2rem;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  border-radius: 1rem;

  p {
    color: white;
    margin-top: 0.5rem;
  }
}

@media (max-width: $breakpoint-tablet) {
  .coupang-partners {
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    iframe {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
