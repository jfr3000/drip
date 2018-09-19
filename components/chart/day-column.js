import React, { Component } from 'react'
import {
  Text, View, TouchableOpacity
} from 'react-native'
import Svg,{ G, Rect, Line } from 'react-native-svg'
import Icon from 'react-native-vector-icons/Entypo'
import styles from './styles'
import config from '../../config'
import { getOrCreateCycleDay } from '../../db'
import cycleModule from '../../lib/cycle'
import DotAndLine from './dot-and-line'

const label = styles.column.label

export default class DayColumn extends Component {
  constructor() {
    super()
    this.getCycleDayNumber = cycleModule().getCycleDayNumber
  }
  passDateToDayView(dateString) {
    const cycleDay = getOrCreateCycleDay(dateString)
    this.props.navigate('CycleDay', { cycleDay })
  }

  shouldComponentUpdate(newProps) {
    return Object.keys(newProps).some(key => newProps[key] != this.props[key])
  }

  render() {
    const {
      dateString,
      y,
      temperatureExclude,
      drawFhmLine,
      drawLtlAt,
      rightY,
      rightTemperatureExclude,
      leftY,
      leftTemperatureExclude,
      columnHeight,
      symptomHeight,
      chartHeight,
      symptomRowSymptoms,
      xAxisHeight
    } = this.props


    const columnElements = []

    if(drawLtlAt) {
      const ltlLine = (<Line
        x1={0}
        y1={drawLtlAt}
        x2={config.columnWidth}
        y2={drawLtlAt}
        {...styles.nfpLine}
        key='ltl'
      />)
      columnElements.push(ltlLine)
    }

    if (drawFhmLine) {
      const x = styles.nfpLine.strokeWidth / 2
      const fhmLine = (<Line
        x1={x}
        y1={x}
        x2={x}
        y2={columnHeight}
        {...styles.nfpLine}
        key='fhm'
      />)
      columnElements.push(fhmLine)
    }


    if (y) {
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

    const cycleDayNumber = this.getCycleDayNumber(dateString)
    const shortDate = dateString.split('-').slice(1).join('-')
    const cycleDayLabel = (
      <Text style = {label.number}>
        {cycleDayNumber ? cycleDayNumber : ' '}
      </Text>)
    const dateLabel = (
      <Text style = {label.date}>
        {shortDate}
      </Text>
    )

    const column = (
      <G>
        <Rect
          height={chartHeight}
          {...styles.column.rect}
        />
        { columnElements }
      </G>
    )

    const symptomIconViews = {
      bleeding: (
        <SymptomIconView
          value={this.props.bleeding}
          symptomHeight={symptomHeight}
          key='bleeding'
        >
          <Icon
            name='drop'
            size={12}
            color={styles.bleedingIconShades[this.props.bleeding]}
          />
        </SymptomIconView>
      ),
      mucus: (
        <SymptomIconView
          value={this.props.mucus}
          symptomHeight={symptomHeight}
          key='mucus'
        >
          <View
            {...styles.mucusIcon}
            backgroundColor={styles.mucusIconShades[this.props.mucus]}
          />
        </SymptomIconView>
      ),
      cervix: (
        <SymptomIconView
          value={this.props.cervix}
          symptomHeight={symptomHeight}
          key='cervix'
        >
          <View
            {...styles.mucusIcon}
            // cervix is sum of openess and firmness - fertile only when closed and hard (=0)
            backgroundColor={this.props.cervix > 0 ? 'blue' : 'green'}
          />
        </SymptomIconView>
      ),
      sex: (
        <SymptomIconView
          value={this.props.sex}
          symptomHeight={symptomHeight}
          key='sex'
        >
          <View
            {...styles.mucusIcon}
            backgroundColor='orange'
          />
        </SymptomIconView>
      ),
      desire: (
        <SymptomIconView
          value={this.props.desire}
          symptomHeight={symptomHeight}
          key='desire'
        >
          <View
            {...styles.mucusIcon}
            backgroundColor='red'
          />
        </SymptomIconView>
      ),
      pain: (
        <SymptomIconView
          value={this.props.pain}
          symptomHeight={symptomHeight}
          key='pain'
        >
          <View
            {...styles.mucusIcon}
            backgroundColor='blue'
          />
        </SymptomIconView>
      ),
      note: (
        <SymptomIconView
          value={this.props.note}
          symptomHeight={symptomHeight}
          key='note'
        >
          <View
            {...styles.mucusIcon}
            backgroundColor='green'
          />
        </SymptomIconView>
      )
    }

    return (
      <TouchableOpacity
        onPress={() => this.passDateToDayView(dateString)}
        activeOpacity={1}
      >
        <View>
          {symptomRowSymptoms.map(symptomName => symptomIconViews[symptomName])}
        </View>

        <Svg width={config.columnWidth} height={columnHeight}>
          {column}
        </Svg>

        <View style={{height: xAxisHeight}}>
          {cycleDayLabel}
          {dateLabel}
        </View>
      </TouchableOpacity>
    )
  }
}


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

