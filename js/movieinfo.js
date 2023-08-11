export const movieInfoStyle = (imageUrl, chName, enName, releaseDate, director, actors, information) => {
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
              ],
              height: '10%'
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
                      text: releaseDate,
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
                      text: (director !== '') ? director : '無',
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
                      text: (actors !== '') ? actors : '無',
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
                uri: information
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
}
