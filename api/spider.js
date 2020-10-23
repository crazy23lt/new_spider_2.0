const {
  // NBA_NEWS,
  // STOCK_NEWS,
  MANX_TT,
  // GLOBAL_NEWS,
} = require("../plugin/py_test_lt");

module.exports = (req, res) => {
  // GLOBAL_NEWS();
  // STOCK_NEWS();
  // NBA_NEWS();
  MANX_TT(() => {
    res.json({
      data: {},
      meta: {
        msg: "爬取新闻完成",
        status: 200,
      },
    });
  });
};
