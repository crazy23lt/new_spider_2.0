const { MANX_TT } = require("./py_test_lt");
//STOCK_NEWS, NBA_NEWS, GLOBAL_NEWS
/**
 * 爬虫功能需求
 *  1. 一键启动所有爬虫
 *  2. 单独启动爬虫
 */

// class EventEmitter {
//   constructor() {
//     this.subs = Object.create(null);
//   }
//   $on(eventType, handler) {
//     this.subs[eventType] = this.subs[eventType] || new Map();
//     this.subs[eventType].set(handler, true);
//   }
//   $emit(eventType) {
//     if (this.subs[eventType]) {
//       this.subs[eventType].forEach(async (flag, handler) => {
//         if (flag) {
//           await handler();
//         }
//       });
//     }
//   }
//   $changeFlag(eventType, handler) {
//     if (this.subs[eventType]) {
//       let newFlag = this.subs[eventType].get(handler);
//       this.subs[eventType].set(handler, !newFlag);
//     }
//   }
// }
const EventEmitter = function () {
  this.subs = Object.create(null);
};
EventEmitter.prototype.$on = function (eventType, handler) {
  this.subs[eventType] = this.subs[eventType] || new Map();
  this.subs[eventType].set(handler, true);
};
EventEmitter.prototype.$emit = async function (eventType) {
  if (this.subs[eventType]) {
    this.subs[eventType].forEach(async (flag, handler) => {
      if (flag) {
        await handler();
      }
    });
  }
};
EventEmitter.prototype.$changeFlag = function (eventType, handler) {
  if (this.subs[eventType]) {
    let newFlag = this.subs[eventType].get(handler);
    this.subs[eventType].set(handler, !newFlag);
  }
};

const em = new EventEmitter();
// 订阅 爬虫 函数
em.$on("spider", MANX_TT);
// 改变爬虫状态
// em.$changeFlag("spider", MANX_TT);
// 发布 爬虫 事件
// em.$emit("spider");
module.exports = em;
