const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const glob = promisify(require("glob"));
const { translateText } = require("./baiduapi"); // 你的翻译模块

async function replaceVueI18n() {
  const vueFiles = await glob("components/**/*.vue"); // 存放Vue文件的目录
  const translations = {
    zh: {},
    en: {},
  };
  const replaceTasks = vueFiles.map(async (filePath) => {
    const fileContent = await promisify(fs.readFile)(filePath, "utf-8");
    let hasReplaced = false;
    const newContent = fileContent.replace(
      /[\u4e00-\u9fa5]+/g,
      async (match) => {
        hasReplaced = true;
        const key = match.replace(/\s+/g, "");
        translations.zh[key] = match;
        if (!translations.en[key]) {
          const translatedText = await translateText(match, "zh", "en"); // 调用翻译模块翻译中文
          translations.en[key] = translatedText;
        }
        return `{{$t('${key}')}}`;
      }
    );
    if (hasReplaced) {
      await promisify(fs.writeFile)(filePath, newContent, "utf-8");
      console.log(`String replaced in ${filePath}`);
    }
  });
  await Promise.all(replaceTasks);
  await promisify(fs.writeFile)(
    path.join(__dirname, "translations", "zh.json"),
    JSON.stringify(translations.zh),
    "utf-8"
  );
  await promisify(fs.writeFile)(
    path.join(__dirname, "translations", "en.json"),
    JSON.stringify(translations.en),
    "utf-8"
  );
  console.log("Translation files generated");
}

replaceVueI18n();
