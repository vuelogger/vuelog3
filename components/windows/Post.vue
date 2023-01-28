<script setup>
const { data } = await useFetch("/api/page", {
  method: "post",
  body: { text: "Nuxt is Awesome!" },
});
console.log(data.value);
</script>

<template>
  <div></div>
</template>
