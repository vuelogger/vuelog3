<template>
  <ul v-if="block.type == 'bulleted_list_item'">
    <li>
      <Text :text="data.rich_text" />
      <Block v-for="b of children" :key="b.id" :block="b" />
    </li>
  </ul>
  <ol v-if="block.type == 'numbered_list_item'" :start="block.start">
    <li>
      <Text :text="data.rich_text" />
      <Block v-for="b of children" :key="b.id" :block="b" />
    </li>
  </ol>
</template>

<script setup>
import Text from "@/components/windows/post/blocks/Text.vue";
import Block from "@/components/windows/post/Block.vue";
const { block } = defineProps(["block"]);
const data = computed(() => block[block.type]);
const children = ref([]);

if (block.has_children) {
  useFetch("/api/post/blocks", {
    key: block.id,
    method: "post",
    body: { blockId: block.id },
    server: false,
  }).then(({ data }) => {
    children.value = data.value;
  });
}
</script>

<style lang="scss" scoped>
ul {
  list-style-type: disc;
  padding-left: 3rem;
}
ol {
  list-style-type: decimal;
  padding-left: 3rem;
}

ul,
ol {
  li {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
}
</style>
