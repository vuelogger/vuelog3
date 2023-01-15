<template>
  <p>{{ dateStr }}</p>
</template>

<script setup>
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

const { format, time, updatePeriod } = defineProps({
  format: {
    type: String,
    required: true,
  },
  time: {
    type: String, // 값이 없을 경우 현재 시간 표시
  },
  updatePeriod: {
    type: Number,
    default: 1000 * 60,
  },
});

const datetime = ref(dayjs(time));
const dateStr = computed(() => datetime.value.format(format));

onMounted(() => {
  if (!time) {
    setInterval(() => {
      datetime.value = dayjs(time);
    }, updatePeriod);
  }
});
</script>
