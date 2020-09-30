import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { LocalDate } from 'js-joda'
import moment from 'moment'

import AppText from '../common/app-text'

import cycleModule from '../../lib/cycle'
import { getOrdinalSuffix } from '../helpers/home'
import { Containers, Typography } from '../../styles'

const CycleDayLabel = ({ height, date }) => {
  const dayDate = LocalDate.parse(date)
  const cycleDayNumber = cycleModule().getCycleDayNumber(date)

  const isFirstDayOfMonth = dayDate.dayOfMonth() === 1
  const dateFormatting = isFirstDayOfMonth ? 'MMM' : 'D'
  const shortDate = moment(date, "YYYY-MM-DD").format(dateFormatting)
  const ending = isFirstDayOfMonth ?
    '' : getOrdinalSuffix(this.cycleDayNumber)
  const cycleDayLabel = cycleDayNumber ? cycleDayNumber : ' '

  return (
    <View style={[styles.container, { height }]}>
      <AppText style={styles.textBold}>{cycleDayLabel}</AppText>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        <AppText style={styles.text}>{shortDate}</AppText>
        <AppText style={styles.textLight}>{ending}</AppText>
      </View>
    </View>
  )
}

CycleDayLabel.propTypes = {
  height: PropTypes.number,
  date: PropTypes.string,
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    left: 4,
  },
  containerRow: {
    ...Containers.rowContainer
  },
  text: {
    ...Typography.label
  },
  textBold: {
    ...Typography.labelBold
  },
  textLight: {
    ...Typography.labelLight
  }
})

export default CycleDayLabel
