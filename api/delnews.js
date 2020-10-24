const news = require("../model/news");
module.exports = async (req, res) => {
  const { _id } = req.body;
  try {
    let delResult = await news.findByIdAndRemove(_id);
    if (delResult) res.status(200).json({ data: null, msg: "删除新闻成功" });
    else res.status(202).json({ data: null, msg: "删除操作失败" });
  } catch (e) {
    console.info(e);
    res.status(500).json({ data: null, msg: "服务器错误" });
  }
};
