<template>
  <div class="mac-btns">
    <button @click="$emit('close')">
      <img class="normal" src="@/assets/images/windows/mac-close-btn.png" />
      <img
        class="hover"
        src="@/assets/images/windows/mac-close-btn_active.png"
      />
    </button>
    <button @click="$emit('minimize')">
      <img class="normal" src="@/assets/images/windows/mac-min-btn.png" />
      <img class="hover" src="@/assets/images/windows/mac-min-btn_active.png" />
    </button>
    <button @click="$emit('maximize')">
      <img class="normal" src="@/assets/images/windows/mac-max-btn.png" />
      <img class="hover" src="@/assets/images/windows/mac-max-btn_active.png" />
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
