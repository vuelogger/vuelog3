<template>
  <div class="twitter">
    <div class="header" v-if="userData">
      <img :src="userData.banner" class="banner" />
      <img
        :src="userData.profile.replace('normal', '400x400')"
        class="profile"
      />
      <h3>{{ userData.name }}</h3>
      <h4>#{{ userData.id }}</h4>
      <p class="desc" v-html="userData.description"></p>

      <ul class="info">
        <li>
          <p class="num">{{ userData.followers }}</p>
          <p>Follower</p>
        </li>
        <li>
          <p class="num">{{ userData.followings }}</p>
          <p>Followings</p>
        </li>
        <li>
          <p class="num">{{ userData.favorites }}</p>
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
        href="https://twitter.com/Vuelogger?ref_src=twsrc%5Etfw"
      ></a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: null,
      loaded: false,
    };
  },
  fetch() {
    this.$axios.$get("/api/tweet/user").then(
      function (data) {
        this.userData = data;
        this.userData.description = this.userData.description.replace(
          /#[^\s#]+/gi,
          function (tag) {
            return `<strong>${tag}</strong>`;
          }
        );
      }.bind(this)
    );
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
    self = this;
    twttr.ready(function (twttr) {
      // At this point the widget.js file had been loaded.
      // We can now make use of the twttr events
      twttr.events.bind("rendered", function (event) {
        // At this point the tweet as been fully loaded
        // and rendered and you we can proceed with our Javascript
        self.loaded = true;
      });
    });
  },
  mounted() {
    if (twttr.widgets) {
      twttr.widgets.load();
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/base/mixins.scss";
.twitter {
  background-color: #222;
  color: white;

  .header {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 3rem;
    background-color: #222;

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

    h4 {
      font-size: 1.4rem;
      background-color: #55a5ff;
      padding: 0.3em 0.8em;
      margin-top: 1.5rem;
      border-radius: 1rem;
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
  .body {
    position: relative;
    z-index: 0;
    padding: 0 2rem 2rem 2rem;
    box-sizing: border-box;

    background-color: #222;

    .loading {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      z-index: -1;
      background-color: #222;

      li {
        display: flex;
        border: 1px solid gray;
        padding: 1.5rem;
        border-radius: 0.6rem;
        margin-bottom: 1.5rem;
        .img {
          width: 5rem;
          height: 5rem;
          border-radius: 50%;
        }
        .text {
          flex: 1;
          margin-left: 1rem;
          .content {
            p {
              width: 100%;
              height: 1.5rem;
              margin-bottom: 1rem;

              &:last-child {
                width: 80%;
              }
            }
          }
          .bottom {
            width: 20%;
            margin-top: 2rem;
            height: 1.5rem;
            @include skeletonLoading;
          }
        }
      }
    }
  }
}
</style>
