import config from './config'

const styles = {
  curve: {
    stroke: '#ffc425',
    strokeWidth: 2
  },
  curveExcluded: {
    stroke: 'lightgrey',
    strokeWidth: 2,
    strokeDashArray: [4]
  },
  curveDots: {
    fill: '#00aedb',
    r: 6
  },
  curveDotsExcluded: {
    fill: 'lightgrey',
    r: 6
  },
  column: {
    label: {
      date: {
        stroke: 'grey',
        fontSize: 10,
        x: 2,
        fontWeight: '100'
      },
      number: {
        stroke: '#00b159',
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
      height: config.chartHeight
    }
  },
  bleedingIcon: {
    fill: '#fb2e01',
    scale: 0.6,
    x: 6,
    y: 3
  },
  mucusIcon: {
    cx: config.columnWidth / 2,
    cy: 50,
    r: 10
  },
  mucusIconShades: [
    '#cc99cc',
    '#bf7fbf',
    '#b266b2',
    '#a64ca6',
    '#993299'
  ],
  yAxis: {
    height: config.chartHeight,
    width: config.columnWidth,
  },
  yAxisLabel: {
    position: 'absolute',
    right: 3,
    color: 'grey',
    fontSize: 12,
    fontWeight: 'bold'
  },
  horizontalGrid: {
    stroke: 'lightgrey',
    strokeWidth: 1
  }
}

export default styles