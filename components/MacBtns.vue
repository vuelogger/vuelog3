<template>
  <div class="mac-btns">
    <button @click="$emit('close')">
      <img
        class="normal"
        src="@/assets/images/windows/mac-close-btn.webp"
        alt="close"
        aria-label="Close"
      />
      <img
        class="hover"
        src="@/assets/images/windows/mac-close-btn_active.webp"
        alt="close"
        aria-label="Close"
      />
    </button>
    <button @click="$emit('minimize')">
      <img
        class="normal"
        src="@/assets/images/windows/mac-min-btn.webp"
        alt="minimize"
        aria-label="Minimize"
      />
      <img
        class="hover"
        src="@/assets/images/windows/mac-min-btn_active.webp"
        alt="minimize"
        aria-label="Minimize"
      />
    </button>
    <button @click="$emit('maximize')">
      <img
        class="normal"
        src="@/assets/images/windows/mac-max-btn.webp"
        alt="maximize"
        aria-label="Maximize"
      />
      <img
        class="hover"
        src="@/assets/images/windows/mac-max-btn_active.webp"
        alt="maximize"
        aria-label="Maximize"
      />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.mac-btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 5.5rem;

  &:hover {
    .normal {
      display: none;
    }

    .hover {
      display: block;
    }
  }

  button {
    width: 1.2rem;
    height: 1.2rem;
    display: flex;
    background-size: contain;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .hover {
      display: none;
    }
  }
}
</style>
