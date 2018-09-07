import config from '../../config'
import {primaryColor, shadesOfRed} from '../../styles/index'

const colorTemperatur = '#765285'
const colorTemperaturLight = '#a67fb5'
const dotWidth = 10
const lineWidth = 2
const colorLtl = '#feb47b'

const styles = {
  curve: {
    borderStyle: 'solid',
    borderColor: colorTemperatur,
    borderWidth: lineWidth,
  },
  curveExcluded: {
    borderColor: colorTemperaturLight,
    borderWidth: lineWidth,
    borderStyle: 'dotted'
  },
  curveDots: {
    backgroundColor: colorTemperatur,
    width: dotWidth,
    height: dotWidth,
    borderRadius: 50
  },
  curveDotsExcluded: {
    backgroundColor: colorTemperaturLight,
    width: dotWidth,
    height: dotWidth,
    borderRadius: 50
  },
  column: {
    label: {
      date: {
        color: 'grey',
        fontSize: 9,
        fontWeight: '100'
      },
      number: {
        color: primaryColor,
        fontSize: 13,
        textAlign: 'center'
      }
    },
    rect: {
      width: config.columnWidth,
      borderStyle: 'solid',
      borderRightWidth: 0.25,
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
    width: config.columnWidth,
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
    borderColor: 'lightgrey',
    borderTopWidth: 0.25,
    width: '100%',
    borderStyle: 'solid',
    left: config.columnWidth
  },
  nfpLine: {
    borderColor: colorLtl,
    borderWidth: lineWidth,
    borderStyle: 'solid'
  },
  symptomRow: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1
  }
}

export default styles