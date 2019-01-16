import config from '../../config'
import { shadesOfRed, cycleDayColor } from '../../styles/index'

const colorTemperature = '#765285'
const colorTemperatureLight = '#a67fb5'
export const dotRadius = 5
const lineWidth = 1.5
const colorLtl = '#feb47b'
const gridColor = '#d3d3d3'
const gridLineWidth = 0.5
const numberLabelFontSize = 13

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
        textAlign: 'center',
      },
      number: {
        color: cycleDayColor,
        fontSize: numberLabelFontSize,
        textAlign: 'center',
      }
    },
    stroke: {
      color: gridColor,
      width: gridLineWidth,
    }
  },
  symptomIcon: {
    width: 12,
    height: 12,
    borderRadius: 50,
  },
  iconShades: {
    'bleeding': shadesOfRed,
    'mucus': [
      '#e3e7ed',
      '#c8cfdc',
      '#acb8cb',
      '#91a0ba',
      '#7689a9'
    ],
    'cervix': [
      '#f0e19d',
      '#e9d26d',
      '#e2c33c',
      '#dbb40c',
    ],
    'sex': [
      '#a87ca2',
      '#8b5083',
      '#6f2565',
    ],
    'desire': [
      '#c485a6',
      '#b15c89',
      '#9e346c',
    ],
    'pain': ['#bccd67'],
    'mood': ['#BC6642'],
    'note': ['#6CA299']
  },
  yAxis: {
    width: 27,
    borderRightWidth: 1,
    borderColor: 'lightgrey',
    borderStyle: 'solid'
  },
  yAxisLabels: {
    tempScale: {
      position: 'absolute',
      right: 2,
      color: 'grey',
      fontSize: 9,
      textAlign: 'left'
    },
    cycleDayLabel: {
      textAlign: 'center',
      justifyContent: 'center',
      fontSize: Math.ceil(numberLabelFontSize / 2)
    },
    dateLabel: {
      textAlign: 'center',
      justifyContent: 'center'
    }
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
  },
  loadingMore: {
    height: '100%',
    backgroundColor: 'lightgrey',
    justifyContent: 'center'
  }
}

export default styles