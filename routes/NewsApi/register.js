const User = require("../../model/users");
const { acesssToken } = require("../../plugin/jwt");
module.exports = async (req, res) => {
  const { username, password, useremail } = req.body;
  try {
    let findUser = await User.findOne({ username: username });
    if (findUser) {
      res.json({
        data: {},
        meta: {
          msg: "注册用户失败,角色名重复！",
          status: 201,
        },
      });
    } else {
      let addUser = await new User({ username, password, useremail }).save();
      if (addUser) {
        let userinfo = await User.findOne(
          { useremail },
          { __v: 0, ctime: 0 },
          { lean: true }
        );
        res.json({
          data: {
            token: acesssToken(userinfo),
            userinfo,
          },
          meta: {
            msg: "注册用户成功!",
            status: 200,
          },
        });
      }
    }
  } catch (e) {
    console.info(e);
    res.json({
      data: {},
      meta: {
        msg: "注册用户失败",
        status: 500,
      },
    });
  }
};
