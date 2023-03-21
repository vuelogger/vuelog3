<template>
  <article>
    <Block v-for="b of blocks" :key="b.id" :block="b" />
  </article>
</template>

<script setup>
import Block from "@/components/windows/post/Block.vue";
const blocks = ref([]);
const route = useRoute();

useFetch("/api/post/blocks", {
  method: "post",
  body: { blockId: route.params.id },
}).then(({ data }) => {
  blocks.value = data.value;
  if (blocks.value.length == 0) {
    alert("내용이 없거나 문제가 발생했습니다. 새로고침 해주세요!");
  }
});
onMounted(() => {
  const body = document.querySelector(".window-list main.body");

  body.scrollTo(0, 0);
});
</script>

<style lang="scss">
@import "@/assets/scss/base/mixins.scss";
article {
  padding: 4rem 0;
  font-size: 1.6rem;
  line-height: 1.8;
  line-break: anywhere;

  hr {
    height: 3rem;
    border: 0;
    background-image: url(/images/divider.png);
    background-position: 50%;
    background-size: contain;
    background-repeat: no-repeat;
    margin: 4rem 0;
  }

  strong {
    color: black;
    font-weight: bold;
  }

  em {
    color: #507ed1;
    box-shadow: inset 0 -7px 0 #74a7ff2b;
  }

  p {
    line-height: 2;
    margin-bottom: 0.5rem;
  }

  u {
    border-bottom: 1px solid;
    text-decoration: none;
  }

  .link {
    color: #507ed1;

    &:hover {
      text-decoration: underline;
    }
  }

  audio {
    display: flex;
    margin: 4rem auto;
  }

  .image {
    display: block;
    margin: 0 auto;
    width: 80%;
    border-radius: 3rem;
    border: 1px solid lightgray;
    border-radius: 8px;
  }

  .inline-code {
    color: #d76b6f;
    padding: 0.25rem 0.5rem;
    margin: 0;
    font-size: 0.9em;
    background-color: rgba(27, 31, 35, 0.05);
    border-radius: 3px;
  }

  h2 {
    font-size: 2em;
    font-weight: bold;
    margin-top: 3rem;
    padding-top: 3rem;
    border-top: 4px dashed lightgray;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.5em;
    font-weight: bold;
    margin-top: 7rem;
    margin-bottom: 2rem;
    padding-left: 2rem;
    border-left: 1rem solid #858bff;
  }

  iframe {
    width: 100%;
    aspect-ratio: 1;
  }

  blockquote {
    margin: 3rem 0;
    // background-color: #e2e2e2;
    padding: 2rem;
    border-radius: 1rem;
    color: gray;
    font-style: italic;
  }

  .callout {
    margin: 3rem 0;
    padding: 2rem;
    border-radius: 1rem;
  }
}
</style>
