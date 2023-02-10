import { defineStore } from "pinia";
export const usePostStore = defineStore("post", {
  state: () => ({
    sidebarActive: false,
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
  },
});
