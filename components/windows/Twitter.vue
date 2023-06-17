<template>
  <div class="twitter-wrapper" v-if="loaded">
    <div class="head" v-if="user">
      <img :src="user.banner" class="banner" />
      <img :src="user.profile.replace('normal', '400x400')" class="profile" />
      <h3>{{ user.name }}</h3>
      <a class="id" href="https://twitter.com/BlogCreator6109" target="_blank"
        >#{{ user.id }}</a
      >
      <p class="desc" v-html="user.description"></p>

      <ul class="info">
        <li>
          <p class="num">{{ user.followers }}</p>
          <p>Follower</p>
        </li>
        <li>
          <p class="num">{{ user.followings }}</p>
          <p>Followings</p>
        </li>
        <li>
          <p class="num">{{ user.favorites }}</p>
          <p>Favorites</p>
        </li>
      </ul>
    </div>
    <div class="body">
      <a
        class="twitter-timeline"
        data-theme="dark"
        data-chrome="transparent nofooter noborders noheader noscrollbar"
        data-safari="transparent nofooter noborders noheader noscrollbar"
        href="https://twitter.com/BlogCreator6109?ref_src=twsrc%5Etfw"
      ></a>
    </div>
  </div>
</template>

<script setup>
const user = ref(null);
const loaded = ref(false);
useFetch("/api/twitter").then(({ data }) => {
  user.value = data.value;
});

onMounted(() => {
  window.twttr = (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0],
      t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function (f) {
      t._e.push(f);
    };

    return t;
  })(document, "script", "twitter-wjs");

  twttr.ready((twttr) => {
    loaded.value = true;
    twttr.widgets.load();
  });
});
</script>

<style lang="scss">
.twitter-wrapper {
  width: 100%;
  height: fit-content;
  min-height: 100%;
  background-color: #262626;
  color: white;

  .head {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 3rem;

    .banner {
      width: 100%;
      padding: 1rem 0;
      background-color: white;
    }

    .profile {
      margin-top: 3rem;
      width: 7rem;
      height: 7rem;
      border-radius: 50%;
    }

    h3 {
      font-size: 2rem;
      color: #eee;
      margin-top: 1.5rem;
    }

    .id {
      font-size: 1.1rem;
      background-color: #55a5ff;
      padding: 0.6em 0.8em;
      margin-top: 1.5rem;
      border-radius: 6px;
    }

    .desc {
      margin-top: 2rem;
      width: 70%;
      font-size: 1.3rem;
      line-height: 1.6;
      color: #ddd;
      text-align: center;
      strong {
        color: #55a5ff;
      }
    }

    .info {
      display: flex;
      width: 80%;
      margin-top: 3rem;
      li {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;

        &:nth-child(2) {
          &::before,
          &::after {
            content: "";
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 1px;
            height: 50%;
            background-color: gray;
          }

          &::before {
            left: 0;
          }
          &::after {
            right: 0;
          }
        }

        p {
          &:first-child {
            font-size: 1.4rem;
          }
          &:nth-child(2) {
            font-size: 1.1rem;
            color: gray;
            margin-top: 0.5rem;
          }
        }
      }
    }
  }
}
</style>
