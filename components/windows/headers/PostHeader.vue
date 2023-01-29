<template>
  <div class="post-header">
    <button class="menu">Menu</button>
    <button class="return-top">Return to top</button>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.post-header {
  flex: 1;
  display: flex;
  align-items: center;
  color: white;
  font-size: 1.4rem;
  border-top: 1px solid #444;
  padding: 0 2.5rem;
  height: 4rem;

  .return-top {
    margin-left: auto;
  }
}
</style>
