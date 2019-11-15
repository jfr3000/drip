import React, { Component } from 'react'
import {
  Text, View, TouchableOpacity
} from 'react-native'
import {
  Surface,
  Group as G,
  Path,
  Shape
} from 'react-native/Libraries/ART/ReactNativeART'
import { connect } from 'react-redux'

import { setDate } from '../../slices/date'

import { LocalDate } from 'js-joda'
import moment from 'moment'
import styles from './styles'
import config from '../../config'
import cycleModule from '../../lib/cycle'
import { getCycleDay } from '../../db'
import DotAndLine from './dot-and-line'
import { normalizeToScale } from './y-axis'

const label = styles.column.label

class DayColumn extends Component {
  constructor(props) {
    super()

    const { dateString, chartSymptoms, columnHeight } = props
    const cycleDayData = getCycleDay(dateString)
    this.data = {}

    if (cycleDayData) {
      this.data = chartSymptoms.reduce((symptomDataToDisplay, symptom, ) => {
        const symptomData = cycleDayData[symptom]

        if (symptomData && symptom === 'temperature') {
          symptomDataToDisplay[symptom] =
           this.getTemperatureProps(symptomData, columnHeight, dateString)
        } else {
          if (symptomData && ! symptomData.exclude) {
            // if symptomColorMethods entry doesn't exist for given symptom,
            // use 'default'
            const getSymptomColorIndex =
              this.symptomColorMethods[symptom] ||
              this.symptomColorMethods['default']

            symptomDataToDisplay[symptom] = getSymptomColorIndex(symptomData)
          }
        }

        return symptomDataToDisplay
      }, this.data)
    }

    this.fhmAndLtl = props.getFhmAndLtlInfo(
      props.dateString,
      this.data.temperature ? this.data.temperature.value : null,
      props.columnHeight
    )
  }

  getTemperatureProps = (symptomData, columnHeight, dateString) => {
    const extractedData = {}
    const { value, exclude } = symptomData
    const neighborTemperatureGraphPoints =
      getInfoForNeighborColumns(dateString, columnHeight)

    for (const key in neighborTemperatureGraphPoints) {
      extractedData[key] = neighborTemperatureGraphPoints[key]
    }
    return Object.assign({
      value,
      y: normalizeToScale(value, columnHeight),
      temperatureExclude: exclude,
    }, extractedData)
  }

  symptomColorMethods = {
    'mucus': (symptomData) => {
      const { feeling, texture } = symptomData
      const colorIndex = feeling + texture
      return colorIndex
    },
    'cervix': (symptomData) => {
      const { opening, firmness } = symptomData
      const isDataComplete = opening !== null && firmness !== null
      const isClosedAndHard =
        isDataComplete &&
        (opening === 0 && firmness === 0)
      const colorIndex = isClosedAndHard ? 0 : 2
      return colorIndex
    },
    'sex': (symptomData) => {
      const { solo, partner } = symptomData
      const colorIndex = (solo !== null && partner !== null) ?
        (solo + 2 * partner - 1) : 0
      return colorIndex
    },
    'bleeding': (symptomData) => {
      const { value } = symptomData
      const colorIndex = value
      return colorIndex
    },
    'default': () => { // desire, pain, mood, note
      const colorIndex = 0
      return colorIndex
    }
  }

  isSymptomDataComplete = (symptom) => {
    const { dateString } = this.props
    const cycleDayData = getCycleDay(dateString)
    const symptomData = cycleDayData[symptom]

    const dataCompletenessCheck = {
      'cervix': () => {
        const { opening, firmness } = symptomData
        return (opening !== null) && (firmness !== null)
      },
      'mucus': () => {
        const { feeling, texture } = symptomData
        return (feeling !== null) && (texture !== null)
      },
      'default': () => {
        return true
      }
    }
    return (dataCompletenessCheck[symptom] || dataCompletenessCheck['default'])()
  }

  onDaySelect = (date) => {
    this.props.setDate(date)
    this.props.navigate('CycleDay')
  }

  shouldComponentUpdate() {
    return false
  }

  drawSymptom = (symptom) => {

    const { symptomHeight } = this.props
    const shouldDrawSymptom = this.data.hasOwnProperty(symptom)
    const styleParent = [styles.symptomRow, {height: symptomHeight}]

    if (shouldDrawSymptom) {
      const styleSymptom = styles.iconShades[symptom]
      const symptomData = this.data[symptom]

      const dataIsComplete = this.isSymptomDataComplete(symptom)
      const isMucusOrCervix = (symptom === 'mucus') || (symptom === 'cervix')

      const backgroundColor = (isMucusOrCervix && !dataIsComplete) ?
        'white' : styleSymptom[symptomData]
      const borderWidth = (isMucusOrCervix && !dataIsComplete) ? 2 : 0
      const borderColor = styleSymptom[0]
      const styleChild = [styles.symptomIcon, {
        backgroundColor,
        borderColor,
        borderWidth
      }]

      return (
        <View style={styleParent} key={symptom}>
          <View style={styleChild} />
        </View>
      )
    } else {
      return (
        <View style={styleParent} key={symptom} />
      )
    }
  }

