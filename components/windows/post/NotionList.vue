<template>
  <div class="list-wrapper">
    <nav class="list">
      <NuxtLink
        :to="goTo(item)"
        v-for="item of list"
        :key="item.number"
        class="item"
      >
        <div class="head" v-if="item.cover">
          <img class="cover" :src="item.cover" alt="item.title" />
        </div>
        <div class="body">
          <div class="category" :class="item.category.toLowerCase()">
            {{ item.category }}
          </div>
          <div class="title">{{ item.title }}</div>
          <div class="desc">{{ item.description }}</div>
          <div class="bottom">
            <ul class="tags">
              <li v-for="t of item.tags" :key="t">
                {{ t }}
              </li>
            </ul>

            <p class="created">{{ format(item.created) }}</p>
          </div>
        </div>
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
const { category } = defineProps(["category"]);

const route = useRoute();
const list = ref([]);

const request = function () {
  list.value = [];
  let categoryName = "All";
  for (const c of category) {
    if (c.link === route.params.category) {
      categoryName = c.name;
      break;
    }
  }

  useFetch("/api/table", {
    method: "post",
    body: { category: categoryName },
  }).then(({ data }) => {
    list.value = data.value.list;
  });
};

watch(route, request, { immediate: true });

const goTo = (item) => `/post/${item.category.toLowerCase()}/${item.id}`;
const format = (date) => dayjs(date).format("YYYY.MM.DD");
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base/variable.scss";
@import "@/assets/scss/base/mixins.scss";
.list-wrapper {
  padding: 2rem;
  .list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    width: 1024px;
    max-width: 100%;
    gap: 3rem 2rem;
    margin: 0 auto;
    .item {
      border-radius: 1rem;
      overflow: hidden;
      box-shadow: 2px 2px 2px lightgray;
      border: 1px solid lightgray;
      transition: all 0.3s;
      &:hover {
        transform: translate(-5px, -10px);
        box-shadow: 2px 2px 5px 2px gray;

        .head {
          img {
            transform: scale(1.2);
          }
        }
        .body {
          .title {
            text-decoration: underline;
          }
        }
      }
      .head {
        width: 100%;
        height: 50%;
        overflow: hidden;
        aspect-ratio: 1 / 0.7;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
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
          font-size: 1.3rem;
          border-radius: 0.7rem;
          position: absolute;
          top: 0;
          transform: translateY(-50%);
          padding: 0.6rem 1rem;
          box-shadow: 0px 0px 0px 4px white;
          font-weight: bold;
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
            font-size: 1.1rem;

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
            font-size: 1.1rem;
            color: gray;
          }
        }
      }
    }
  }
}
</style>
