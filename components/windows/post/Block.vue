<template>
  <Paragraph v-if="block.type == 'paragraph'" :data="data" />
  <!-- <Embed v-else-if="block.type == 'embed'" :data="data" /> -->
  <Quote v-else-if="block.type == 'quote'" :data="data" />
  <Callout v-else-if="block.type == 'callout'" :data="data" />
  <Image v-else-if="block.type == 'image'" :data="data" />
  <Bookmark v-else-if="block.type == 'bookmark'" :data="data" />
  <OrderedList
    v-else-if="block.type == 'numbered_list_item'"
    :data="data"
    :block="block"
  />
  <UnOrderedList
    v-else-if="block.type == 'bulleted_list_item'"
    :data="data"
    :block="block"
  />
  <hr v-else-if="block.type == 'divider'" />
  <Heading
    v-else-if="block.type.startsWith('heading_')"
    :data="data"
    :level="block.type.slice(-1)"
  />
</template>

<script setup>
import Paragraph from "@/components/windows/post/blocks/Paragraph.vue";
import Heading from "@/components/windows/post/blocks/Heading.vue";
import Embed from "@/components/windows/post/blocks/Embed.vue";
import Quote from "@/components/windows/post/blocks/Quote.vue";
import Callout from "@/components/windows/post/blocks/Callout.vue";
import Image from "@/components/windows/post/blocks/Image.vue";
import Bookmark from "@/components/windows/post/blocks/Bookmark.vue";
import OrderedList from "~~/components/windows/post/blocks/OrderedList.vue";
import UnOrderedList from "~~/components/windows/post/blocks/UnOrderedList.vue";

const { block, prevBlock } = defineProps(["block", "prevBlock"]);
const data = computed(() => block[block.type]);

const test = computed(() => {
  if (block.type === "numbered_list_item") {
    if (block.type != prevBlock.type) {
    }
  }
});
</script>

<style lang="scss" scoped></style>
