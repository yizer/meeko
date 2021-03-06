let $M = require('../math')
function peridForecast (y, peridNum = 7, nextPoint = 14) {
  let len = y.length
  let x = $M.genRange(0, len - 1)
  let { a, b } = $M.linearFitting(x, y)
  let anormalIndex = [] // 异常点
  let yModArr = [] //周期数组
  let quantile = $M.quantileAll(y) //四分位算法
  let forecastArr = y.copy().map((x, idx) => x - a * idx - b)

  forecastArr.forEach((x, idx) => {
    let it = yModArr[idx % peridNum]
    if (it) {
      it.push(x)
    } else {
      yModArr[idx % peridNum] = []
      yModArr[idx % peridNum].push(x)
    }

    if (x < quantile.lower - a * idx - b || x > quantile.upper - a * idx - b) {
      anormalIndex.push(idx)
    }
  })
  yModArr = yModArr.map(x => $M.mean(x))
  for (let i = 0; i < nextPoint; i++) {
    let idx = len + i + 1
    forecastArr.push(yModArr[idx % peridNum])
  }
  return {
    forecast: forecastArr.map((x, idx) => x + a * idx + b),
    oriLen: len,
    nextPoint,
    peridNum,
    anormalIndex
  }
}
module.exports = {
  Knn: require('./Knn.js'),
  NaiveBayes: require('./NaiveBayes'),
  Pca: require('./Pca'),
  Svd: require('./Svd'),
  util: require('./util'),
  peridForecast
}
