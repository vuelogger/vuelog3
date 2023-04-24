<template>
  <img class="image" :src="data?.file?.url" :alt="alt" @load="loaded" />
  <div class="img-caption">{{ alt }}</div>
  <Loading v-show="loading" />
</template>

<script setup>
const { block } = defineProps(["block"]);
const data = computed(() => block[block.type]);

const alt = computed(() => data?.caption?.[0].plain_text);
const loading = ref(true);

const loaded = () => {
  loading.value = false;
};
</script>

<style lang="scss" scoped></style>
