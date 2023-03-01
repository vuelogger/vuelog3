<template>
  <div class="blog-diary">
    <h1>My Blog Diary</h1>
    <ul>
      <li v-for="d of list" :key="d.title" ref="refs">
        <div class="created">
          {{ dateToStr(d.created, "YYYY. MM. DD") }}
        </div>
        <h3>{{ d.title }}</h3>
        <img v-if="d.image" :src="d.image" />
        <p>{{ d.content }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { dateToStr } from "@/src/util";

let startCursor = undefined;
const list = ref([]);
const refs = ref(null);

const request = async function () {
  const { data } = await useFetch("/api/diary", {
    method: "post",
    body: { startCursor },
  });

  if (data.value?.list?.length > 0) {
    list.value.push(...data.value.list);
  }

  startCursor = data.value.startCursor;
};

await request();

onMounted(() => {
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
              io.observe(refs.value[refs.value.length - 1]);
            }
          }
        }
      }
    },
    { threshold: 0.7 }
  );

  if (refs.value.length > 0) {
    io.observe(refs.value[refs.value.length - 1]);
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base/mixins.scss";
.blog-diary {
  background-color: #222;
  height: fit-content;
  color: white;
  min-height: 100%;
  width: 100%;
  padding: 5rem 3rem;
  box-sizing: border-box;
  h1 {
    font-size: 4rem;
    line-height: 1.4;
  }

  ul {
    font-size: 1.6rem;
    margin-left: 1rem;
    padding-left: 2rem;
    border-left: 2px solid white;
    li {
      margin-top: 4rem;
      .created {
        font-size: 0.8em;
        color: darkgray;
      }
      h3 {
        position: relative;
        font-size: 1.1em;
        margin-top: 1rem;
        color: wheat;

        &::before {
          content: "";
          position: absolute;
          top: 50%;
          right: calc(100% + 2rem + 1px);
          width: 1rem;
          height: 1rem;
          background-color: white;
          transform: translate(50%, -50%);
          border-radius: 50%;
        }
      }
      img {
        width: 100%;
        border-radius: 1rem;
        margin-top: 2rem;
      }
      p {
        margin-top: 0.8rem;
        font-size: 0.85em;
        line-break: anywhere;
        color: lightgray;
        line-height: 1.8;
      }
    }
  }
}
</style>
