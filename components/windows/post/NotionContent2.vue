<template>
  <NotionRenderer :blockMap="blockMap" fullPage />
</template>

<script lang="ts">
import { NotionRenderer, getPageBlocks } from "vue-notion";

export default {
  components: { NotionRenderer },
  data: () => ({ blockMap: null }),
  async created() {
    // get Notion blocks from the API via a Notion pageId
    this.blockMap = await getPageBlocks("195e88fe7adf41e4ad63a10614b64cbe");
  },
};
</script>

<style>
/* optional Notion-like styles */
@import "vue-notion/src/styles.css";
</style>
