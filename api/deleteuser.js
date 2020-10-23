const User = require("../model/users");
module.exports = async (req, res) => {
  const { _id } = req.body;
  try {
    let ret = await User.findOneAndRemove({ _id });
    if (ret) res.status(200).json({ data: null, msg: "删除用户操作成功" });
    else res.status(202).json({ data: null, msg: "删除用户操作失败" });
  } catch (e) {
    console.info(e);
    res.status(500).json({ data: null, msg: "服务器错误" });
  }
};
