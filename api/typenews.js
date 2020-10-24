const news = require("../model/news");
module.exports = async (req, res) => {
  try {
    let typeContent = await news.distinct("type");
    if (typeContent)
      res.status(200).json({ data: { typeContent }, msg: "获取所有爬虫类型" });
    else
      res
        .status(202)
        .json({ data: { typeContent }, msg: "获取爬虫类型操作失败" });
  } catch (e) {
    console.info(e);
    res.status(500).json({ data: null, msg: "服务器错误" });
  }
};
