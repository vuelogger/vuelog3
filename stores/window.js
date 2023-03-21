import { defineStore } from "pinia";

const windowOpts = {
  Post: {
    w: 800,
    h: 800,
    minW: 300,
    minH: 400,
  },
  Twitter: {
    w: 400,
    h: 800,
    minW: 300,
    minH: 500,
  },
  Book: {
    w: 800,
    h: 800,
    minW: 300,
    minH: 400,
  },
  GuestBook: {
    w: 400,
    h: 600,
    minW: 300,
    minH: 500,
  },
  BlogDiary: {
    w: 500,
    h: 800,
    minW: 300,
    minH: 500,
  },
};
export const windowNames = Object.keys(windowOpts);

export const useWindowStore = defineStore("window", {
  state: () => ({
    loadedWindows: [],
    headerHeight: 50,
    // TODO: 62와 30 값을 변화에 맞춰 가져올 방법을 연구해야겠다.
    boundary: { x: 62, y: 30 },
    // TODO: window의 테두리에서 마우스 오차
    resizeScope: 8,
    cacheRects: {},
  }),
  getters: {
    loadedWindowNum() {
      return this.loadedWindows.length;
    },
    showingWindows() {
      return this.loadedWindows.filter((w) => !w.minimized);
    },
    topWindow() {
      if (this.loadedWindowNum > 0) {
        return this.loadedWindows[this.loadedWindowNum - 1];
      } else {
        return null;
      }
    },
    loadedWindowNames() {
      const result = [];
      for (const w of this.loadedWindows) {
        result.push(w.name);
      }
      return result;
    },
  },
  actions: {
    openWindow(name) {
      // 정해놓은 widnow에 포함되어 있고
      if (windowNames.includes(name)) {
        // 존재하지 않는다면 추가
        if (!this.loadedWindowNames.includes(name)) {
          this.loadedWindows.push({
            name,
            ...this.boundary,
            ...windowOpts[name],
            minimized: false,
          });

          // 현재 윈도우 위치 caching...
          this.cacheRects[this.topWindow.name] = {
            ...this.boundary,
            w: windowOpts[name].w,
            h: windowOpts[name].h,
          };
        } else {
          // 이미 존재한다면 minimize 해제하고 최상단으로
          let idx = null;
          for (let i = 0; i < this.loadedWindowNum; i++) {
            if (this.loadedWindows[i].name == name) {
              this.loadedWindows[i].minimized = false;
              idx = i;
            }
          }
          this.loadedWindows.push(this.loadedWindows.splice(idx, 1)[0]);
        }
      }
    },
    closeAllWindows() {
      this.loadedWindows = [];
    },
    checkIsInside(window, pt) {
      return (
        window.x - this.resizeScope < pt.x &&
        pt.x < window.x + window.w + this.resizeScope &&
        window.y - this.resizeScope < pt.y &&
        pt.y < window.y + window.h + this.resizeScope
      );
    },
    getTopWindowIdx(pt) {
      let result = -1;
      for (let i = 0; i < this.loadedWindowNum; i++) {
        const w = this.loadedWindows[i];
        if (this.checkIsInside(w, pt) && !w.minimized) {
          result = i;
        }
      }
      return result;
    },
    getTopWindowMode(pt) {
      let result = null;

      const idx = this.getTopWindowIdx(pt);
      if (idx < 0) return;

      let { x, y } = pt;
      const w = this.loadedWindows[idx];
      const isLeft = Math.abs(x - w.x) < this.resizeScope;
      const isRight = Math.abs(x - (w.x + w.w)) < this.resizeScope;
      const isTop = Math.abs(y - w.y) < this.resizeScope;
      const isBottom = Math.abs(y - (w.y + w.h)) < this.resizeScope;

      if (this.checkIsInside(w, pt)) {
        if (isLeft && isTop) {
          result = "resize-tl";
        } else if (isRight && isTop) {
          result = "resize-tr";
        } else if (isLeft && isBottom) {
          result = "resize-bl";
        } else if (isRight && isBottom) {
          result = "resize-br";
        } else if (isTop) {
          result = "resize-t";
        } else if (isLeft) {
          result = "resize-l";
        } else if (isRight) {
          result = "resize-r";
        } else if (isBottom) {
          result = "resize-b";
        } else if (y < w.y + this.headerHeight) {
          result = "move";
        } else {
          result = "in";
        }
      }
      return result;
    },
    setTopWindowOf(pt) {
      this.loadedWindows.push(
        this.loadedWindows.splice(this.getTopWindowIdx(pt), 1)[0]
      );
    },
    isMaximized() {
      const { x, y, w, h } = this.topWindow;
      const bx = this.boundary.x;
      const by = this.boundary.y;
      return (
        x === bx &&
        y === by &&
        w === window.innerWidth - bx &&
        h === window.innerHeight - by
      );
    },
    close(name) {
      for (let i = 0; i < this.loadedWindowNum; i++) {
        if (this.loadedWindowNames[i] == name) {
          this.loadedWindows.splice(i, 1);
        }
      }
    },
    minimize(name) {
      for (const w of this.loadedWindows) {
        if (w.name === name) {
          w.minimized = true;
        }
      }
    },
    maximize() {
      if (this.isMaximized()) {
        const { x, y, w, h } = this.cacheRects[this.topWindow.name];
        this.updateTopRect(x, y, w, h, false);
      } else {
        this.updateTopRect(
          this.boundary.x,
          this.boundary.y,
          window.innerWidth - this.boundary.x,
          window.innerHeight - this.boundary.y,
          false
        );
      }
    },
    updateTopRect(x, y, w, h, caching = true) {
      this.topWindow.x = x;
      this.topWindow.y = y;
      this.topWindow.w = w;
      this.topWindow.h = h;
      if (caching) {
        this.cacheRects[this.topWindow.name] = { x, y, w, h };
      }
    },
    getCursorOf(pt) {
      const mode = this.getTopWindowMode(pt);
      if (!mode) return;

      // in
      if (mode == "resize-tl" || mode == "resize-br") {
        return "nwse-resize";
      } else if (mode == "resize-tr" || mode == "resize-bl") {
        return "nesw-resize";
      } else if (mode == "resize-t" || mode == "resize-b") {
        return "ns-resize";
      } else if (mode == "resize-r" || mode == "resize-l") {
        return "ew-resize";
      } else {
        return "auto";
      }
    },
    resize(pt, pos) {
      const nx = pt.x;
      const ny = pt.y;

      let x = this.topWindow.x;
      let y = this.topWindow.y;
      let w = this.topWindow.w;
      let h = this.topWindow.h;

      let l = this.topWindow.x;
      let r = this.topWindow.x + this.topWindow.w;
      let t = this.topWindow.y;
      let b = this.topWindow.y + this.topWindow.h;

      let minW = this.topWindow.minW;
      let minH = this.topWindow.minH;

      if (pos === "resize-tl") {
        if (minW < r - nx) {
          x = nx;
          w = r - nx;
        }
        if (minH < b - ny) {
          y = ny;
          h = b - ny;
        }
      } else if (pos === "resize-tr") {
        if (minH < b - ny) {
          y = ny;
          h = b - ny;
        }
        if (minW < nx - l) {
          w = nx - l;
        }
      } else if (pos === "resize-bl") {
        if (minW < r - nx) {
          x = nx;
          w = r - nx;
        }
        if (minH < ny - t) {
          h = ny - t;
        }
      } else if (pos === "resize-br") {
        if (minW < nx - l) {
          w = nx - l;
        }
        if (minH < ny - t) {
          h = ny - t;
        }
      } else if (pos === "resize-t") {
        if (minH < b - ny) {
          y = ny;
          h = b - ny;
        }
      } else if (pos === "resize-b") {
        if (minH < ny - t) {
          h = ny - t;
        }
      } else if (pos === "resize-l") {
        if (minW < r - nx) {
          x = nx;
          w = r - nx;
        }
      } else if (pos === "resize-r") {
        if (minW < nx - l) {
          w = nx - l;
        }
      }

      this.updateTopRect(x, y, w, h);
    },
    move(startPt, endPt) {
      let newX = this.topWindow.x + (endPt.x - startPt.x);
      let newY = this.topWindow.y + (endPt.y - startPt.y);

      if (newY < this.boundary.y) {
        newY = this.boundary.y;
      }

      this.updateTopRect(newX, newY, this.topWindow.w, this.topWindow.h);
    },
  },
});
