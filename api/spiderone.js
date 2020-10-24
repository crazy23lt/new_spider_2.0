module.exports = (req, res) => {
  try {
    res.status(200).json({ data: null, msg: "爬虫运行成功" });
  } catch (e) {
    console.info(e);
    res.status(500).json({ data: null, msg: "服务器错误" });
  }
};
