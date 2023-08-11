export const notReleaseStyle = (chName, index) => {
  return {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'image',
          url: 'https://res.cloudinary.com/dxrxiuei6/image/upload/v1658325828/LineRobot/unknow_movie_arw6x1.jpg',
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
                  text: '台灣目前未上映',
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
              text: `${index}`,
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
