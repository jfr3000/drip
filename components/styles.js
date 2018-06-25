import config from './config'

const styles = {
  curve: {
    stroke: '#ffc425',
    strokeWidth: 2
  },
  curveDots: {
    fill: '#00aedb',
    r: 6
  },
  column: {
    label: {
      date: {
        stroke: 'grey',
        fontSize: 10,
        x: 2
      },
      number: {
        stroke: 'purple',
        fontSize: 13,
        x: config.columnMiddle - 1
      }
    },
    rect: {
      fill: '#f9f9f9',
      strokeWidth: 1,
      stroke: 'grey',
      x: 0,
      y: 0,
      width: config.columnWidth,
      height: config.chartLength
    }
  },
  bleedingIcon: {
    fill: '#fb2e01',
    scale: 0.6,
    x: 7,
    y: 3
  }
}

export default styles