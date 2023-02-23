<template>
  <article>
    <Block v-for="b of blocks" :key="b.id" :block="b" />
  </article>
</template>

<script setup>
import Block from "@/components/windows/post/Block.vue";
const { blocks } = defineProps(["blocks"]);
</script>

<style lang="scss">
article {
  padding: 4rem 0;
  font-size: 1.6rem;
  line-height: 1.8;
  line-break: anywhere;
  font-family: "Pretendard", sans-serif;

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
    color: #ff6767;
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
    padding-bottom: 0.3rem;
    border-bottom: 1px solid;
    text-decoration: none;
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
    color: #476582;
    padding: 0.25rem 0.5rem;
    margin: 0;
    font-size: 0.9em;
    background-color: rgba(27, 31, 35, 0.05);
    border-radius: 3px;
  }

  .bookmark {
    display: flex;
    margin: 3rem 0;
    border-radius: 3rem;
    background-color: lightgray;

    .left {
      flex: 2;
    }

    .right {
      flex: 1;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .codeblock {
    margin: 3rem 0;
    font-family: sans-serif;
    border-radius: 1rem;
    overflow: hidden;

    &__head {
      display: flex;
      align-items: center;
      background-color: #1e1e1e;
      color: white;
      padding: 1rem 1.5rem 0 1.5rem;
      margin-bottom: -0.5rem;
      .lang {
        color: #aaa;
        border-radius: 1rem;
        font-weight: bold;
        text-transform: uppercase;

        &.html {
          color: #d84f4f;
        }
        &.javascript {
          color: #dada63;
        }
        &.css {
          color: #5757d9;
        }
      }

      .code-caption {
        color: gray;
        font-size: 0.9em;
        margin-left: auto;
      }
    }

    pre {
      display: flex;
      flex-direction: column;
    }
  }

  ol,
  ul {
    list-style: initial;
    padding-left: 3rem;
  }

  h2 {
    font-size: 2em;
    font-weight: bold;
    font-family: "GmarketSans", sans-serif;
    margin-top: 3rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.5em;
    font-weight: bold;
    font-family: "GmarketSans", sans-serif;
    margin-top: 3rem;
    margin-bottom: 1rem;
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
