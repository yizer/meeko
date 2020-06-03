/**
 * @namespace Math_prototype
 */

let $M = require('../math')
function zScoreNorm (a) {
  let arr = $M.mat.transpose(a).map(x => {
    let mean = $M.mean(x)
    let std = $M.stddev(x)
    x = x.map(it => (it - mean) / std)
    return x
  })
  return $M.mat.transpose(arr)
}
function minMaxNorm (a) {
  let arr = $M.mat.transpose(a).map(x => {
    let max = $M.max(x)
    let min = $M.min(x)
    x = x.map(it => (it - min) / (max - min))
    return x
  })
  return $M.mat.transpose(arr)
}
function meanStandard (a) {
  //均值中心化
  let arr = $M.mat.transpose(a).map(x => {
    let mean = $M.mean(x)
    x = x.map(it => it - mean)
    return x
  })
  return $M.mat.transpose(arr)
}

module.exports = {
  zScoreNorm,
  minMaxNorm,
  meanStandard
}