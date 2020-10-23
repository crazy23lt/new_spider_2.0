const User = require("../model/users");
const { acesssToken } = require("../plugin/jwt");
module.exports = async (req, res) => {
  const { username, password, useremail } = req.body;
  try {
    let findUser = await User.findOne({ username: username });
    if (findUser) {
      res.status(422).json({ data: null, msg: "注册用户失败,角色名重复！" });
    } else {
      let addUser = await new User({ username, password, useremail }).save();
      if (addUser) {
        let userinfo = await User.findOne(
          { useremail },
          { __v: 0, ctime: 0 },
          { lean: true }
        );
        res.status(200).json({
          data: {
            token: acesssToken(userinfo),
            userinfo,
          },
          msg: "注册用户成功!",
        });
      }
    }
  } catch (e) {
    console.info(e);
    res.status(500).json({ data: null, msg: "服务器错误" });
  }
};
