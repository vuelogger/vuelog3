<template>
  <div class="callout" :class="theme">
    <img :src="`/images/${theme}.svg`" />
    <pre>
      <Text :text="block[block.type].rich_text" />
    </pre>
  </div>
</template>

<script setup>
import Text from "@/components/windows/post/blocks/Text.vue";
const { block } = defineProps(["block"]);
const theme = computed(() => {
  const emoji = block[block.type]?.icon?.emoji;
  let result = "";
  if (emoji === "⚠️") {
    result = "warn";
  } else if (emoji === "ℹ️") {
    result = "info";
  }
  return result;
});
</script>

<style lang="scss" scoped>
.callout {
  display: flex;
  align-items: flex-start;
  img {
    width: 3rem;
    margin-right: 1.5rem;
  }
  pre {
    white-space: pre-line;
  }
  &.info {
    background-color: #e1f8ff;
  }
  &.warn {
    background-color: #ffffcd;
  }
}
</style>
