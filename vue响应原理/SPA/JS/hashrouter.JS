// hashrouter.js
class HashRouter {
  constructor() {
    // 储存各个路由对应回调方法
    this.routers = {};
  }
  // 注册理由
  registry(hash, callback = () => {}) {
    this.routers[hash] = callback;
  }
  // 刷新
  refresh() {
    // 没有hash 默认 /
    const hash = location.hash.slice(1) || "/";
    if (this.routers.hasOwnProperty(hash)) {
      this.routers[hash]();
    } else {
      // 这里匹配不到hash的话,可以自定义一个404界面
      this.routers["/not-found"]();
    }
  }
  // 初始化
  init() {
    window.addEventListener("load", this.refresh.bind(this));
    window.addEventListener("hashchange", this.refresh.bind(this));
  }
}
