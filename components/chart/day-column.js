import React, { Component } from 'react'
import {
  Text, View, TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import styles from './styles'
import config from '../../config'
import { getOrCreateCycleDay } from '../../db'
import cycleModule from '../../lib/cycle'
import DotAndLine from './dot-and-line'

const getCycleDayNumber = cycleModule().getCycleDayNumber
const label = styles.column.label

export default class DayColumn extends Component {
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
      bleeding,
      mucus,
      cervix,
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
      const ltlLine = (<View
        position = 'absolute'
        width={'100%'}
        top={drawLtlAt}
        {...styles.nfpLine}
        key='ltl'
      />)
      columnElements.push(ltlLine)
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

    const cycleDayNumber = getCycleDayNumber(dateString)
    const shortDate = dateString.split('-').slice(1).join('-')
    const cycleDayLabel = (
      <Text style={label.number}>
        {cycleDayNumber}
      </Text>)
    const dateLabel = (
      <Text style = {label.date}>
        {shortDate}
      </Text>
    )

    // we merge the colors here instead of from the stylesheet because of a RN
    // bug that doesn't apply borderLeftColor otherwise
    const customStyle = {
      height: columnHeight,
      borderLeftColor: 'grey',
      borderRightColor: 'grey'
    }

    if (drawFhmLine) {
      customStyle.borderLeftColor = styles.nfpLine.borderColor
      customStyle.borderLeftWidth = 3
    }
    const column = React.createElement(
      TouchableOpacity,
      {
        style: [styles.column.rect, customStyle],
        key: this.props.index.toString(),
        onPress: () => {
          this.passDateToDayView(dateString)
        },
        activeOpacity: 1
      },
      columnElements
    )

    return (
      <View>
        <View style={[styles.symptomRow, {height: symptomHeight}]}>
          {typeof mucus === 'number' &&
            <View
              {...styles.mucusIcon}
              backgroundColor={styles.mucusIconShades[mucus]}
              key='mucus'
            />
          }
          {typeof bleeding === 'number' &&
            <Icon
              name='drop'
              size={18}
              color='#900'
              key='bleeding'
            />
          }
        </View>

        {column}

        <View style={{height: xAxisHeight}}>
          {cycleDayLabel}
          {dateLabel}
        </View>
      </View>
    )
  }
}
