<template>
  <div class="music-player">
    <div class="controls" v-show="controlShow">
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

    <Teleport to="body">
      <Transition name="fade">
        <div class="player-wrapper" v-show="playing">
          <div class="container">
            <div class="player" id="player"></div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
const controlShow = ref(false);
const playing = ref(false);

function onPlayerReady(event) {
  controlShow.value = true;
  player.setVolume(0);
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

  if (event.data == YT.PlayerState.PLAYING) {
    playing.value = true;
  } else {
    playing.value = false;
  }
  console.log("Youtube 실행:", playerState);
}

function play() {
  console.log("Play", player);
  player.playVideo();
}

function prev() {
  player.previousVideo();
}

function pause() {
  player.pauseVideo();
}

function next() {
  player.nextVideo();
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

const loadAPI = function () {
  // Youtube API에서 자동 실행하는 함수라서 window 내에 정의해주어야한다.
  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player("player", {
      playerVars: {
        autoplay: 0,
        controls: 0,
        rel: 0,
        playsinline: 1,
        modestbranding: 1,
        frameborder: "no",
        listType: "playlist",
        list: "PLCoQT6suevJie39ExqGt05TWnSX7a-TSI",
        // list: "PLLkjM0853NquYZjY8IChj7v-6UpvxLcbw",
        // list: "PLWTycz4el4t7ZCxkGYyekoP1iBxmOM4zZ",
      },
      events: {
        onReady: onPlayerReady, // 플레이어 로드가 완료되고 API 호출을 받을 준비가 될 때마다 실행
        onStateChange: onPlayerStateChange, // 플레이어의 상태가 변경될 때마다 실행
      },
    });
  };
};

onMounted(() => {
  loadAPI();
});
onUpdated(() => {
  loadAPI();
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
  .player-wrapper {
    top: $header-height-tablet;
    height: calc(100% - #{$header-height-tablet});
  }
}
.fade-enter-from {
  color: black;
  &::before,
  &::after {
    opacity: 1;
  }
}

.fade-enter-to {
  color: white;
  &::before,
  &::after {
    opacity: 0;
  }
}

.fade-enter-active {
  transition: all 25s;
  &::before,
  &::after {
    transition: all 25s linear;
  }
}
</style>
