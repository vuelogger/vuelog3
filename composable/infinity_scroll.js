import { onMounted } from "vue";

export async function infinityScroll(apiURL, startCursor, body = {}) {
  const list = ref([]);
  const refs = ref(null);

  const observeLastItem = (io, items) => {
    if (items == null || items.length == 0) return;

    if (items[0].$el) {
      items = items.map((r) => r.$el);
    }
    const lastItem = items[items.length - 1];
    io.observe(lastItem);
  };

  const request = async function () {
    if (startCursor.value !== undefined) {
      body.startCursor = startCursor.value;
    }
    return await useFetch(apiURL, {
      method: "post",
      body,
    });
  };

  onMounted(() => {
    const io = new IntersectionObserver(
      async (entries, io) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            io.unobserve(entry.target);

            const { data } = await request();

            // list 값이 객체에 있어야함
            if (data.value.list) {
              list.value.push(...data.value.list);
              startCursor.value = data.value.startCursor;
              console.log(startCursor.value);

              observeLastItem(io, refs.value);
            }
          }
        }
      },
      { threshold: 0.7 }
    );

    observeLastItem(io, refs.value);
  });

  const { data } = await request();
  list.value = data.value.list;
  startCursor.value = data.value.startCursor;

  return { list, refs };
}
