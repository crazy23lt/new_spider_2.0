const news = require("../../model/news");
module.exports = async (req, res) => {
  const { pagenum = 1, pagesize = 20 } = req.query;
  try {
    let newsCount = await news.count();
    let newsSize = await news
      .find({}, { _id: 0, __v: 0, img: 0, context: 0 })
      .limit(pagesize - 0)
      .skip((pagenum - 1) * pagesize);
    res.json({
      data: { newsSize, newsCount },
      meta: {
        msg: "获取全部新闻",
        status: 200,
      },
    });
  } catch (e) {
    console.info(e);
    res.json({
      data: null,
      meta: {
        msg: "获取数据失败",
        status: 500,
      },
    });
  }
};
