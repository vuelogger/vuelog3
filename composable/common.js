import { onMounted, onUnmounted } from "vue";

export const getPt = function (event) {
  return { x: event.clientX, y: event.clientY };
};

export function registerEvent(target, event, callback) {
  onMounted(() => {
    if (target === "window") {
      target = window;
    }
    target.addEventListener(event, callback);
  });

  onUnmounted(() => {
    if (target === "window") {
      target = window;
    }
    target.addEventListener(event, callback);
  });
}
