const bcryptJS = require("bcryptjs");
module.exports = function bcryptPlugin(schema) {
  //前置钩子函数
  schema.pre("save", function (next) {
    bcryptJS.genSalt(10, (err, salt) => {
      if (err) return next(err);
      bcryptJS.hash(this.password, salt, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
      });
    });
  });
  schema.pre("findOneAndUpdate", function (next) {
    bcryptJS.genSalt(10, (err, salt) => {
      if (err) return next(err);
      bcryptJS.hash(this._update.password, salt, (err, hash) => {
        if (err) return next(err);
        this._update.password = hash;
        next();
      });
    });
  });
  // 校验用户输入密码是否正确
  schema.static("comparePassword", function (pwd, hash, cb) {
    bcryptJS.compare(pwd, hash, function (err, res) {
      if (err) cb(err, null);
      cb(null, res);
    });
  });
};
