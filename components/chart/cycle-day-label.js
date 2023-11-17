import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import moment from 'moment'

import AppText from '../common/app-text'

import cycleModule from '../../lib/cycle'
import { getOrdinalSuffix } from '../helpers/home'
import { Typography, Sizes } from '../../styles'

const CycleDayLabel = ({ height, date }) => {
  const cycleDayNumber = cycleModule().getCycleDayNumber(date)
  const cycleDayLabel = cycleDayNumber ? cycleDayNumber : ' '

  const momentDate = moment(date)
  const dayOfMonth = momentDate.date()
  const isFirstDayOfMonth = dayOfMonth === 1

  return (
    <View style={[styles.container, { height }]}>
      <View style={{ ...styles.labelRow, height: height / 2 }}>
        <AppText style={styles.textBold}>{cycleDayLabel}</AppText>
      </View>

      <View style={{ ...styles.labelRow, height: height / 2 }}>
        {isFirstDayOfMonth && (
          <AppText style={styles.textFootnote}>
            {momentDate.format('MMM')}
          </AppText>
        )}

        {!isFirstDayOfMonth && (
          <AppText style={styles.textSmall}>{dayOfMonth}</AppText>
        )}
        {!isFirstDayOfMonth && (
          <AppText style={styles.textLight}>
            {getOrdinalSuffix(dayOfMonth)}
          </AppText>
        )}
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
  textSmall: {
    ...Typography.label,
    fontSize: Sizes.small,
  },
  textFootnote: {
    ...Typography.label,
    fontSize: Sizes.footnote,
  },
  textBold: {
    ...Typography.labelBold,
  },
  textLight: {
    ...Typography.labelLight,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})

export default CycleDayLabel
