<template>
  <div class="music-player">
    <div class="controls">
      <img @click="prev" src="@/assets/images/prev.svg" alt="prev" />
      <img
        class="pause"
        v-show="playing"
        src="@/assets/images/pause.svg"
        alt="pause"
        @click="pause"
      />
      <img
        class="play"
        v-show="!playing"
        src="@/assets/images/play.svg"
        alt="play"
        @click="play"
      />
      <img @click="next" src="@/assets/images/next.svg" alt="next" />
    </div>

    <Transition name="fade">
      <div class="player-wrapper" v-show="playing">
        <div class="container">
          <div class="player" id="player"></div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const playing = ref(false);

function onPlayerReady(event) {
  player.playVideo();
}

function onPlayerStateChange(event) {
  const playerState =
    event.data == YT.PlayerState.ENDED
      ? "종료됨"
      : event.data == YT.PlayerState.PLAYING
      ? "재생 중"
      : event.data == YT.PlayerState.PAUSED
      ? "일시중지 됨"
      : event.data == YT.PlayerState.BUFFERING
      ? "버퍼링 중"
      : event.data == YT.PlayerState.CUED
      ? "재생준비 완료됨"
      : event.data == -1
      ? "시작되지 않음"
      : "예외";

  playing.value = event.data == YT.PlayerState.PLAYING;
  console.log("Youtube 실행", playerState);
}

function play() {
  if (!player) {
    loadYoutubeAPI(true);
  } else {
    player.playVideo();
  }
}

function prev() {
  if (!player) {
    loadYoutubeAPI(true);
  } else {
    player.previousVideo();
  }
}

function pause() {
  if (!player) {
    loadYoutubeAPI(true);
  } else {
    player.pauseVideo();
  }
}

function next() {
  if (!player) {
    loadYoutubeAPI(true);
  } else {
    player.nextVideo();
  }
}

useHead({
  script: [
    {
      src: "https://www.youtube.com/iframe_api",
      defer: true,
    },
  ],
});

let player = null;

// 안되면 이거 실행되게해야함
const loadYoutubeAPI = function (autoplay = false) {
  if (YT && YT.Player) {
    // Youtube API에서 자동 실행하는 함수라서 window 내에 정의해주어야한다.
    player = new YT.Player("player", {
      playerVars: {
        autoplay: 0,
        controls: 0,
        rel: 0,
        playsinline: 1,
        modestbranding: 1,
        frameborder: "no",
        listType: "playlist",
        list: "PLWTycz4el4t7ZCxkGYyekoP1iBxmOM4zZ",
      },
      events: {
        onReady: autoplay ? (e) => e.target.playVideo() : null, // 플레이어 로드가 완료되고 API 호출을 받을 준비가 될 때마다 실행
        onStateChange: onPlayerStateChange, // 플레이어의 상태가 변경될 때마다 실행
      },
    });
  }

  // API load 될 때까지 반복
  let timer = setInterval(() => {
    if (player) {
      clearInterval(timer);
      timer = null;
    }
  }, 300);
};

onMounted(() => {
  if (!player) {
    loadYoutubeAPI(window.innerWidth < 768);
  }
});
</script>

<style lang="scss">
@import "@/assets/scss/base/variable.scss";

.music-player {
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: 1.5rem;
  .controls {
    display: flex;
    column-gap: 2rem;
    height: 45%;
    img {
      height: 100%;
      &.play,
      &.pause {
        transform: scale(1.2);
      }

      &:active {
        opacity: 0.7;
      }
    }
  }
}

.player-wrapper {
  position: fixed;
  top: $header-height;
  left: 0;
  width: 100%;
  height: calc(100% - #{$header-height});
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 60px;
    background-color: black;
    opacity: 0;
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }

  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 100%;
    min-height: 100%;
    aspect-ratio: 16 / 9;

    .player {
      width: 100%;
      height: 100%;
    }
  }
}

@media (max-width: $breakpoint-tablet) {
  .music-player {
    .controls {
      height: 35%;
    }
  }
  .player-wrapper {
    top: $header-height-tablet;
    height: calc(100% - #{$header-height-tablet});
  }
}
.fade-enter-from {
  background-color: black;
  &::before,
  &::after {
    opacity: 0;
  }
}

.fade-enter-to {
  background-color: white;
  &::before,
  &::after {
    opacity: 1;
  }
}

.fade-enter-active {
  transition: all 3s;
}
</style>
