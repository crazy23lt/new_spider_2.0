const User = require("../../model/users");
module.exports = async (req, res) => {
  const { _id } = req.body;
  try {
    let ret = await User.findOneAndRemove({ _id });
    console.info(ret);
    if (ret) {
      res.json({
        data: ret,
        meta: {
          msg: "删除用户操作成功",
          status: 200,
        },
      });
    } else {
      res.json({
        data: ret,
        meta: {
          msg: "删除用户操作失败",
          status: 201,
        },
      });
    }
  } catch (e) {
    console.info(e);
    res.json({
      data: null,
      meta: {
        msg: "删除用户操作失败",
        status: 500,
      },
    });
  }
};
