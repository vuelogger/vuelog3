import { defineStore } from "pinia";
export const usePostStore = defineStore("post", {
  state: () => ({
    sidebarActive: false,
    category: [],
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
  },
});
