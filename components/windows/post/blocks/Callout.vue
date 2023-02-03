<template>
  <div class="callout" :class="background">
    <div>{{ emoji }}</div>
    <pre>
      <Text :text="block[block.type].rich_text" />
    </pre>
  </div>
</template>

<script setup>
import Text from "@/components/windows/post/blocks/Text.vue";
const { block } = defineProps(["block"]);
const emoji = computed(() => block[block.type]?.icon?.emoji);
const background = computed(() => {
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
  pre {
    white-space: pre-line;
  }
}
</style>
