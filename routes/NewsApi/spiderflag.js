module.exports = (req, res) => {
  try {
    res.json({
      data: null,
      meta: {
        msg: "设置媒体爬取flag接口待开发完",
        status: 200,
      },
    });
  } catch (e) {
    console.info(e);
    res.json({
      data: null,
      meta: {
        msg: "设置媒体爬取flag失败",
        status: 500,
      },
    });
  }
};
