import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import moment from 'moment'

import AppText from '../common/app-text'

import cycleModule from '../../lib/cycle'
import { getOrdinalSuffix } from '../helpers/home'
import { Containers, Typography } from '../../styles'

const CycleDayLabel = ({ height, date }) => {
  const cycleDayNumber = cycleModule().getCycleDayNumber(date)
  const cycleDayLabel = cycleDayNumber ? cycleDayNumber : ' '

  const momentDate = moment(date)
  const dayOfMonth = momentDate.date()
  const isFirstDayOfMonth = dayOfMonth === 1

  return (
    <View style={[styles.container, { height }]}>
      <AppText style={styles.textBold}>{cycleDayLabel}</AppText>
      <View style={styles.dateLabel}>
        <AppText style={styles.text}>
          {isFirstDayOfMonth ? momentDate.format('MMM') : dayOfMonth}
        </AppText>
        {!isFirstDayOfMonth &&
          <AppText style={styles.textLight}>
            {getOrdinalSuffix(dayOfMonth)}
          </AppText>
        }
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
    ...Typography.label,
    fontSize: 12
  },
  textBold: {
    ...Typography.labelBold
  },
  textLight: {
    ...Typography.labelLight,
  },
  dateLabel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
})

export default CycleDayLabel
