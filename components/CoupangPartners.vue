<template>
  <div class="coupang-partners">
    <iframe
      src="https://ads-partners.coupang.com/widgets.html?id=644983&template=carousel&trackingCode=AF0397919&subId=&width=350&height=60"
      width="350"
      height="60"
      frameborder="0"
      scrolling="no"
      referrerpolicy="unsafe-url"
    ></iframe>
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
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  border-radius: 1rem;
}

@media (max-width: $breakpoint-tablet) {
  .coupang-partners {
    top: $header-height-tablet;
  }
}
</style>
