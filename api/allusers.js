const User = require("../model/users");
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
    res
      .status(200)
      .json({ data: { users, userCount }, msg: "获取用户信息成功" });
  } catch (e) {
    console.info(e);
    res.status(500).json({ data: null, msg: "服务器错误" });
  }
};
