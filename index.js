// 引用 linebot 套件
import linebot from 'linebot'
// 引用 dotenv 套件
import dotenv from 'dotenv'
// 引用 request 套件
import rp from 'request-promise'
import cheerio from 'cheerio'
// 訊息樣式
import { errorStyle } from './js/error.js'
import { movieChartsStyle } from './js/moviecharts.js'
import { noDataStyle } from './js/nodata.js'
import { rankingStyle } from './js/ranking.js'
import { notReleaseStyle } from './js/notrelease.js'
import { movieInfoStyle } from './js/movieinfo.js'

// 讀取 .env 檔
dotenv.config()

// 宣告機器人的資訊
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})
// 當收到訊息時
bot.on('message', async (event) => {
  const movieInfo = []
  let $ = ''
  let movieStyle = ''
  try {
    const defaultText = ['台北票房榜', '全美票房榜', '預告片榜']
    if (defaultText.includes(event.message.text)) {
      let useURL = ''
      switch (event.message.text) {
        case '台北票房榜':
          useURL = await rp('https://movies.yahoo.com.tw/chart.html')
          break
        case '全美票房榜':
          useURL = await rp('https://movies.yahoo.com.tw/chart.html?cate=us')
          break
        case '預告片榜':
          useURL = await rp('https://movies.yahoo.com.tw/chart.html?cate=trailer')
          break
      }
      for (let i = 1; i < 11; i++) {
        $ = cheerio.load(useURL)
        const infoUrl = $('.rank_list').find('.tr').eq(i).find('a').attr('href')
        if (infoUrl !== undefined) {
          const infoWeb = await rp(infoUrl)
          $ = cheerio.load(infoWeb)
          const imageUrl = $('.movie_intro_foto img').attr('src')
          const chName = $('.movie_intro_info_r').find('h1').text()
          const enName = $('.movie_intro_info_r').find('h3').text()
          // 排行榜訊息樣式
          movieStyle = rankingStyle(imageUrl, chName, enName, infoUrl, i)
        } else {
          const chName = $('.rank_list').find('.tr').eq(i).find('.rank_txt').text()
          // 排行榜訊息樣式
          movieStyle = notReleaseStyle(chName, i)
        }
        movieInfo.push(movieStyle)
      }
    } else {
      const movies = await rp(`https://movies.yahoo.com.tw/moviesearch_result.html?keyword=${encodeURI(event.message.text)}`)
      $ = cheerio.load(movies)
      const releaseList = $('.release_foto .foto img').length
      if (releaseList > 0) {
        for (let i = 0; i < releaseList; i++) {
          const imageUrl = $('.release_foto .foto img').eq(i).attr('src')
          const chName = $('.release_movie_name').eq(i).children().eq(0).text()
          const enName = $('.release_movie_name').eq(i).children().eq(1).text()
          const releaseDate = $('.release_movie_name').eq(i).children().eq(2).text().replace(' 上映日期  : ', '')
          const director = $('.searchpage_info').eq(i).find('.search_text').eq(0).text().trim()
          const actors = $('.searchpage_info').eq(i).find('.search_text').eq(1).text().replace(/\s+/g, '')
          const information = $('.release_movie_name').eq(i).find('a').attr('href')
          // 電影訊息樣式
          movieStyle = movieInfoStyle(imageUrl, chName, enName, releaseDate, director, actors, information)
          movieInfo.push(movieStyle)
        }
      } else {
        // 查無資料
        movieInfo.push(noDataStyle)
      }
    }
    // 電影排行榜
    movieInfo.push(movieChartsStyle)
    event.reply({
      type: 'flex',
      altText: '查詢結果',
      contents: {
        type: 'carousel',
        contents: movieInfo
      }
    })
  } catch (error) {
    event.reply(errorStyle)
  }
})
// 在 port 啟動
bot.listen('/', process.env.PORT, () => {
  console.log('機器人已啟動')
})
