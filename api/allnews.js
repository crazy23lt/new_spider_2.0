const news = require("../model/news");
module.exports = async (req, res) => {
  const { pagenum = 1, pagesize = 20 } = req.query;
  try {
    let newsCount = await news.count();
    let newsSize = await news
      .find({}, { _id: 0, __v: 0, img: 0, context: 0 })
      .limit(pagesize - 0)
      .skip((pagenum - 1) * pagesize);
    res
      .status(200)
      .json({ data: { newsSize, newsCount }, msg: "获取用户信息成功" });
  } catch (e) {
    console.info(e);
    res.status(500).json({ data: null, msg: "服务器错误" });
  }
};
