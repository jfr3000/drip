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
      symptoms,
      drawFhmLine,
      drawLtlAt,
      rightY,
      rightTemperatureExclude,
      leftY,
      leftTemperatureExclude,
      chartHeight
    } = this.props

    const columnHeight = chartHeight * config.columnHeightPercentage
    const xAxisHeight = chartHeight * config.xAxisHeightPercentage
    const symptomHeight = chartHeight * config.symptomRowHeightPercentage

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
        key='ltl'
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

    return (
      <TouchableOpacity
        onPress={() => this.passDateToDayView(dateString)}
        activeOpacity={1}
      >
        <View height={symptomHeight}>
          <View style={styles.symptomRow}>
            {typeof symptoms.bleeding === 'number' &&
              <Icon
                name='drop'
                size={12}
                color={styles.bleedingIconShades[symptoms.bleeding]}
                key='bleeding'
              />
            }
          </View>
          <View style={styles.symptomRow}>
            {typeof symptoms.mucus === 'number' &&
              <View
                {...styles.mucusIcon}
                backgroundColor={styles.mucusIconShades[symptoms.mucus]}
                key='mucus'
              />
            }
          </View>
          <View style={styles.symptomRow}>
            {typeof symptoms.cervix === 'number' &&
              <View
                {...styles.mucusIcon}
                // cervix is sum of openess and firmness - fertile only when closed and hard (=0)
                backgroundColor={symptoms.cervix > 0 ? 'blue' : 'green'}
                key='cervix'
              />
            }
          </View>
          <View style={styles.symptomRow}>
            {typeof symptoms.sex === 'number' &&
              <View
                {...styles.mucusIcon}
                backgroundColor='orange'
                key='sex'
              />
            }
          </View>
          <View style={styles.symptomRow}>
            {typeof symptoms.desire === 'number' &&
              <View
                {...styles.mucusIcon}
                backgroundColor='red'
                key='desire'
              />
            }
          </View>
          <View style={styles.symptomRow}>
            {symptoms.pain &&
              <View
                {...styles.mucusIcon}
                backgroundColor='blue'
                key='pain'
              />
            }
          </View>
          <View style={styles.symptomRow}>
            {symptoms.note &&
              <View
                {...styles.mucusIcon}
                backgroundColor='green'
                key='note'
              />
            }
          </View>
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
