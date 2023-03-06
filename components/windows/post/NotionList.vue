<template>
  <div class="list-wrapper">
    <div class="header" v-if="categoryName">
      <div class="title">
        <img :src="`/images/apps/post/${categoryName}.svg`" />
        <span>{{ categoryName }}</span>
      </div>
    </div>
    <nav class="list">
      <NuxtLink
        :to="`/post/${item.id}`"
        v-for="item of list"
        :key="item.number"
        class="item"
        ref="refs"
      >
        <div class="head">
          <img class="cover" :src="item.cover" v-if="item.cover" />
          <img class="cover no-image" src="/images/logo.png" v-else />
        </div>
        <div class="body">
          <div class="category" :class="item.category.toLowerCase()">
            {{ item.category }}
          </div>
          <div class="title">{{ item.title }}</div>
          <div class="desc">{{ item.description }}</div>
          <div class="bottom">
            <ul class="tags">
              <li v-for="t of item.tags" :key="t" :class="t.color">
                {{ t.name }}
              </li>
            </ul>

            <p class="created">
              {{ dateToStr(item.created, "YYYY. MM. DD") }}
            </p>
          </div>
        </div>
      </NuxtLink>

      <div class="item skeleton" v-for="n of 6" v-show="skelShow"></div>
    </nav>
  </div>
</template>

<script setup>
import { dateToStr } from "@/src/util";
import { usePostStore } from "@/stores/post";
import { storeToRefs } from "pinia";
const postStore = usePostStore();
const { category } = storeToRefs(postStore);

const route = useRoute();
const categoryName = ref("");

const refs = ref(null);
const list = ref([]);
const skelShow = ref(false);
let startCursor = undefined;

const { data } = await useFetch("/api/category");
postStore.setCategory(data.value);

const request = async function () {
  skelShow.value = true;
  const { data } = await useFetch("/api/table", {
    method: "post",
    body: { startCursor, category: categoryName.value },
  });

  if (data.value?.list?.length > 0) {
    list.value.push(...data.value.list);
  }

  startCursor = data.value.startCursor;
  skelShow.value = false;
};

const setCategoryName = () => {
  for (const c of category.value) {
    if (c.link === route.params.id) {
      categoryName.value = c.name;
      break;
    }
  }
};

const initIO = () => {
  const io = new IntersectionObserver(
    async (entries, io) => {
      // observe 하고 있는 entry들
      for (const entry of entries) {
        if (entry.isIntersecting) {
          io.unobserve(entry.target);

          // startCursor가 null이면 더이상 가져오지 않는다.
          if (startCursor !== null) {
            await request();

            if (refs.value.length > 0) {
              io.observe(refs.value[refs.value.length - 1].$el);
            }
          }
        }
      }
    },
    { threshold: 0.7 }
  );

  if (refs.value.length > 0) {
    io.observe(refs.value[refs.value.length - 1].$el);
  }
};

watch(
  route,
  async () => {
    list.value = [];
    startCursor = undefined;
    setCategoryName();
    await request();
    if (refs.value) {
      initIO();
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base/variable.scss";
@import "@/assets/scss/base/mixins.scss";
.list-wrapper {
  height: fit-content;
  padding: 7rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1024px;

  .header {
    width: 100%;
    padding-bottom: 1rem;
    margin-bottom: 3rem;
    border-bottom: 1px solid lightgray;
    .title {
      height: 5rem;
      font-size: 4rem;
      display: flex;
      align-items: center;

      img {
        height: 100%;
        margin-right: 1.5rem;
      }
    }
  }

  .list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 3rem 2rem;

    .item {
      border-radius: 1rem;
      overflow: hidden;
      box-shadow: 2px 2px 2px lightgray;
      transition: all 0.3s;
      aspect-ratio: 1 / 1.15;
      animation: fade-slide 0.7s;
      animation-fill-mode: backwards;

      @for $i from 1 to 7 {
        &:nth-child(6n - #{6 - $i}) {
          animation-delay: calc(0.2s * #{$i});
        }
      }

      &.skeleton {
        position: relative;
        animation: none;
        background-color: #ededed;

        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          box-shadow: 0 0 40px 21px white;
          animation: skeleton 1.5s infinite;
        }
      }

      &:hover {
        transform: translate(-5px, -10px);
        box-shadow: 2px 2px 5px 2px gray;

        .head {
          img {
            transform: scale(1.2);
          }
        }
      }
      .head {
        width: 100%;
        height: 50%;
        overflow: hidden;
        aspect-ratio: 1 / 0.7;
        border-bottom: 1px solid lightgray;
        .cover {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;

          &.no-image {
            transform: scale(0.5);
            object-fit: contain;
          }
        }
      }
      .body {
        position: relative;
        height: 50%;
        padding: 1.5rem 2rem;
        box-sizing: border-box;
        line-break: anywhere;
        display: flex;
        flex-direction: column;

        .category {
          font-size: 1.4rem;
          border-radius: 0.7rem;
          position: absolute;
          top: 0;
          transform: translateY(-50%);
          padding: 0.6rem 1rem;
          box-shadow: 0px 0px 0px 4px white;
          font-weight: bold;
          background-color: gray;
          color: white;
          &.html {
            background-color: #ff8787;
          }
          &.css {
            background-color: #989eff;
          }
          &.javascript {
            background-color: #c6c635;
          }
        }

        .title {
          margin-top: 1rem;
          font-size: 1.6rem;
          @include textClip(2);
        }
        .desc {
          margin-top: 0.5rem;
          @include textClip(3, 1.5em);
          color: gray;
          font-size: 1.2rem;
        }

        .bottom {
          display: flex;
          margin-top: auto;
          .tags {
            display: flex;
            align-items: center;
            font-size: 1.2rem;

            li {
              color: #638aff;
              &::before {
                content: "#";
              }
              position: relative;
              margin-right: 0.8rem;
            }
          }

          .created {
            margin-left: auto;
            font-size: 1.2rem;
            color: gray;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .list-wrapper {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
@keyframes skeleton {
  from {
    left: -50%;
  }
  to {
    left: 150%;
  }
}
</style>
