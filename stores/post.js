import { defineStore } from "pinia";
export const usePostStore = defineStore("post", {
  state: () => ({
    sidebarActive: false,
    category: {
      "": "All",
      javascript: "Javascript",
      vue: "Vue",
      sidejob: "Sidejob",
      etc: "ETC",
    },
    page: null,
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
    setPage(data) {
      this.page = data;
    },
  },
});
