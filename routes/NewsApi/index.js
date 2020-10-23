const Api = require("express").Router();

const { verifyToken } = require("../../plugin/jwt");
Api.use((req, res, next) => {
  console.info(`originalUrl:${req.originalUrl}:::method:${req.method}`);
  if (req.url === "/login" || req.url === "/register") {
    next();
  } else {
    let token = req.headers.authorization;
    try {
      let { useremail, role, _id } = JSON.parse(verifyToken(token));
      console.info(`{req.body._id}`);
      req.useremail = useremail;
      if (role === "admin") {
        next();
      } else if (req.url === "/edituser" && req.body._id === _id) {
        next();
      } else if (req.url !== "/deleteuser") {
        next();
      } else {
        res.json({
          data: {},
          meta: {
            msg: "用户权限不够终止操作",
            status: 201,
          },
        });
      }
    } catch (error) {
      res.json({
        data: {},
        meta: {
          msg: "请先登录",
          status: 201,
        },
      });
    }
  }
});

/* ---------------- news 集合 需要 token -------------------- */
// 爬取所有新闻
Api.post("/spider", require("./spider"));
// 查询所有新闻
Api.post("/allnews", require("./allnews"));
// 查询所有媒体
Api.post("/allmedia", require("./allmedia"));
// 设置爬取时间间隔
Api.post("/setspidertime", require("./spidertime"));
// 设置媒体爬取
Api.post("/setspiderflag", require("./spiderflag"));

/* ---------------- user 集合 -------------------- */
// 登陆接口
Api.post("/login", require("./login"));
// 注册接口
Api.post("/register", require("./register"));
// 获取所有用户
Api.post("/allusers", require("./allusers"));
// 删除用户操作 需要管理员权限 admin
Api.post("/deleteuser", require("./deleteuser"));
// 编辑用户个人信息
Api.post("/edituser", require("./edituser"));
// 查询一个用户的信息
Api.post("/searchuser",require("./searchuser"))

module.exports = Api;
