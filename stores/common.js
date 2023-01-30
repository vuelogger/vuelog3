import { defineStore } from "pinia";

export const useCommonStore = defineStore("common", {
  state: () => ({
    dockInfo: {
      active: false,
    },
  }),
  actions: {
    toggleDock() {
      this.dockInfo.active = !this.dockInfo.active;
    },
    closeDock() {
      this.dockInfo.active = false;
    },
    openDock() {
      this.dockInfo.active = true;
    },
  },
});
