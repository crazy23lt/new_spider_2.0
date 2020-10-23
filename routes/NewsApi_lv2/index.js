const News_lv2 = require("express").Router();
const { verifyToken } = require("../../plugin/jwt");
News_lv2.use((req, res, next) => {
  /** 权限等级 2 拦截非超级用户访问 */
  try {
    let { role, _id } = JSON.parse(verifyToken(req.headers.authorization));
    if (role === "admin") {
      next();
    } else if (req.url === "/edituser" && req.body._id === _id) {
      next();
    } else {
      res
        .status(403)
        .json({ data: null, msg: "用户无权限访问该资源，请求失败" });
    }
  } catch (e) {
    console.info(e);
    res.status(401).json({ data: null, msg: "用户未认证，请求失败" });
  }
});

// 删除用户操作 需要管理员权限 admin
News_lv2.post("/deleteuser", require("../../api/deleteuser"));
// 编辑用户个人信息
News_lv2.post("/edituser", require("../../api/edituser"));


module.exports = News_lv2;
