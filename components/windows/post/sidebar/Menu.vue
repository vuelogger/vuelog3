<template>
  <ul>
    <li v-for="c of category" :key="c.link">
      <NuxtLink :to="`/post/${c.link}`" @click="closeSidebar">
        <div class="icon">
          <img :src="`/images/apps/post/${c.name}.svg`" />
        </div>
        <span class="text">{{ c.name }}</span>
        <img
          class="arrow"
          src="@/assets/images/windows/post/sidebar/right-arrow.svg"
        />
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup>
import { usePostStore } from "@/stores/post";

const { closeSidebar } = usePostStore();
const { category } = defineProps(["category"]);
</script>

<style lang="scss" scoped>
ul {
  margin-top: 3rem;
  li {
    a {
      position: relative;
      display: flex;
      align-items: center;
      height: 4rem;
      font-size: 1.4rem;
      margin-bottom: 0.2rem;
      border-radius: 4px;
      padding: 0.3rem 1rem;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
        border-radius: 4px;
        transition: all 0.5s;
      }

      &:hover {
        position: relative;

        &::before {
          width: 100%;
          background-color: #dee6ff96;
        }

        .icon {
          position: relative;
          background-color: #dee6ff96;
          img {
            transform: scale(1.3);
            opacity: 1;
          }
        }
        .text {
          transform: scale(1.2) translateX(5px);
          color: #6888ff;
        }
        .arrow {
          color: #6888ff;
          transform: scale(1.2);
          animation: bounceX 0.5s infinite alternate;
        }
      }

      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80%;
        aspect-ratio: 1;
        border-radius: 50%;
        background-color: #eee;
        margin-right: 1.5rem;

        img {
          height: 50%;
          object-fit: contain;
          opacity: 0.4;
          transition: all 0.2s;
        }
      }
      .text {
        transition: all 0.2s;
      }
      .arrow {
        margin-left: auto;
        padding: 0 1rem;
      }
    }
  }
}

@keyframes bounceX {
  from {
    transform: translate(-3px);
  }
  to {
    transform: translate(3px);
  }
}
</style>
