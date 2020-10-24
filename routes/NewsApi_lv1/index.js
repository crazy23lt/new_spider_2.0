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
// 获取所有新闻信息
News_lv1.post("/news", require("../../api/allnews"));
// 获取当天爬取的新闻数量
News_lv1.post("/todaynews", require("../../api/todaynews"));
// 开启爬虫
News_lv1.post("/spider", require("../../api/spider"));
// 删除一条新闻
News_lv1.post("/delnews", require("../../api/delnews"));
// 爬虫类型
News_lv1.post("/typenews", require("../../api/typenews"));
// 单独开启一类爬虫
News_lv1.post("/spiderone", require("../../api/spiderone"));



module.exports = News_lv1;
