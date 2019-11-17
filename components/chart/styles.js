import config from '../../config'
import { shadesOfRed, cycleDayColor } from '../../styles/index'

const colorTemperature = '#765285'
const colorTemperatureLight = '#a67fb5'
export const dotRadius = 5
const lineWidth = 1.5
const colorLtl = '#feb47b'
const gridColor = '#d3d3d3'
const gridLineWidthVertical = 0.6
const gridLineWidthHorizontal = 0.3
const numberLabelFontSize = 13

const redColor = '#c3000d'
const violetColor = '#7689a9'
const shadesOfViolet = ['#e3e7ed', '#c8cfdc', '#acb8cb', '#91a0ba', violetColor] // light to dark
const yellowColor = '#dbb40c'
const shadesOfYellow = ['#f0e19d', '#e9d26d', '#e2c33c', yellowColor] // light to dark
const magentaColor = '#6f2565'
const shadesOfMagenta = ['#a87ca2', '#8b5083', magentaColor] // light to dark
const pinkColor = '#9e346c'
const shadesOfPink = ['#c485a6', '#b15c89', pinkColor] // light to dark
const lightGreenColor = '#bccd67'
const orangeColor = '#bc6642'
const mintColor = '#6ca299'

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
        paddingTop: 2.5
      },
      number: {
        color: cycleDayColor,
        fontSize: numberLabelFontSize,
        textAlign: 'center',
      }
    },
    stroke: {
      color: gridColor,
      width: gridLineWidthVertical,
    }
  },
  symptomDot: {
    width: 12,
    height: 12,
    borderRadius: 50,
  },
  iconColors: {
    'bleeding': {
      color: redColor,
      shades: shadesOfRed,
    },
    'mucus': {
      color: violetColor,
      shades: shadesOfViolet,
    },
    'cervix': {
      color: yellowColor,
      shades: shadesOfYellow,
    },
    'sex': {
      color: magentaColor,
      shades: shadesOfMagenta,
    },
    'desire': {
      color: pinkColor,
      shades: shadesOfPink,
    },
    'pain': {
      color: lightGreenColor,
      shades: [lightGreenColor],
    },
    'mood': {
      color: orangeColor,
      shades: [orangeColor],
    },
    'note': {
      color: mintColor,
      shades: [mintColor],
    },
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
      justifyContent: 'center',
      color: 'grey',
      fontSize: 9,
      fontWeight: '100',
    }
  },
  symptomIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartLegend: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldTick: {
    fontWeight: 'bold',
    fontSize: 11,
  },
  horizontalGrid: {
    position:'absolute',
    borderStyle: 'solid',
    borderBottomColor: gridColor,
    borderBottomWidth: gridLineWidthHorizontal,
    width: '100%',
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