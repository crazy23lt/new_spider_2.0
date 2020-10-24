const news = require("../model/news");
const tc = require("../utils/time");
module.exports = async (req, res) => {
  const { leftvalue, rightvalue } = tc();
  try {
    let newsCount = await news.countDocuments({
      ctime: { $gte: leftvalue, $lt: rightvalue },
    });
    res.status(200).json({ data: newsCount, msg: "获取当日新闻数量" });
  } catch (e) {
    console.info(e);
    res.status(500).json({ data: null, msg: "服务器错误" });
  }
};
