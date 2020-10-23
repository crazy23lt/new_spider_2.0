const News_lv1 = require("express").Router();
const { verifyToken } = require("../../plugin/jwt");
News_lv1.use((req, res, next) => {
  /** 权限等级 1 所有用户都能访问该路由接口 */
  if (req.url === "/login" || req.url === "/register") {
    next();
  } else {
    let token = req.headers.authorization;
    try {
      verifyToken(token);
      next();
    } catch (e) {
      console.info(e);
      res.status(401).json({ data: null, msg: "用户未认证，请求失败" });
    }
  }
});

// 登陆接口
News_lv1.post("/login", require("../../api/login"));
// 注册接口
News_lv1.post("/register", require("../../api/register"));
// 获取所有用户
News_lv1.post("/allusers", require("../../api/allusers"));
// 查询一个用户的信息
News_lv1.post("/searchuser", require("../../api/searchuser"));
// 获取所有新闻
News_lv1.post("/news", require("../../api/allnews"));
// 获取当天爬取的新闻
News_lv1.post("/todaynews",require('../../api/todaynews'))

module.exports = News_lv1;
