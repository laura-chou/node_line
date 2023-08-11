export const noDataStyle = {
  type: 'bubble',
  hero: {
    type: 'image',
    url: 'https://res.cloudinary.com/dxrxiuei6/image/upload/v1658407798/LineRobot/sorry_o1i6m1.png',
    size: 'full',
    aspectRatio: '20:13',
    aspectMode: 'fit',
    backgroundColor: '#006000',
    offsetTop: 'sm'
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
    hero: {
      backgroundColor: '#006000'
    },
    body: {
      backgroundColor: '#006000'
    }
  }
}
