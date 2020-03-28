import React from 'react'
import PropTypes from 'prop-types'

import { Text, View } from 'react-native'

import moment from 'moment'
import { LocalDate } from 'js-joda'

import styles from './styles'
import cycleModule from '../../lib/cycle'

const CycleDayLabel = ({ height, date }) => {
  const { label } = styles.column
  const dayDate = LocalDate.parse(date)
  const cycleDayNumber = cycleModule().getCycleDayNumber(date)

  const isFirstDayOfMonth = dayDate.dayOfMonth() === 1
  const dateFormatting = isFirstDayOfMonth ? 'MMM' : 'Do'
  const shortDate = moment(date, "YYYY-MM-DD").format(dateFormatting)
  const boldDateLabel = isFirstDayOfMonth ? {fontWeight: 'bold'} : {}

  return (
    <View style={[styles.chartLegend, { height }]}>
      <Text style={label.number}>
        {cycleDayNumber ? cycleDayNumber : ' '}
      </Text>
      <Text style={[label.date, boldDateLabel]}>
        {shortDate}
      </Text>
    </View>
  )
}

CycleDayLabel.propTypes = {
  height: PropTypes.number,
  date: PropTypes.string,
}

export default CycleDayLabel
