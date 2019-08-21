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
    const dateString = props.dateString
    const columnHeight = props.columnHeight
    this.getCycleDayNumber = cycleModule().getCycleDayNumber
    const cycleDay = getCycleDay(dateString)
    this.data = {}
    if (cycleDay) {
      this.data = props.chartSymptoms.reduce((acc, symptom) => {
        if (['bleeding', 'temperature', 'mucus', 'desire', 'note'].includes(symptom)) {
          acc[symptom] = cycleDay[symptom] && cycleDay[symptom].value
          if (symptom === 'temperature' && acc.temperature) {
            acc.y = normalizeToScale(acc.temperature, columnHeight)
            const neighbor = getInfoForNeighborColumns(dateString, columnHeight)
            for (const key in neighbor) {
              acc[key] = neighbor[key]
            }
          }
        } else if (symptom === 'cervix') {
          acc.cervix = cycleDay.cervix &&
            (cycleDay.cervix.opening + cycleDay.cervix.firmness)
        } else if (symptom === 'sex') {
          // solo = 1 + partner = 2
          acc.sex = cycleDay.sex &&
            (cycleDay.sex.solo + 2 * cycleDay.sex.partner)
        } else if (symptom === 'pain') {
          // is any pain documented?
          acc.pain = cycleDay.pain &&
            Object.values({...cycleDay.pain}).some(x => x === true)
        } else if (symptom === 'mood') {
          // is mood documented?
          acc.mood = cycleDay.mood &&
            Object.values({...cycleDay.mood}).some(x => x === true)
        }
        acc[`${symptom}Exclude`] = cycleDay[symptom] && cycleDay[symptom].exclude
        return acc
      }, this.data)
    }

    this.fhmAndLtl = props.getFhmAndLtlInfo(
      props.dateString,
      this.data.temperature,
      props.columnHeight
    )
  }

  onDaySelect = (date) => {
    this.props.setDate(date)
    this.props.navigate('CycleDay')
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const columnElements = []
    const dateString = this.props.dateString
    const symptomHeight = this.props.symptomHeight

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
        d={new Path()
          .moveTo(x, x)
          .lineTo(x, this.props.columnHeight)
        }
        key='fhm'
      />)
      columnElements.push(fhmLine)
    }


    if (this.data.y) {
      columnElements.push(
        <DotAndLine
          y={this.data.y}
          exclude={this.data.temperatureExclude}
          rightY={this.data.rightY}
          rightTemperatureExclude={this.data.rightTemperatureExclude}
          leftY={this.data.leftY}
          leftTemperatureExclude={this.data.leftTemperatureExclude}
          key='dotandline'
        />
      )
    }

    const cycleDayNumber = this.getCycleDayNumber(dateString)
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
          d={new Path().lineTo(0, this.props.chartHeight)}
        />
        { columnElements }
      </G>
    )

    const symptomIconViews = {
      bleeding: (
        <SymptomIconView
          value={this.data.bleeding}
          symptomHeight={symptomHeight}
          key='bleeding'
        >
          <View
            {...styles.symptomIcon}
            backgroundColor={styles.iconShades.bleeding[this.data.bleeding]}
          />
        </SymptomIconView>
      ),
      mucus: (
        <SymptomIconView
          value={this.data.mucus}
          symptomHeight={symptomHeight}
          key='mucus'
        >
          <View
            {...styles.symptomIcon}
            backgroundColor={styles.iconShades.mucus[this.data.mucus]}
          />
        </SymptomIconView>
      ),
      cervix: (
        <SymptomIconView
          value={this.data.cervix}
          symptomHeight={symptomHeight}
          key='cervix'
        >
          <View
            {...styles.symptomIcon}
            // cervix is sum of openess and firmness - fertile only when closed and hard (=0)
            backgroundColor={this.data.cervix > 0 ?
              styles.iconShades.cervix[2] :
              styles.iconShades.cervix[0]
            }
          />
        </SymptomIconView>
      ),
      sex: (
        <SymptomIconView
          value={this.data.sex}
          symptomHeight={symptomHeight}
          key='sex'
        >
          <View
            {...styles.symptomIcon}
            backgroundColor={styles.iconShades.sex[this.data.sex - 1]}
          />
        </SymptomIconView>
      ),
      desire: (
        <SymptomIconView
          value={this.data.desire}
          symptomHeight={symptomHeight}
          key='desire'
        >
          <View
            {...styles.symptomIcon}
            backgroundColor={styles.iconShades.desire[this.data.desire]}
          />
        </SymptomIconView>
      ),
      pain: (
        <SymptomIconView
          value={this.data.pain}
          symptomHeight={symptomHeight}
          key='pain'
        >
          <View
            {...styles.symptomIcon}
            backgroundColor={styles.iconShades.pain}
          />
        </SymptomIconView>
      ),
      mood: (
        <SymptomIconView
          value={this.data.mood}
          symptomHeight={symptomHeight}
          key='mood'
        >
          <View
            {...styles.symptomIcon}
            backgroundColor={styles.iconShades.mood}
          />
        </SymptomIconView>
      ),
      note: (
        <SymptomIconView
          value={this.data.note}
          symptomHeight={symptomHeight}
          key='note'
        >
          <View
            {...styles.symptomIcon}
            backgroundColor={styles.iconShades.note}
          />
        </SymptomIconView>
      )
    }

    return (
      <TouchableOpacity
        onPress={() => this.onDaySelect(dateString)}
        activeOpacity={1}
      >
        <View>
          {this.props.symptomRowSymptoms.map(symptomName => {
            return symptomIconViews[symptomName]
          })}
        </View>

        <Surface width={config.columnWidth} height={this.props.columnHeight}>
          {column}
        </Surface>

        <View style={{height: this.props.xAxisHeight}}>
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



function SymptomIconView(props) {
  const style = [styles.symptomRow, {height: props.symptomHeight}]
  return (
    <View style={style}>
      {(typeof props.value === 'number' || props.value === true || typeof props.value === 'string') &&
        props.children
      }
    </View>
  )
}

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
