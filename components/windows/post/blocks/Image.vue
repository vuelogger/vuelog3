<template>
  <img
    ref="img"
    class="image"
    :src="data?.file?.url"
    :alt="alt"
    loading="lazy"
    decoding="async"
  />
  <!-- <nuxt-img
    class="image"
    :src="data?.file?.url"
    :alt="alt"
    ref="img"
    @load="loading = false"
  /> -->
  <div class="img-caption">{{ alt }}</div>
  <Loading v-show="loading" />
</template>

<script setup>
const { block } = defineProps(["block"]);
const data = computed(() => block[block.type]);

const alt = computed(() => data?.caption?.[0].plain_text);
const loading = ref(true);
const img = ref(null);

onMounted(() => {
  img.value.onload = () => {
    loading.value = false;
  };
});
</script>
