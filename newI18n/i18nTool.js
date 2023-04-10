export function extractChinese(str) {
  let reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/g;
  let result = [];
  while ((match = reg.exec(str))) {
    result.push(match[0]);
  }
  return result;
}

export function extractFromFile(path) {
  const content = fs.readFileSync(path, "utf-8");
  let result = [];

  // 提取注释中的中文字符
  let reg_comment = /(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(\/\/.*)/g;
  content.match(reg_comment).forEach((item) => {
    result = result.concat(extractChinese(item));
  });

  // 提取非注释中的中文字符
  let reg_code = /(?<=^|[^\\])(\'[^\']*?\'+|\"[^\"]*?\")/g;
  content.match(reg_code).forEach((item) => {
    result = result.concat(extractChinese(item));
  });

  return result;
}
