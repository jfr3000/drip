import React, { Component } from 'react'
import {
  Text, View, TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import styles from './styles'
import config from './config'
import { getOrCreateCycleDay } from '../../db'
import cycleModule from '../../lib/cycle'
import setUpFertilityStatusFunc from './nfp-lines'
import DotAndLine from './dot-and-line'

const getCycleDayNumber = cycleModule().getCycleDayNumber
const label = styles.column.label
const getFhmAndLtlInfo = setUpFertilityStatusFunc()

export default class DayColumn extends Component {
  passDateToDayView(dateString) {
    const cycleDay = getOrCreateCycleDay(dateString)
    this.props.navigate('cycleDay', { cycleDay })
  }

  shouldComponentUpdate(newProps) {
    return Object.keys(newProps).some(key => newProps[key] != this.props[key])
  }

  render() {
    const {
      dateString,
      y,
      temperature,
      temperatureExclude,
      bleeding,
      mucus
    } = this.props
    const nfpLineInfo = getFhmAndLtlInfo(dateString, temperature)

    const columnElements = []
    if (typeof bleeding === 'number') {
      columnElements.push(
        <Icon
          name='drop'
          position='absolute'
          top = {10}
          left = {20}
          size={30}
          color='#900'
          style={{ marginTop: 20 }}
          key='bleeding'
        />
      )
    }

    if (typeof mucus === 'number') {
      const mucusIcon = (
        <View
          position='absolute'
          top = {40}
          left = {config.columnMiddle - styles.mucusIcon.width / 2}
          {...styles.mucusIcon}
          backgroundColor={styles.mucusIconShades[mucus]}
          key='mucus'
        />
      )
      columnElements.push(mucusIcon)
    }

    if(nfpLineInfo.drawFhmLine) {
      const fhmLine = (<View
        position = 'absolute'
        top={100}
        width={styles.nfpLine.strokeWidth}
        height={200}
        {...styles.nfpLine}
        key='fhm'
      />)
      columnElements.push(fhmLine)
    }

    if(nfpLineInfo.drawLtlAt) {
      const ltlLine = (<View
        position = 'absolute'
        width={'100%'}
        top={nfpLineInfo.drawLtlAt}
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
          rightY={this.props.rightY}
          rightTemperatureExclude={this.props.rightTemperatureExclude}
          leftY={this.props.leftY}
          leftTemperatureExclude={this.props.leftTemperatureExclude}
          key='dotandline'
        />
      )
    }

    const cycleDayNumber = getCycleDayNumber(dateString)
    const shortDate = dateString.split('-').slice(1).join('-')
    const cycleDayLabel = (
      <Text style={label.number} y={config.cycleDayNumberRowY}>
        {cycleDayNumber}
      </Text>)
    const dateLabel = (
      <Text style = {label.date} y={config.dateRowY}>
        {shortDate}
      </Text>
    )
    columnElements.push(
      <View position='absolute' bottom={0} key='date'>
        {cycleDayLabel}
        {dateLabel}
      </View>
    )

    return React.createElement(
      TouchableOpacity,
      {
        style: styles.column.rect,
        key: this.props.index.toString(),
        onPress: () => {
          this.passDateToDayView(dateString)
        },
        activeOpacity: 1
      },
      columnElements
    )
  }
}