  render() {
    const columnElements = []
    const { dateString,
      symptomRowSymptoms,
      chartHeight,
      columnHeight,
      xAxisHeight } = this.props

    if(this.fhmAndLtl.drawLtlAt) {
      const ltlLine = (<Shape
        stroke={styles.nfpLine.stroke}
        strokeWidth={styles.nfpLine.strokeWidth}
        d={new Path()
          .moveTo(0, this.fhmAndLtl.drawLtlAt)
          .lineTo(config.columnWidth, this.fhmAndLtl.drawLtlAt)
        }
        key='ltl'
      />)
      columnElements.push(ltlLine)
    }

    if (this.fhmAndLtl.drawFhmLine) {
      const x = styles.nfpLine.strokeWidth / 2
      const fhmLine = (<Shape
        fill="red"
        stroke={styles.nfpLine.stroke}
        strokeWidth={styles.nfpLine.strokeWidth}
        d={new Path().moveTo(x, x).lineTo(x, columnHeight)}
        key='fhm'
      />)
      columnElements.push(fhmLine)
    }

    if (this.data && this.data.temperature && this.data.temperature.y) {
      const { temperatureExclude,
        y,
        rightY,
        leftY,
        rightTemperatureExclude,
        leftTemperatureExclude
      } = this.data.temperature

      columnElements.push(
        <DotAndLine
          y={y}
          exclude={temperatureExclude}
          rightY={rightY}
          rightTemperatureExclude={rightTemperatureExclude}
          leftY={leftY}
          leftTemperatureExclude={leftTemperatureExclude}
          key='dotandline'
        />
      )
    }

    const cycleDayNumber = cycleModule().getCycleDayNumber(dateString)
    const dayDate = LocalDate.parse(dateString)
    const shortDate = dayDate.dayOfMonth() === 1 ?
      moment(dateString, "YYYY-MM-DD").format('MMM')
      :
      moment(dateString, "YYYY-MM-DD").format('Do')
    const boldDateLabel = dayDate.dayOfMonth() === 1 ? {fontWeight: 'bold'} : {}

    const cycleDayLabel = (
      <Text style = {label.number}>
        {cycleDayNumber ? cycleDayNumber : ' '}
      </Text>)
    const dateLabel = (
      <Text style = {[label.date, boldDateLabel]}>
        {shortDate}
      </Text>
    )

    const column = (
      <G>
        <Shape
          stroke={styles.column.stroke.color}
          strokeWidth={styles.column.stroke.width}
          d={new Path().lineTo(0, chartHeight)}
        />
        { columnElements }
      </G>
    )

    return (
      <TouchableOpacity
        onPress={() => this.onDaySelect(dateString)}
        activeOpacity={1}
      >
        <View>
          {symptomRowSymptoms.map(symptom => this.drawSymptom(symptom))}
        </View>

        <Surface width={config.columnWidth} height={columnHeight}>
          {column}
        </Surface>

        <View style={{height: xAxisHeight}}>
          {cycleDayLabel}
          {dateLabel}
        </View>
      </TouchableOpacity>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return({
    setDate: (date) => dispatch(setDate(date)),
  })
}

export default connect(
  null,
  mapDispatchToProps,
)(DayColumn)


function getInfoForNeighborColumns(dateString, columnHeight) {
  const ret = {
    rightY: null,
    rightTemperatureExclude: null,
    leftY: null,
    leftTemperatureExclude: null
  }
  const target = LocalDate.parse(dateString)
  const dayBefore = target.minusDays(1).toString()
  const dayAfter = target.plusDays(1).toString()
  const cycleDayBefore = getCycleDay(dayBefore)
  const cycleDayAfter = getCycleDay(dayAfter)
  if (cycleDayAfter && cycleDayAfter.temperature) {
    ret.rightY = normalizeToScale(cycleDayAfter.temperature.value, columnHeight)
    ret.rightTemperatureExclude = cycleDayAfter.temperature.exclude
  }
  if (cycleDayBefore && cycleDayBefore.temperature) {
    ret.leftY = normalizeToScale(cycleDayBefore.temperature.value, columnHeight)
    ret.leftTemperatureExclude = cycleDayBefore.temperature.exclude
  }

  return ret
}
