const AdminApi = require("express").Router();
AdminApi.use((req, res, next) => {
  if (req.headers.authorization) {
    next();
  } else {
    res.json({
      msg: "权限不够无法访问",
    });
  }
});
AdminApi.get("/admin", require("./admin"));
module.exports = AdminApi;
