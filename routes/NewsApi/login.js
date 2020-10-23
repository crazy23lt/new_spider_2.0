const User = require("../../model/users");
const { acesssToken } = require("../../plugin/jwt");
module.exports = async (req, res) => {
  const { useremail, password } = req.body;
  try {
    let findUser = await User.findOne({ useremail }, { __v: 0 });
    if (!findUser) {
      res.json({
        data: {},
        meta: {
          msg: "用户信息输入错误",
          status: 201,
        },
      });
    } else {
      User.comparePassword(password, findUser.password, (err, docs) => {
        if (err) {
          res.json({
            data: {},
            meta: {
              msg: "用户信息输入错误",
              status: 201,
            },
          });
        }
        if (docs) {
          console.info(findUser);
          res.json({
            data: {
              token: acesssToken(findUser),
              userInfo: {
                _id: findUser._id,
                username: findUser.username,
                useremail: findUser.useremail,
                role: findUser.role,
              },
            },
            meta: {
              msg: "登陆成功",
              status: 200,
            },
          });
        }
      });
    }
  } catch (e) {
    console.info(e);
    res.json({
      data: {},
      meta: {
        msg: "登陆失败",
        status: 500,
      },
    });
  }
};
