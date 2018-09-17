import config from '../../config'
import {primaryColor, shadesOfRed} from '../../styles/index'

const colorTemperature = '#765285'
const colorTemperatureLight = '#a67fb5'
const dotRadius = 5
const lineWidth = 1.5
const colorLtl = '#feb47b'
const gridColor = 'lightgrey'
const gridLineWidth = 0.5

const styles = {
  curve: {
    stroke: colorTemperature,
    strokeWidth: lineWidth,
  },
  curveExcluded: {
    stroke: colorTemperatureLight,
    strokeWidth: lineWidth
  },
  curveDots: {
    fill: colorTemperature,
    r: dotRadius
  },
  curveDotsExcluded: {
    fill: colorTemperatureLight,
    r: dotRadius
  },
  column: {
    label: {
      date: {
        color: 'grey',
        fontSize: 9,
        fontWeight: '100',
      },
      number: {
        color: primaryColor,
        fontSize: 13,
        textAlign: 'center',
      }
    },
    rect: {
      x:'0',
      y:'0',
      width: config.columnWidth,
      stroke: gridColor,
      strokeWidth: gridLineWidth,
      fill: 'transparent'
    }
  },
  bleedingIcon: {
    fill: '#fb2e01',
    scale: 0.6,
    x: 6,
    y: 3
  },
  bleedingIconShades: shadesOfRed,
  mucusIcon: {
    width: 12,
    height: 12,
    borderRadius: 50,
  },
  mucusIconShades: [
    '#fef0e4',
    '#fee1ca',
    '#fed2af',
    '#fec395',
    '#feb47b'
  ],
  yAxis: {
    width: 27,
    borderRightWidth: 0.5,
    borderColor: 'lightgrey',
    borderStyle: 'solid'
  },
  yAxisLabel: {
    position: 'absolute',
    left: 3,
    color: 'grey',
    fontSize: 11,
    textAlign: 'left'
  },
  horizontalGrid: {
    position:'absolute',
    borderColor: gridColor,
    borderWidth: gridLineWidth,
    width: '100%',
    borderStyle: 'solid',
    left: config.columnWidth
  },
  nfpLine: {
    stroke: colorLtl,
    strokeWidth: lineWidth,
  },
  symptomRow: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1
  }
}

export default styles