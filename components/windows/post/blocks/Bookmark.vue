<template>
  <a class="bookmark" :href="url" v-if="bookmark">
    <div class="left">
      <h4>{{ title }}</h4>
      <p>{{ desc }}</p>
      <div class="url">
        <img :src="icon" v-if="icon" />
        <span>{{ url }}</span>
      </div>
    </div>
    <div class="right" v-if="image">
      <img :src="image" />
    </div>
  </a>
</template>

<script setup>
const { block } = defineProps(["block"]);

const bookmark = ref(null);

const title = computed(() => {
  return bookmark.value?.ogTitle;
});

const url = computed(() => {
  return bookmark.value?.ogUrl || bookmark.value?.requestUrl;
});

const desc = computed(() => {
  return bookmark.value?.ogDescription;
});

const image = computed(() => {
  let result = "";
  let maxWidth = 0;
  if (bookmark.value?.ogImage) {
    if (bookmark.value.length) {
      for (const img of bookmark.value?.ogImage) {
        if (img.width === null) {
          result = img.url;
        } else if (img.width > maxWidth) {
          maxWidth = img.width;
          result = img.url;
        }
      }
    } else {
      result = bookmark.value?.ogImage?.url;
    }
  }
  return result;
});

const icon = computed(() => {
  let result = "";
  const f = bookmark.value?.favicon;
  if (f) {
    if (f.startsWith("http")) {
      result = f;
    } else if (f.startsWith("/")) {
      const u = new URL(url.value);
      result = u.origin + f;
    }
  }
  return result;
});

const { data } = await useFetch("/api/post/bookmark", {
  key: block.id,
  method: "post",
  headers: {
    "Content-Type": "application/json",
  },
  body: {
    url: block[block.type]?.url,
  },
});

bookmark.value = data.value;
</script>

<style lang="scss">
@import "@/assets/scss/base/mixins.scss";
$transition-time: 0.4s;
.bookmark {
  display: flex;
  margin: 3rem 0;
  border-radius: 1rem;
  border: 1px solid #ddd;
  overflow: hidden;
  min-height: 20rem;
  transition: all 0.3s;
  &:hover {
    transform: translate(-0.3rem, -1rem);
    box-shadow: 2px 2px 2px gray;

    .left {
      .url {
        span {
          &::before {
            width: 100%;
          }
        }
      }
    }
    .right {
      img {
        transform: scale(1.2);
      }
    }
  }

  .left {
    display: flex;
    flex-direction: column;
    flex: 3;
    padding: 4rem;
    box-sizing: border-box;
    line-height: 1.3;

    h4 {
      font-size: 1.2em;
      @include textClip(2);
    }

    p {
      font-size: 0.9em;
      color: gray;
      line-height: 1.4;
      margin-top: 1rem;
      @include textClip(4);
    }
    .url {
      display: flex;
      align-items: center;
      font-size: 1.2rem;
      color: gray;
      margin-top: auto;
      img {
        width: 2rem;
        margin-right: 1rem;
      }
      span {
        position: relative;
        @include textClip(1);
        &::before {
          content: "";
          position: absolute;
          left: 0;
          bottom: -1px;
          width: 0;
          height: 3px;
          background-color: #95abff;
          transition: all $transition-time;
        }
      }
    }
  }
  .right {
    flex: 2;
    overflow: hidden;
    border-left: 1px solid #ddd;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all $transition-time;
    }
  }
}
</style>
