<template>
  <div class="guestbook">
    <header>
      <div class="profile">
        <img src="/images/logo.png" />
      </div>
      <div class="text">
        <p class="admin">VueLogger</p>
        <span class="counter">
          <img src="@/assets/images/profile.svg" />
          <span>2</span>
        </span>
      </div>
    </header>
    <main>
      <section
        v-for="item of list"
        :key="item.id"
        :class="{
          me: item.user.login == currUser,
        }"
        ref="refs"
      >
        <img :src="item.user.avatar_url" alt="user image" />

        <div class="text">
          <p class="name" v-if="item.author_association == 'OWNER'">
            Vuelogger (블로그 주인)
          </p>
          <p class="name" v-else>{{ item.user.login }}</p>
          <p class="body">{{ item.body }}</p>
          <p class="created">
            {{ dayjs(item.created_at).format("YYYY. MM. DD hh:mm A") }}
          </p>
        </div>
      </section>
    </main>

    <footer>
      <textarea
        name="content"
        id="content"
        v-model="content"
        @keydown.enter.exact.prevent="submit"
        @keydown.enter.shift.exact=""
      ></textarea>
      <div class="bottom">
        <button class="logout" @click="logout" v-if="signed">
          <img src="@/assets/images/logout.svg" />
          <span>로그아웃</span>
        </button>

        <button
          v-if="signed"
          class="btn transfer"
          :class="{ active: !isEmpty }"
          @click="submit"
        >
          전송
        </button>
        <a v-else class="btn login" :href="authURL">
          <img src="@/assets/images/github.svg" />
          <span> GitHub으로 로그인 </span>
        </a>
      </div>
    </footer>
  </div>
</template>

<script setup>
import dayjs from "dayjs";

const config = useRuntimeConfig();
const router = useRouter();
router.push({ path: "/guestbook" });

const content = ref("");
const token = ref("");
const list = ref([]);
const refs = ref(null);
const currUser = ref(null);
const authURL = `https://github.com/login/oauth/authorize?client_id=${config.public.github.clientId}`;

let currPage = 1;

const isEmpty = computed(() => {
  return content.value.trim().length == 0;
});
const signed = computed(() => {
  return token.value != null;
});

const logout = function () {
  localStorage.removeItem("vuelog-github-token");
  token.value = null;
};

const getList = async function (page) {
  const { data } = await useFetch("/api/github/list", {
    method: "post",
    body: { token: token.value, page },
  });

  // hasmore
  return data.value;
};

const getUser = async function () {
  const { data } = await useFetch("/api/github/me", {
    method: "post",
    body: { token: token.value },
  });
  if (data.value === false) {
    window.location.assign(authURL);
  } else {
    currUser.value = data.value;
  }
};

const submit = async function () {
  // 로그인 안되어 있으면 로그인하도록
  if (!signed.value) {
    window.location.assign(authURL);
  }
  if (isEmpty.value) return;
  const markdown = content.value;
  content.value = "";
  useFetch("/api/github/send", {
    method: "post",
    body: { markdown, token: token.value },
  }).then(async () => {
    const l = await getList(1);
    list.value.unshift(l[0]);
  });
};

const initIO = () => {
  const io = new IntersectionObserver(
    async (entries, io) => {
      // observe 하고 있는 entry들
      for (const entry of entries) {
        if (entry.isIntersecting) {
          io.unobserve(entry.target);

          // startCursor가 null이면 더이상 가져오지 않는다.
          currPage++;
          const l = await getList(currPage);
          if (l.length > 0) {
            list.value.push(...l);

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
};

onMounted(async () => {
  token.value = localStorage.getItem("vuelog-github-token");
  currPage = 1;
  await getUser();
  const l = await getList(currPage);
  list.value = l;
});

watch(refs, () => {
  initIO();
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base/mixins.scss";
.guestbook {
  background-color: #222;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  header {
    display: flex;
    height: 4.5rem;
    padding: 1rem 2rem;

    .profile {
      width: 4.5rem;
      height: 4.5rem;
      background-color: white;
      padding: 0.5rem;
      border-radius: 1.2rem;
      box-sizing: border-box;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .text {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 1rem;
      .admin {
        color: white;
        margin-top: 0.6rem;
        margin-bottom: 0.4rem;
        font-size: 1.6rem;
      }
      .counter {
        color: #777;
        font-size: 1.2rem;
        img {
          height: 1rem;
          margin-right: 0.3rem;
        }
      }
    }
  }
  main {
    flex: 1;
    color: white;
    overflow-y: auto;
    display: flex;
    flex-direction: column-reverse;
    padding: 2rem 1rem;
    @include scrollTheme(10px);

    section {
      display: flex;
      font-size: 1.5rem;
      margin-top: 2rem;

      img {
        width: 5rem;
        height: 5rem;
        border-radius: 1.5rem;
      }
      .text {
        margin-left: 2rem;
        display: flex;
        flex-direction: column;
        .name {
          color: #aaa;
        }
        .body {
          position: relative;
          width: fit-content;
          margin-top: 0.8rem;
          padding: 1rem;
          background-color: #3a3a3a;
          border-radius: 0.7rem;
          line-height: 1.4;

          &::before {
            content: "";
            position: absolute;
            top: 10px;
            left: -10px;
            border-radius: 4px;
            border-right: 8px solid #3a3a3a;
            border-top: 8px solid #3a3a3a;
            border-bottom: 8px solid transparent;
            border-left: 8px solid transparent;
          }
        }
      }

      .created {
        margin-top: 0.8rem;
        color: gray;
        font-size: 0.7em;
        align-self: flex-end;
        white-space: nowrap;
      }

      &.me {
        flex-direction: row-reverse;
        .text {
          margin-left: 0;
          margin-right: 2rem;
          align-items: flex-end;
          .body {
            background-color: #fbe500;
            color: black;
            &::before {
              left: initial;
              right: -10px;
              border-right: 8px solid transparent;
              border-top: 8px solid #fbe500;
              border-bottom: 8px solid transparent;
              border-left: 8px solid #fbe500;
            }
          }
        }
      }

      &.owner {
        .text {
          .name {
            color: #7c82f9;
          }
        }
      }
    }
  }

  footer {
    position: relative;
    height: 15rem;
    background-color: #292929;
    border: 1px solid #444;
    display: flex;
    flex-direction: column;

    textarea {
      width: 100%;
      flex: 1;
      background-color: transparent;
      color: white;
      font-size: 1.6rem;
      border: none;
      resize: none;
      margin: 1rem 2rem 0 2rem;
      box-sizing: border-box;
      @include scrollTheme(8px, 4px, #444, #666);
    }

    .bottom {
      display: flex;
      align-items: center;
      padding: 1rem 1rem;

      .logout {
        display: flex;
        align-items: center;
        color: white;
        cursor: pointer;
        img {
          height: 1.5rem;
        }
        span {
          font-size: 1.2rem;
          margin-left: 1rem;
        }

        &:hover {
          filter: brightness(0.7);
        }
      }

      .btn {
        margin-left: auto;
        width: fit-content;
        font-size: 1.5rem;
        padding: 0.8rem 1.8rem;
        border-radius: 0.5rem;
        &.transfer {
          background-color: #444;
          color: #888;

          &.active {
            background-color: #fbe500;
            color: #333;
            cursor: pointer;
          }
        }
        &.login {
          background-color: #2da44e;
          color: white;
          display: flex;
          align-items: center;

          img {
            height: 1.6rem;
            margin-right: 0.5rem;
            filter: invert(1);
          }
        }
      }
    }
  }
}
</style>
