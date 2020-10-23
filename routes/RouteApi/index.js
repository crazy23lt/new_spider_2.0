const RouteApi = require("express").Router();
RouteApi.use((req, res, next) => {
  console.info(req.headers.authorization);
  next();
});
// normal 与 admin 用户都能访问的接口
RouteApi.get("/normal", require("./normal"));
// admin 用户才能访问的接口
RouteApi.use("/adminapi", require("./adminApi"));
module.exports = RouteApi;
