// const { NBA_NEWS, STOCK_NEWS, MANX_TT, GLOBAL_NEWS } = require("./py_test_lt");

const spider_home = new Map();
spider_home.set(
  {
    name: "NBA_NEWS",
    timer: null,
    fn: () => console.info(`NBA_NEWS`),
  },
  false
);
spider_home.set(
  {
    name: "STOCK_NEWS",
    timer: null,
    fn: () => console.info(`STOCK_NEWS`),
  },
  false
);
spider_home.set(
  {
    name: "MANX_TT",
    timer: null,
    fn: () => console.info(`MANX_TT`),
  },
  false
);
spider_home.set(
  {
    name: "GLOBAL_NEWS",
    timer: null,
    fn: () => console.info(`GLOBAL_NEWS`),
  },
  false
);
module.exports = { spider_home };
