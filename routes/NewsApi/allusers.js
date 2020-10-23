const User = require("../../model/users");
module.exports = async (req, res) => {
  const { pagenum, pagesize } = req.body;
  try {
    let userCount = await User.find().countDocuments();
    let users = null;
    if (pagesize === "undefined") {
      users = await User.find({}, { role: 1, username: 1 });
    } else {
      users = await User.find({}, { role: 1, username: 1 })
        .limit(pagesize - 0)
        .skip((pagenum - 1) * pagesize);
    }
    res.json({
      data: {
        users,
        userCount,
      },
      meta: {
        msg: "获取用户信息成功",
        status: 200,
      },
    });
  } catch (e) {
    console.info(e);
    res.json({
      data: null,
      meta: {
        msg: "获取全部用户信息失败",
        status: 500,
      },
    });
  }
};
