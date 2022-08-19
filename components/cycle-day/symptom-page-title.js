import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import AppIcon from '../common/app-icon'
import AppText from '../common/app-text'

import cycleModule from '../../lib/cycle'
import { dateToTitle } from '../helpers/format-date'

import { general as labels } from '../../i18n/en/cycle-day'
import { Colors, Containers, Spacing, Typography } from '../../styles'
import { HIT_SLOP } from '../../config'

const SymptomPageTitle = ({ date, onNextCycleDay, onPrevCycleDay }) => {
  const title = dateToTitle(date)

  const { getCycleDayNumber } = cycleModule()
  const cycleDayNumber = getCycleDayNumber(date)
  const subtitle = cycleDayNumber && `${labels.cycleDayNumber}${cycleDayNumber}`

  const formattedTitle =
    title.length > 21 ? title.substring(0, 18) + '...' : title

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrevCycleDay} hitSlop={HIT_SLOP}>
        <AppIcon name="chevron-left" color={Colors.orange} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <AppText style={styles.title}>{formattedTitle}</AppText>
        {subtitle && <AppText style={styles.subtitle}>{subtitle}</AppText>}
      </View>
      <TouchableOpacity onPress={onNextCycleDay} hitSlop={HIT_SLOP}>
        <AppIcon name="chevron-right" color={Colors.orange} />
      </TouchableOpacity>
    </View>
  )
}

SymptomPageTitle.propTypes = {
  date: PropTypes.string.isRequired,
  onNextCycleDay: PropTypes.func.isRequired,
  onPrevCycleDay: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    height: Spacing.base * 4,
    marginHorizontal: Spacing.base,
    marginTop: Spacing.base,
    ...Containers.rowContainer,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    ...Typography.titleWithoutMargin,
  },
})

export default SymptomPageTitle
