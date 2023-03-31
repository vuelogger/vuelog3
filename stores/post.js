import { defineStore } from "pinia";
export const usePostStore = defineStore("post", {
  state: () => ({
    sidebarActive: false,
    category: [],
    page: null,
    prev: null,
    next: null,
  }),
  actions: {
    openSidebar() {
      this.sidebarActive = true;
    },
    closeSidebar() {
      this.sidebarActive = false;
    },
    toggleSidebar() {
      this.sidebarActive = !this.sidebarActive;
    },
    setCategory(category) {
      this.category = category;
    },
    setPage(data) {
      this.page = data?.page;
      this.prev = data?.prev;
      this.next = data?.next;
    },
  },
});
