// 引用 linebot 套件
import linebot from 'linebot'
// 引用 dotenv 套件
import dotenv from 'dotenv'
// 引用 request 套件
import rp from 'request-promise'
import cheerio from 'cheerio'
// 讀取 .env 檔
dotenv.config()

// 宣告機器人的資訊
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})
/*
  0 其他服務
  1 查詢行政機關辦公日曆
  2 查詢發票兌獎號碼
  3 選擇困難
*/
const choose = '查詢行政機關辦公日曆，請輸入「1」\n查詢發票兌獎號碼，請輸入「2」\n選擇困難，請輸入「3」'
const a1 = '查詢節日，請輸入「節日關鍵字」，例如：端午、春節\n查詢補假日，請輸入「補假日」\n查詢調整放假日，請輸入「調整日」\n查詢補上班日，請輸入「補班日」\n其他服務，請輸入「0」'
const b1 = '很抱歉，「政府行政機關辦公日曆表」查無此資料\nP.s.我知道很爛，去怪政府吧'
const a2 = '請輸入你的選項，例如：\n「買 不買」或\n「珍珠蜂蜜鮮奶普洱 珍珠伯爵紅茶拿鐵 黑糖波霸厚鮮奶 百香雙響炮」\n每個選項請以空格分開\n\n其他服務，請輸入「0」'
const b2 = '別再換了，你還是自己決定吧!'
const c2 = '重新輸入你的選項，例如：「漢堡 薯條 炸雞」，每個選項請以空格分開\n\n其他服務，請輸入「0」'
const d2 = '你是哪裡有問題？一個選項有什麼選擇困難'
const e2 = '請輸入你的選項，例如「魯夫 索隆 娜美」，每個選項請以空格分開\n\n其他服務，請輸入「0」'
const f2 = '換一個請輸入「換」\n或重新輸入你的選項，例如：「漢堡 薯條 炸雞」，每個選項請以空格分開\n\n其他服務，請輸入「0」'
const a3 = '請輸入要查詢的年月份，例如要查詢民國109年1月的兌獎號碼，請輸入「10901」'
let option = 0
let check = false
let reset = true
let saveItems = ''
let saveChoose = ''
let count = 1
// 當收到訊息時
bot.on('message', async (event) => {
  if ((event.message.text === '1' || event.message.text === '2' || event.message.text === '3') && reset) {
    option = parseInt(event.message.text)
    reset = false
  }
  try {
    if (option === 1) {
      if (!check) {
        event.reply(a1)
        check = true
      } else {
        const data = await rp({ url: 'https://quality.data.gov.tw/dq_download_json.php?nid=26557&md5_url=35ddfd1dc97973d29f24aee56753995f', json: true })
        const year = new Date().getFullYear()
        const weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        if (event.message.text === '補假日') {
          let msg1 = ''
          for (let i = 0; i < data.length; i++) {
            // 找年份
            if (data[i].date.indexOf(year) !== -1) {
              if (data[i].holidayCategory === '補假') {
                if (msg1.length > 1) {
                  msg1 += '\n'
                }
                const myDate = new Date(Date.parse(data[i].date.replace(/-/g, '/')))
                msg1 += data[i].date + ' ' + weekArr[myDate.getDay()]
              }
            }
          }
          event.reply([
            {
              type: 'sticker',
              packageId: '11537',
              stickerId: '52002734'
            },
            {
              type: 'text',
              text: msg1
            }
          ])
        } else if (event.message.text === '補班日') {
          let msg2 = ''
          for (let i = 0; i < data.length; i++) {
            if (data[i].date.indexOf(year) !== -1) {
              if (data[i].holidayCategory.indexOf('上班日') !== -1) {
                if (msg2.length > 1) {
                  msg2 += '\n'
                }
                const myDate = new Date(Date.parse(data[i].date.replace(/-/g, '/')))
                msg2 += data[i].date + ' ' + weekArr[myDate.getDay()]
              }
            }
          }
          event.reply([
            {
              type: 'sticker',
              packageId: '11537',
              stickerId: '52002751'
            },
            {
              type: 'text',
              text: msg2
            }
          ])
        } else if (event.message.text === '調整日') {
          let msg3 = ''
          for (let i = 0; i < data.length; i++) {
            if (data[i].date.indexOf(year) !== -1) {
              if (data[i].holidayCategory.indexOf('調整') !== -1) {
                if (msg3.length > 1) {
                  msg3 += '\n'
                }
                const myDate = new Date(Date.parse(data[i].date.replace(/-/g, '/')))
                msg3 += data[i].date + ' ' + weekArr[myDate.getDay()]
              }
            }
          }
          event.reply([
            {
              type: 'sticker',
              packageId: '11538',
              stickerId: '51626532'
            },
            {
              type: 'text',
              text: msg3
            }
          ])
        } else if (event.message.text === '0') {
          check = false
          reset = true
          option = 0
          event.reply(choose)
        } else {
          let msg4 = ''
          for (let i = 0; i < data.length; i++) {
            if (data[i].date.indexOf(year) !== -1) {
              // 找節日
              if (event.message.text.indexOf('元') !== -1 || event.message.text.indexOf('旦') !== -1) {
                event.message.text = '中華民國開國紀念日'
              }
              if (data[i].name.indexOf(event.message.text) !== -1) {
                const myDate = new Date(Date.parse(data[i].date.replace(/-/g, '/')))
                msg4 = (data[i].name + '\n' + '日期：' + data[i].date + '  ' + weekArr[myDate.getDay()] + '\n' + data[i].description + '\n' + '是否放假：' + data[i].isHoliday)
              }
            }
          }
          if (msg4 === '') {
            event.reply([
              {
                type: 'sticker',
                packageId: '11538',
                stickerId: '51626525'
              },
              {
                type: 'text',
                text: b1
              },
              {
                type: 'text',
                text: a1
              }
            ])
          } else {
            event.reply([
              {
                type: 'sticker',
                packageId: '11537',
                stickerId: '52002748'
              },
              {
                type: 'text',
                text: msg4
              }
            ])
          }
        }
      }
    } else if (option === 3) {
      if (!check) {
        event.reply(a2)
        check = true
      } else {
        if (event.message.text === '換') {
          if (saveItems !== '' && count !== 3) {
            count++
            event.message.text = saveItems
            const ar = event.message.text.split(' ')
            let atc = ar[rand(ar.length - 1)]
            while (saveChoose === atc || atc === '') {
              atc = ar[rand(ar.length - 1)]
            }
            saveChoose = atc
            event.reply([
              {
                type: 'text',
                text: `選${atc}吧!`
              },
              {
                type: 'sticker',
                packageId: '11538',
                stickerId: '51626501'
              },
              {
                type: 'text',
                text: f2
              }
            ])
          } else {
            if (count === 3) {
              event.reply([
                {
                  type: 'sticker',
                  packageId: '11537',
                  stickerId: '52002767'
                },
                {
                  type: 'text',
                  text: b2
                },
                {
                  type: 'text',
                  text: c2
                }
              ])
            } else {
              event.reply(a2)
            }
          }
        } else if (event.message.text === '0') {
          check = false
          reset = true
          option = 0
          event.reply(choose)
        } else {
          const arr = event.message.text.split(' ')
          if (arr.length > 1) {
            saveItems = event.message.text
            count = 1
            let autoChoose = arr[rand(arr.length - 1)]
            while (autoChoose === '') {
              autoChoose = arr[rand(arr.length - 1)]
            }
            saveChoose = autoChoose
            event.reply([
              {
                type: 'text',
                text: `選${autoChoose}吧!`
              },
              {
                type: 'sticker',
                packageId: '11538',
                stickerId: '51626501'
              },
              {
                type: 'text',
                text: f2
              }
            ])
          } else {
            event.reply([
              {
                type: 'sticker',
                packageId: '11537',
                stickerId: '52002754'
              },
              {
                type: 'text',
                text: d2
              },
              {
                type: 'text',
                text: e2
              }
            ])
          }
        }
      }
    } else if (option === 2) {
      if (!check) {
        event.reply(a3)
        check = true
      } else {
        if (event.message.text !== '0') {
          try {
            if (parseInt(event.message.text) % 2 === 0) {
              event.message.text = parseInt(event.message.text) - 1
            }
            const receipt = await rp(`https://www.etax.nat.gov.tw/etw-main/web/ETW183W2_${event.message.text}/`)
            const $ = cheerio.load(receipt)
            const arr = $('#tablet01').find('td').eq(5).text().trim(' ').split(' ')
            let nb = ''
            for (let i = 0; i < arr.length; i++) {
              nb += arr[i]
              if (i !== arr.length - 1) {
                nb += '\n'
              }
            }
            event.reply([
              {
                type: 'text',
                text: $('#tablet01').find('td').eq(0).text().replace('~', '～') +
                          '\n特別獎：\n' + $('#tablet01').find('td').eq(1).text().trim() +
                          '\n特獎：\n' + $('#tablet01').find('td').eq(3).text().trim() +
                          '\n頭獎：\n' + nb +
                          '\n增開六獎：' + $('#tablet01').find('td').eq(12).text()
              },
              {
                type: 'text',
                text: '特別獎：\n' + $('#tablet01').find('td').eq(2).text() +
                '\n\n特獎：\n' + $('#tablet01').find('td').eq(4).text() +
                '\n\n頭獎：\n' + $('#tablet01').find('td').eq(6).text() +
                '\n\n二獎：\n' + $('#tablet01').find('td').eq(7).text() +
                '\n\n三獎：\n' + $('#tablet01').find('td').eq(8).text() +
                '\n\n四獎：\n' + $('#tablet01').find('td').eq(9).text() +
                '\n\n五獎：\n' + $('#tablet01').find('td').eq(10).text() +
                '\n\n六獎：\n' + $('#tablet01').find('td').eq(11).text() +
                '\n\n其他服務，請輸入「0」'
              }
            ])
          } catch (error) {
            event.reply([
              {
                type: 'sticker',
                packageId: '11538',
                stickerId: '51626526'
              },
              {
                type: 'text',
                text: '尚未開獎'
              }
            ])
          }
        } else {
          check = false
          reset = true
          option = 0
          event.reply(choose)
        }
      }
    } else {
      event.reply(choose)
    }
  } catch (error) {
    event.reply(option)
  }
})
// 在 port 啟動
bot.listen('/', process.env.PORT, () => {
  console.log('機器人已啟動')
})
// 隨機
const rand = (max) => {
  return Math.round(Math.random() * (max))
}
