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
      <Text style = {label.number}>
        {cycleDayNumber ? cycleDayNumber : ' '}
      </Text>)
    const dateLabel = (
      <Text style = {label.date}>
        {shortDate}
      </Text>
    )

    // we merge the colors here instead of from the stylesheet because of a RN
    // bug that doesn't apply borderLeftColor otherwise
    const potentialCustomStyle = {
      height: columnHeight,
      borderLeftColor: 'grey',
    }

    if (drawFhmLine) {
      potentialCustomStyle.borderLeftColor = styles.nfpLine.borderColor
      potentialCustomStyle.borderLeftWidth = 3
    }
    const column = React.createElement(
      TouchableOpacity,
      {
        style: [styles.column.rect, potentialCustomStyle],
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
        {column}

        <View style={{height: xAxisHeight}}>
          {cycleDayLabel}
          {dateLabel}
        </View>
      </View>
    )
  }
}