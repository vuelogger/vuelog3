<template>
  <iframe
    height="400"
    style="width: 100%"
    scrolling="no"
    title="Mac Dock"
    :src="`${embedURL}?default-tab=js%2Cresult&editable=true`"
    frameborder="no"
    allowtransparency="true"
    allowfullscreen="true"
  >
    See the Pen
    <a href="https://codepen.io/vuelogger/pen/VwdBYpV"> Mac Dock</a> by Blog
    Wealthy (<a href="https://codepen.io/vuelogger">@vuelogger</a>) on
    <a href="https://codepen.io">CodePen</a>.
  </iframe>
</template>

<script setup>
const { block } = defineProps(["block"]);
const embedURL = computed(() => {
  const l = block[block.type].url.split("/");
  l.splice(l.length - 2, 1);
  l.splice(l.length - 1, 0, "embed");
  return l.join("/");
});
</script>

<style lang="scss" scoped></style>
