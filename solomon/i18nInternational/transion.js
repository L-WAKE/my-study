const fs = require('fs')
let en = require('./language-en-copy')
let zh = require('./language-zh-copy')
const handI18n = {}
let enKeys = Object.keys(en)
enKeys.forEach((item, index) => {
    let key = zh[item]
    let val = en[item]
    handI18n[key] = val
})
fs.writeFileSync('./transI18n.json', JSON.stringify(handI18n), 'utf-8')
console.log(handI18n)