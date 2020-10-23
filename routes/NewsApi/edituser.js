const User = require("../../model/users");
module.exports = async (req, res) => {
  const updata = req.body;
  try {
    let ret = await User.findOneAndUpdate(req.username, updata);
    if (ret) {
      res.json({
        data: null,
        meta: {
          msg: "编辑用户信息成功",
          status: 200,
        },
      });
    } else {
      res.json({
        data: null,
        meta: {
          msg: "编辑用户信息失败",
          status: 201,
        },
      });
    }
  } catch (e) {
    console.info(e);
    res.json({
      data: null,
      meta: {
        msg: "编辑用户信息失败",
        status: 500,
      },
    });
  }
};
