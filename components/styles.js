import config from './config'

const styles = {
  curve: {
    stroke: 'lightseagreen',
    strokeWidth: 2
  },
  curveDots: {
    fill: 'darkblue',
    r: 4
  },
  column: {
    label: {
      stroke: 'grey',
      fontSize: 10,
      x: 0
    },
    rect: {
      fill: 'lightgrey',
      strokeWidth: 1,
      stroke: 'grey',
      x: 0,
      y: 0,
      width: config.columnWidth,
      height: config.chartLength
    }
  },
  bleedingIcon: {
    cx: config.columnMiddle,
    cy: 50,
    r: 7,
    fill: 'red'
  }
}

export default styles