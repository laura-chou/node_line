export const errorStyle = {
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
}
