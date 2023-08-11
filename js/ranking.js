export const rankingStyle = (imageUrl, chName, enName, infoUrl, index) => {
  return {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'image',
          url: imageUrl,
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
                  text: (chName !== '') ? chName : ' ',
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
                  text: (enName !== '') ? enName : ' ',
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
