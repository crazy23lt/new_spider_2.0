const User = require("../model/users");
module.exports = async (req, res) => {
  const { username, useremail, password, role, _id } = req.body;
  try {
    let ret = await User.findOneAndUpdate(
      { _id: _id },
      {
        username: username,
        useremail: useremail,
        password: password,
        role: role,
      },
      { new: true, select: { password: 0 } }
    );
    if (ret) res.status(200).json({ data: ret, msg: "编辑用户信息成功" });
    else res.status(202).json({ data: null, msg: "编辑用户信息失败" });
  } catch (e) {
    console.info(e);
    res.status(500).json({ data: null, msg: "用户未认证，请求失败" });
  }
};
