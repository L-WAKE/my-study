const axios = require("axios");
const qs = require("querystring");

import { extractFromFile, extractChinese } from "./i18nTool.js";

async function translateToEnglish(text) {
  const APPID = "20230213001560478";
  const KEY = "fYSHi3f9e0XLhmrN65Nh";
  const URL = "https://fanyi-api.baidu.com/api/trans/vip/translate";

  const data = {
    q: text,
    from: "zh",
    to: "en",
    appid: APPID,
    salt: new Date().getTime(),
    sign: "",
  };
  data.sign = md5(data.appid + text + data.salt + KEY);
  const res = await axios.post(URL, qs.stringify(data), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (res.status === 200 && res.data.trans_result) {
    const translateResult = res.data.trans_result[0].dst;
    return translateResult;
  } else {
    return "";
  }
}

// 遍历 Vue 中的 template 和 JS 中的代码，提取中文字符并自动翻译为英文
function traverse(target, dictionary) {
  if (Array.isArray(target)) {
    target.forEach((item, index) => {
      traverse(item, dictionary);
    });
  } else if (typeof target === "object" && target !== null) {
    for (let key in target) {
      if (typeof target[key] === "string") {
        if (extractChinese(target[key]).length > 0) {
          if (!dictionary["zh-CN"][key]) {
            dictionary["zh-CN"][key] = target[key];
            translateToEnglish(target[key]).then((value) => {
              dictionary["en-US"][key] = value;
            });
          }
        }
      } else {
        traverse(target[key], dictionary);
      }
    }
  }
}

let dictionary = {
  "zh-CN": {},
  "en-US": {},
};

// 遍历 Vue 模板中的中文字符
const content = fs.readFileSync("App.vue", "utf-8");
const template = compiler.parseComponent(content).template.content;
const ast = compiler.compile(template, { outputSourceRange: true }).ast;
traverse(ast, dictionary);

// 遍历 JavaScript 文件中的中文字符
const jsFiles = ["utils.js", "config.js"];

jsFiles.forEach((file) => {
  extractFromFile(file).forEach((chinese) => {
    if (!dictionary["zh-CN"][chinese]) {
      dictionary["zh-CN"][chinese] = chinese;
      translateToEnglish(chinese).then((value) => {
        dictionary["en-US"][chinese] = value;
      });
    }
  });
});

// 输出语言包
console.log(JSON.stringify(dictionary, null, 2));
