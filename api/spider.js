const {
  NBA_NEWS,
  STOCK_NEWS,
  MANX_TT,
  GLOBAL_NEWS,
} = require("../plugin/py_test_lt");
module.exports = async (req, res) => {
  try {
    await STOCK_NEWS();
    await GLOBAL_NEWS();
    await MANX_TT();
    await NBA_NEWS();
    res.status(200).json({ data: null, msg: "爬虫启动成功" });
  } catch (e) {
    console.info(e);
    res.status(500).json({ data: null, msg: "服务器错误" });
  }
};
