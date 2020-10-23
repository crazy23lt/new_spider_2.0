const User = require("../model/users");
const { acesssToken } = require("../plugin/jwt");
module.exports = async (req, res) => {
  const { useremail, password } = req.body;
  try {
    let findUser = await User.findOne({ useremail }, { __v: 0 });
    if (!findUser) {
      res.status(202).json({ data: null, msg: "账号信息无效" });
    } else {
      User.comparePassword(password, findUser.password, (err, docs) => {
        if (!docs) {
          res.status(202).json({ data: null, msg: "密码信息无效" });
        } else {
          res.status(200).json({
            data: {
              token: acesssToken(findUser),
              userInfo: {
                _id: findUser._id,
                username: findUser.username,
                useremail: findUser.useremail,
                role: findUser.role,
              },
            },
            msg: "登陆成功",
          });
        }
      });
    }
  } catch (e) {
    console.info(e);
    res.status(500).json({ data: null, msg: "服务器错误" });
  }
};
