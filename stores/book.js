import { defineStore } from "pinia";
export const useBookStore = defineStore("book", {
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
