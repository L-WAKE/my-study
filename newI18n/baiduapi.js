const http = require("http");
const querystring = require("querystring");
const md5 = require("md5");

const appid = "";
const key = "";

function translateText(text, from, to) {
  const salt = Date.now();
  const sign = md5(`${appid}${text}${salt}${key}`);

  const postData = querystring.stringify({
    q: text,
    from,
    to,
    appid,
    salt,
    sign,
  });

  const options = {
    hostname: "api.fanyi.baidu.com",
    port: 80,
    path: "/api/trans/vip/translate",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": postData.length,
    },
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        const result = JSON.parse(data);
        if (result.error_code) {
          reject(result.error_msg);
        } else {
          resolve(result.trans_result[0].dst);
        }
      });
    });

    req.on("error", (err) => {
      reject(`翻译失败: ${err.message}`);
    });

    req.write(postData);
    req.end();
  });
}

module.exports = { translateText };
