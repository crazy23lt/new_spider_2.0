const User = require("../model/users");
module.exports = async (req, res) => {
  const { _id } = req.body;
  try {
    let searchRet = await User.findById(_id, {
      username: 1,
      role: 1,
      useremail: 1,
    });
    if (searchRet)
      res.status(200).json({ data: searchRet, msg: "获取用户信息成功" });
    else res.status(202).json({ data: null, msg: "查无此人" });
  } catch (e) {
    console.info(e);
    res.status(500).json({ data: null, msg: "服务器错误" });
  }
};
