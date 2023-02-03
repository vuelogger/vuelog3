<template>
  <div class="search">
    <input type="text" placeholder="Search" />
    <img src="@/assets/images/windows/post/sidebar/search.svg" />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.search {
  position: relative;
  width: 100%;
  padding: 1rem 5rem 1rem 2rem;
  box-sizing: border-box;
  border-radius: 3rem;
  border: 1px solid #aaa;
  box-shadow: 2px 2px 2px lightgray;
  font-size: 1.6rem;
  &::placeholder {
    color: #ccc;
  }
  input {
    width: 100%;
  }
  img {
    height: 50%;
    position: absolute;
    top: 50%;
    right: 2rem;
    transform: translateY(-50%);
  }
}
</style>
