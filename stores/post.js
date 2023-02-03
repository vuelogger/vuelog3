import { defineStore } from "pinia";
export const usePostStore = defineStore("post", {
  state: () => ({
    sidebar: {
      active: false,
    },
  }),
  actions: {
    openSidebar() {
      this.sidebar.active = true;
    },
    closeSidebar() {
      this.sidebar.active = false;
    },
    toggleSidebar() {
      this.sidebar.active = !this.sidebar.active;
    },
  },
});
