const User = require("../../model/users");
module.exports = async (req, res) => {
  const { _id } = req.body;
  try {
    let searchRet = User.findById(_id, { username: 1, role: 1, useremail: 1 });
    if (searchRet) {
      res.json({
        data: {
          userInfo: searchRet,
        },
        meta: {
          msg: "获取用户信息成功",
          status: 200,
        },
      });
    } else {
      res.json({
        data: null,
        meta: {
          msg: "查无此人",
          status: 201,
        },
      });
    }
  } catch (e) {
    console.info(e);
    res.json({
      data: {},
      meta: {
        msg: "查询失败",
        status: 500,
      },
    });
  }
};
