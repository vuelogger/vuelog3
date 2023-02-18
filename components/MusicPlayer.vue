<template>
  <div class="music-player">
    <div class="controls" v-show="ready">
      <img
        class="controls__btn"
        @click="prev"
        src="@/assets/images/prev.svg"
        alt="prev"
      />
      <img
        class="controls__btn pause"
        v-show="playing"
        src="@/assets/images/pause.svg"
        alt="pause"
        @click="pause"
      />
      <img
        class="controls__btn play"
        v-show="!playing"
        src="@/assets/images/play.svg"
        alt="play"
        @click="play"
      />
      <img
        class="controls__btn"
        @click="next"
        src="@/assets/images/next.svg"
        alt="next"
      />
      <div class="volume" v-if="ready">
        <div class="btn" @click.stop="showSlider = !showSlider">
          <img src="@/assets/images/volume-mute.svg" v-show="volume == 0" />
          <img
            src="@/assets/images/volume-min.svg"
            v-show="0 < volume && volume < 33"
          />
          <img
            src="@/assets/images/volume-mid.svg"
            v-show="33 <= volume && volume < 66"
          />
          <img
            src="@/assets/images/volume-max.svg"
            v-show="66 <= volume && volume <= 100"
          />
        </div>
        <Slider v-model="volume" v-show="showSlider" @click.self.stop />
      </div>
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
let player = null;
const volume = ref(20);
const playing = ref(false);
const ready = ref(false);
const showSlider = ref(false);

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

watch(volume, () => {
  player.setVolume(parseInt(volume.value));
});

const onPlayerReady = function (event) {
  ready.value = true;
  event.target.setPlaybackQuality(event.target.getAvailablePlaybackRates()[0]);
};

onMounted(() => {
  const tag = document.createElement("script");

  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

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
        list: "PLWTycz4el4t7ZCxkGYyekoP1iBxmOM4zZ",
        // list: "PLJWTWXJ7iqXctxVu1Fd3ZkF-WWD8kOzMb",
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  };
  window.addEventListener("click", () => {
    showSlider.value = false;
  });
});
</script>

<style lang="scss">
@import "@/assets/scss/base/variable.scss";

.music-player {
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: 2.5rem;
  .controls {
    display: flex;
    align-items: center;
    column-gap: 2rem;
    height: 100%;
    &__btn {
      height: 40%;
      &.play,
      &.pause {
        transform: scale(1.2);
      }

      &:active {
        opacity: 0.7;
      }
    }

    .volume {
      position: relative;
      display: flex;
      height: 60%;
      .btn {
        height: 100%;
        img {
          height: 100%;
        }
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
    margin-right: 1rem;
    .controls {
      &__btn {
        height: 40%;
      }
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
