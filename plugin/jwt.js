const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
// 校验有效token
const verifyToken = function (token) {
  let cert = fs.readFileSync(path.join(__dirname, "../pem/public_key.pem")); //公钥 可以自己生成
  let res;
  try {
    let result = jwt.verify(token, cert, { algorithms: ["RS256"] }) || {};
    let { exp = 0 } = result,
      current = Math.floor(Date.now() / 1000);
    // 比较时间是否过期
    if (current <= exp) {
      res = result.info || {};
    }
  } catch (e) {
    res = "err";
  }
  return res;
};

// 访问权限token
// data 存入token中的数据
const acesssToken = function (data) {
  let info = JSON.stringify(data);
  let created = Math.floor(Date.now() / 1000) + 60 * 48; //刷新token两天后过期
  let cert = fs.readFileSync(path.resolve(__dirname, "../pem/private_key.pem")); //私钥 可以自己生成
  // jwt.sign(payload, secretOrPrivateKey, [options, callback])
  // payload必须是一个object, buffer或者string。请注意， exp只有当payload是object字面量时才可以设置。
  // secretOrPrivateKey 是包含HMAC算法的密钥或RSA和ECDSA的PEM编码私钥的string或buffer
  let token = jwt.sign(
    {
      info,
      sub: "Acesss",
      exp: created,
    },
    cert,
    { algorithm: "RS256" }
  );
  return token;
};
module.exports = { verifyToken, acesssToken };
