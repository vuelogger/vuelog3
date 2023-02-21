const ioCallback = (entries, io) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      io.unobserve(entry.target);
      loadingStart();
      setTimeout(() => {
        addNewContent();
        loadingFinish();
        observeLastItem(io, document.querySelectorAll(".card"));
      }, 2000);
    }
  });
};

export const observeLastItem = (io, items) => {
  const lastItem = items[items.length - 1];
  io.observe(lastItem);
};

const io = new IntersectionObserver(ioCallback, { threshold: 0.7 });
