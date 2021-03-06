/*
通用表格模板
*/
module.exports = {
  genHtml,
  gridTable
}
/**
 *
 * @param {Array} arr 传入的数组
 * @param {*} isOpen 是否打开details标记
 * @param {*} isIndex 是否显示索引列
 */
function gridTable (arr, isOpen = '', isIndex = 0) {
  //isOpen '' or  open
  let redColor = '#f5222d'
  let greenColor = '#52c41a'
  let yellowColor = '#faad14'
  let body = ``
  let script = ``
  for (let i = 0; i < arr.length; i++) {
    let { dataTitleArr, dataArr, dataTitle } = arr[i]
    let trTitle = []
    let tBody = ''
    let n = 1
    try {
      if (isIndex) {
        dataTitleArr.unshift('序号')
      }
      trTitle = dataTitleArr
        .map(k => {
          return `<th title="${k}">${k}</th>`
        })
        .join('')
      tBody = dataArr
        .map(item => {
          if (isIndex) {
            item.unshift(n++)
          }
          let td = item
            .map((v, idx) => {
              let colorStr = ''
              if (['min', 'max', 'avg', 'time'].includes(dataTitleArr[idx])) {
                let v1 = +v.replace('ms', '')
                if ((v1 > 0) & (v1 <= 60))
                  colorStr = `style="color:${greenColor}"`
                if ((v1 > 60) & (v1 <= 200))
                  colorStr = `style="color:${yellowColor}"`
                if (v1 > 200) colorStr = `style="color:${redColor}"`
              }
              return `<td ${colorStr}>${v}</td>`
            })

            .join('')

          return `<tr>${td}</tr>`
        })
        .join('')
    } catch (e) {
      return [500, '错误', e.toString()]
    }
    body += `
      <details ${isOpen}>
      <summary><font size="5">${dataTitle}</font></summary>
        <table class="gridtable">
          <thead>
            <tr>${trTitle}</tr>
          </thead>
          <tbody>${tBody}</tbody>
        </table>
      </details>`
  }
  return body
}
/**
 *
 * @param {String} htmlTitle
 * @param {String} bodyText
 */
function genHtml (htmlTitle = '', bodyText = '', htmlHeadExtend = '') {
  return `<!DOCTYPE html>
  <html lang="zh-ch">
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black" />
  <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
  <head>
    <meta charset="utf-8"><title>${htmlTitle}</title>
    ${htmlHeadExtend}
      <style type="text/css">
          canvas {width: 90%;height: 300px;}
          table.gridtable {
              font-family: verdana,arial,sans-serif;
              font-size:11px;
              color:#333333;
              background-color:#dddddd
              border-width: 1px;
              border-color: #666666;
              border-collapse: collapse;
          }
          table.gridtable th {
              border-width: 1px;
              padding: 8px;
              border-style: solid;
              border-color: #666666;
              background-color: #dedede;
          }
          table.gridtable td {
              text-align: left;
              border-width: 1px;
              padding: 8px;
              border-style: solid;
              border-color: #999999;
              background-color: #ffffff;
          }
      </style>
  </head>
  <body>${bodyText}</body>
  </html>`
}
