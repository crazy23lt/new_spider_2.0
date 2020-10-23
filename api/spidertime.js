const { spider_home } = require("../plugin/spiderRun");
module.exports = (req, res) => {
  const { timeinterval = 3 } = req.body;
  try {
    spider_home.forEach((value, key) => {
      if (key.timer) {
        clearInterval(key.timer);
      }
      let TimeMachine = setInterval(key.fn, timeinterval * 1000 * 3600);
      key.timer = TimeMachine;
    });
    res.json({
      data: {},
      meta: {
        msg: "设置时间间隔成功",
        status: 200,
      },
    });
  } catch (e) {
    console.info(e);
    res.json({
      data: {},
      meta: {
        msg: "设置时间间隔失败",
        status: 500,
      },
    });
  }
};
