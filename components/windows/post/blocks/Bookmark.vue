<template>
  <a class="bookmark" :href="bookmark.url" v-if="bookmark?.url">
    <div class="left">
      <h4>{{ bookmark.title }}</h4>
      <p>{{ bookmark.description }}</p>
      <div class="url">
        <img :src="bookmark.icon" v-if="bookmark.icon" />
        <span>{{ bookmark.url }}</span>
      </div>
    </div>
    <div class="right" v-if="bookmark.image">
      <img :src="bookmark.image" />
    </div>
  </a>
</template>

<script setup>
const { block } = defineProps(["block"]);
const bookmark = ref(null);

useFetch("/api/bookmark", {
  method: "post",
  body: {
    url: block[block.type]?.url,
  },
}).then(({ data }) => {
  bookmark.value = data.value;
});
</script>

<style lang="scss">
@import "@/assets/scss/base/mixins.scss";
$transition-time: 0.4s;
.bookmark {
  display: flex;
  margin: 3rem 0;
  border-radius: 1rem;
  background-color: rgb(241, 241, 241);
  overflow: hidden;
  min-height: 20rem;
  &:hover {
    .left {
      h4 {
        color: rgb(255, 140, 140);
        font-weight: bold;
      }
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
    padding: 2rem;
    box-sizing: border-box;
    line-height: 1.3;

    h4 {
      font-size: 1.2em;
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
          background-color: rgb(255, 176, 176);
          transition: all $transition-time;
        }
      }
    }
  }
  .right {
    flex: 2;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all $transition-time;
    }
  }
}
</style>
