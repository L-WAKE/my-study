const i18nMap = require('./i18n.data')
const fs = require('fs')

Object.keys(i18nMap.en).forEach(item => {
  i18nMap.en[item] = split(i18nMap.en, item)
})

fs.writeFileSync("./i18n.data.js","module.exports = " + JSON.stringify(i18nMap));

function split(obj, item) {
  let list = String(obj[item]).split(' ')
  list = list.map((item, index) => {
    if (index > 0) {
      return item.toLowerCase()
    } else {
      return item.charAt(0).toUpperCase() + item.substr(1, item.length)
    }
  })
  let hand = list.join(' ')
  return hand.trim()
}


