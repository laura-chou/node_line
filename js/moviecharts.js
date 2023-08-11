export const movieChartsStyle = {
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
