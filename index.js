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
      let infoUrl = ''
      let image = ''
      let chName = ''
      let enName = ''
      for (let i = 1; i < 11; i++) {
        $ = cheerio.load(useURL)
        infoUrl = $('.rank_list').find('.tr').eq(i).find('a').attr('href')
        if (infoUrl !== undefined) {
          const infoWeb = await rp(infoUrl)
          $ = cheerio.load(infoWeb)
          image = $('.movie_intro_foto img').attr('src')
          chName = $('.movie_intro_info_r').find('h1').text()
          enName = $('.movie_intro_info_r').find('h3').text()
          // 排行榜訊息樣式
          movieStyle = {
            type: 'bubble',
            body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'image',
                  url: image,
                  size: 'full',
                  aspectMode: 'cover',
                  aspectRatio: '2:3',
                  gravity: 'top'
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'box',
                      layout: 'vertical',
                      contents: [
                        {
                          type: 'text',
                          text: chName,
                          size: 'xl',
                          color: '#ffffff',
                          weight: 'bold',
                          align: 'center'
                        }
                      ]
                    },
                    {
                      type: 'box',
                      layout: 'baseline',
                      contents: [
                        {
                          type: 'text',
                          text: enName,
                          color: '#ebebeb',
                          size: 'sm',
                          align: 'center'
                        }
                      ],
                      spacing: 'lg'
                    },
                    {
                      type: 'box',
                      layout: 'vertical',
                      contents: [
                        {
                          type: 'filler'
                        },
                        {
                          type: 'box',
                          layout: 'baseline',
                          contents: [
                            {
                              type: 'filler'
                            },
                            {
                              type: 'text',
                              text: '更多資訊',
                              color: '#ffffff',
                              flex: 0,
                              offsetTop: '-2px'
                            },
                            {
                              type: 'filler'
                            }
                          ],
                          spacing: 'sm'
                        },
                        {
                          type: 'filler'
                        }
                      ],
                      borderWidth: '1px',
                      cornerRadius: '4px',
                      spacing: 'sm',
                      borderColor: '#ffffff',
                      margin: 'xxl',
                      height: '40px',
                      action: {
                        type: 'uri',
                        label: 'WEBSITE',
                        uri: infoUrl
                      }
                    }
                  ],
                  position: 'absolute',
                  offsetBottom: '0px',
                  offsetStart: '0px',
                  offsetEnd: '0px',
                  backgroundColor: '#03303AB3',
                  paddingAll: '15px',
                  paddingTop: '18px'
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: `${i}`,
                      color: '#ffffff',
                      size: 'xxl',
                      offsetTop: '3px',
                      align: 'center'
                    }
                  ],
                  position: 'absolute',
                  cornerRadius: '50px',
                  offsetTop: '18px',
                  backgroundColor: '#FF0000',
                  offsetStart: '18px',
                  height: '40px',
                  width: '40px'
                }
              ],
              paddingAll: '0px'
            }
          }
        } else {
          image = 'https://res.cloudinary.com/dxrxiuei6/image/upload/v1658325828/LineRobot/unknow_movie_arw6x1.jpg'
          chName = $('.rank_list').find('.tr').eq(i).find('.rank_txt').text()
          enName = '台灣目前未上映'
          // 排行榜訊息樣式
          movieStyle = {
            type: 'bubble',
            body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'image',
                  url: image,
                  size: 'full',
                  aspectMode: 'cover',
                  aspectRatio: '2:3',
                  gravity: 'top'
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'box',
                      layout: 'vertical',
                      contents: [
                        {
                          type: 'text',
                          text: chName,
                          size: 'xl',
                          color: '#ffffff',
                          weight: 'bold',
                          align: 'center'
                        }
                      ]
                    },
                    {
                      type: 'box',
                      layout: 'baseline',
                      contents: [
                        {
                          type: 'text',
                          text: enName,
                          color: '#ebebeb',
                          size: 'sm',
                          align: 'center'
                        }
                      ],
                      spacing: 'lg'
                    }
                  ],
                  position: 'absolute',
                  offsetBottom: '0px',
                  offsetStart: '0px',
                  offsetEnd: '0px',
                  backgroundColor: '#03303AB3',
                  paddingAll: '15px',
                  paddingTop: '18px'
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: `${i}`,
                      color: '#ffffff',
                      size: 'xxl',
                      offsetTop: '3px',
                      align: 'center'
                    }
                  ],
                  position: 'absolute',
                  cornerRadius: '50px',
                  offsetTop: '18px',
                  backgroundColor: '#FF0000',
                  offsetStart: '18px',
                  height: '40px',
                  width: '40px'
                }
              ],
              paddingAll: '0px'
            }
          }
        }
        movieInfo.push(movieStyle)
      }
    } else {
      const movies = await rp(`https://movies.yahoo.com.tw/moviesearch_result.html?keyword=${encodeURI(event.message.text)}`)
      $ = cheerio.load(movies)
      const releaseList = $('.release_foto .foto img').length
      if (releaseList > 0) {
        for (let i = 0; i < releaseList; i++) {
          const image = $('.release_foto .foto img').eq(i).attr('src')
          let chName = $('.release_movie_name').eq(i).children().eq(0).text()
          let enName = $('.release_movie_name').eq(i).children().eq(1).text()
          if (chName === '') chName = ' '
          if (enName === '') enName = ' '
          const release = $('.release_movie_name').eq(i).children().eq(2).text().replace(' 上映日期  : ', '')
          let director = $('.searchpage_info').eq(i).find('.search_text').eq(0).text().trim()
          if (director === '') director = '無'
          const actors = $('.searchpage_info').eq(i).find('.search_text').eq(1).text().split('、')
          const info = $('.release_movie_name').eq(i).find('a').attr('href')
          for (let j = 0; j < actors.length; j++) {
            actors[j] = actors[j].trim()
          }
          if (actors[0] === '') actors[0] = '無'
          // 電影的訊息樣式
          movieStyle = {
            type: 'bubble',
            body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'image',
                  url: image,
                  size: 'full',
                  aspectMode: 'cover',
                  aspectRatio: '2:3',
                  gravity: 'top'
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'box',
                      layout: 'vertical',
                      contents: [
                        {
                          type: 'text',
                          text: chName,
                          size: 'xl',
                          color: '#ffffff',
                          weight: 'bold',
                          align: 'center'
                        }
                      ],
                      height: '10%'
                    },
                    {
                      type: 'box',
                      layout: 'baseline',
                      contents: [
                        {
                          type: 'text',
                          text: enName,
                          color: '#ebebeb',
                          size: 'sm',
                          align: 'center'
                        }
                      ],
                      spacing: 'lg',
                      height: '10%'
                    },
                    {
                      type: 'box',
                      layout: 'vertical',
                      contents: [
                        {
                          type: 'box',
                          layout: 'baseline',
                          contents: [
                            {
                              type: 'text',
                              text: '上映日',
                              color: '#ffffff',
                              flex: 3,
                              align: 'center',
                              size: 'md'
                            },
                            {
                              type: 'text',
                              text: release,
                              color: '#ffffff',
                              flex: 9,
                              align: 'start',
                              size: 'md'
                            }
                          ],
                          spacing: 'md'
                        },
                        {
                          type: 'box',
                          layout: 'baseline',
                          contents: [
                            {
                              type: 'text',
                              text: '導演',
                              color: '#ffffff',
                              flex: 3,
                              align: 'center',
                              size: 'md'
                            },
                            {
                              type: 'text',
                              text: director,
                              color: '#ffffff',
                              flex: 9,
                              align: 'start',
                              size: 'md',
                              wrap: false
                            }
                          ],
                          spacing: 'sm'
                        },
                        {
                          type: 'box',
                          layout: 'baseline',
                          contents: [
                            {
                              type: 'text',
                              text: '演員',
                              color: '#ffffff',
                              flex: 3,
                              align: 'center',
                              size: 'md'
                            },
                            {
                              type: 'text',
                              text: actors.join('、'),
                              color: '#ffffff',
                              flex: 9,
                              align: 'start',
                              size: 'md',
                              wrap: true
                            }
                          ],
                          spacing: 'sm'
                        }
                      ],
                      margin: 'md',
                      spacing: 'lg',
                      height: '62%'
                    },
                    {
                      type: 'box',
                      layout: 'vertical',
                      contents: [
                        {
                          type: 'filler'
                        },
                        {
                          type: 'box',
                          layout: 'baseline',
                          contents: [
                            {
                              type: 'filler'
                            },
                            {
                              type: 'text',
                              text: '更多資訊',
                              color: '#ffffff',
                              flex: 0,
                              offsetTop: '-2px'
                            },
                            {
                              type: 'filler'
                            }
                          ],
                          spacing: 'sm'
                        },
                        {
                          type: 'filler'
                        }
                      ],
                      borderWidth: '1px',
                      cornerRadius: '4px',
                      spacing: 'sm',
                      borderColor: '#ffffff',
                      margin: 'xxl',
                      height: '40px',
                      action: {
                        type: 'uri',
                        label: 'WEBSITE',
                        uri: info
                      }
                    }
                  ],
                  position: 'absolute',
                  offsetBottom: '0px',
                  offsetStart: '0px',
                  offsetEnd: '0px',
                  backgroundColor: '#03303AB3',
                  height: '100%',
                  paddingAll: '15px',
                  paddingTop: '18px'
                }
              ],
              paddingAll: '0px'
            }
          }
          movieInfo.push(movieStyle)
        }
      } else {
        // 查無資料的訊息樣式
        movieStyle = {
          type: 'bubble',
          hero: {
            type: 'image',
            url: 'https://res.cloudinary.com/dxrxiuei6/image/upload/v1658407798/LineRobot/sorry_ntfd3o.png',
            size: 'full',
            aspectRatio: '20:13',
            aspectMode: 'fit',
            backgroundColor: '#006000'
          },
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: '查',
                size: 'xxl',
                align: 'center',
                color: '#ffffff',
                weight: 'bold',
                margin: 'xl'
              },
              {
                type: 'text',
                text: '無',
                size: 'xxl',
                align: 'center',
                color: '#ffffff',
                weight: 'bold',
                margin: 'xl'
              },
              {
                type: 'text',
                text: '資',
                size: 'xxl',
                align: 'center',
                color: '#ffffff',
                weight: 'bold',
                margin: 'xl'
              },
              {
                type: 'text',
                text: '料',
                size: 'xxl',
                align: 'center',
                color: '#ffffff',
                weight: 'bold',
                margin: 'xl'
              }
            ]
          },
          styles: {
            body: {
              backgroundColor: '#006000'
            }
          }
        }
        movieInfo.push(movieStyle)
      }
    }
    // 電影排行榜的訊息樣式
    const movieTrailer = {
      type: 'bubble',
      hero: {
        type: 'image',
        url: 'https://res.cloudinary.com/dxrxiuei6/image/upload/v1658408146/LineRobot/cinema_pgxcmp.jpg',
        size: 'full',
        aspectRatio: '20:13',
        aspectMode: 'cover'
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: '電影排行榜',
            weight: 'bold',
            size: 'xl',
            align: 'center',
            color: '#FFFFF4'
          }
        ]
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        spacing: 'sm',
        contents: [
          {
            type: 'button',
            style: 'link',
            height: 'md',
            action: {
              type: 'message',
              label: '台北票房榜',
              text: '台北票房榜'
            },
            color: '#ffffff'
          },
          {
            type: 'button',
            style: 'link',
            height: 'md',
            action: {
              type: 'message',
              label: '全美票房榜',
              text: '全美票房榜'
            },
            color: '#ffffff'
          },
          {
            type: 'button',
            style: 'link',
            height: 'md',
            action: {
              type: 'message',
              label: '預告片榜',
              text: '預告片榜'
            },
            color: '#ffffff'
          }
        ],
        flex: 0
      },
      styles: {
        body: {
          backgroundColor: '#000000'
        },
        footer: {
          backgroundColor: '#000000'
        }
      }
    }
    movieInfo.push(movieTrailer)
    event.reply({
      type: 'flex',
      altText: '查詢結果',
      contents: {
        type: 'carousel',
        contents: movieInfo
      }
    })
  } catch (error) {
    event.reply({
      type: 'flex',
      altText: '發生錯誤',
      contents: {
        type: 'carousel',
        contents: [
          {
            type: 'bubble',
            hero: {
              type: 'image',
              url: 'https://res.cloudinary.com/dxrxiuei6/image/upload/v1658332881/LineRobot/error_auhrnp.png',
              size: 'full',
              aspectRatio: '20:13',
              aspectMode: 'cover'
            },
            body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  text: '404',
                  weight: 'bold',
                  size: '4xl',
                  align: 'center',
                  color: '#FCFCFC'
                },
                {
                  type: 'text',
                  text: 'Not Found',
                  weight: 'bold',
                  size: '4xl',
                  align: 'center',
                  color: '#FCFCFC'
                }
              ]
            },
            styles: {
              body: {
                backgroundColor: '#ffc94d'
              }
            }
          }
        ]
      }
    })
  }
})
// 在 port 啟動
bot.listen('/', process.env.PORT, () => {
  console.log('機器人已啟動')
})
