<template>
  <div class="codeblock">
    <div class="codeblock__head">
      <div class="lang" :class="lang">{{ lang }}</div>
      <div class="code-caption">{{ caption }}</div>
    </div>
    <pre>
      <code class="hljs" :class="`language-${lang}`" v-html="html"></code>
    </pre>
  </div>
</template>

<script setup>
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";
const { block } = defineProps(["block"]);

const caption = computed(() => block?.code?.caption?.[0]?.plain_text);
const lang = computed(() => block?.code?.language);

let html = ref(null);
onMounted(() => {
  const code = block?.code?.rich_text?.[0]?.plain_text;
  html.value = hljs.highlight(code, { language: block?.code?.language }).value;
});
</script>

<style lang="scss" scoped>
code {
  white-space: pre;
}
</style>
