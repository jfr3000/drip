import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import AppIcon from '../common/app-icon'
import AppText from '../common/app-text'

import { connect } from 'react-redux'
import { getDate, setDate } from '../../slices/date'

import { nextDate, prevDate } from '../helpers/cycle-day'
import { Colors, Containers, Spacing, Typography } from '../../styles'
import { HIT_SLOP } from '../../config'

const SymptomPageTitle = ({ date, setDate, subtitle, title }) => {
  const navigate = (isForward) => {
    const newDate = isForward ? nextDate(date) : prevDate(date)
    setDate(newDate)
  }
  const formattedTitle =
    title.length > 21 ? title.substring(0, 18) + '...' : title

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate(false)} hitSlop={HIT_SLOP}>
        <AppIcon name="chevron-left" color={Colors.orange} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <AppText style={styles.title}>{formattedTitle}</AppText>
        {subtitle && <AppText style={styles.subtitle}>{subtitle}</AppText>}
      </View>
      <TouchableOpacity onPress={() => navigate(true)} hitSlop={HIT_SLOP}>
        <AppIcon name="chevron-right" color={Colors.orange} />
      </TouchableOpacity>
    </View>
  )
}

SymptomPageTitle.propTypes = {
  date: PropTypes.string.isRequired,
  setDate: PropTypes.func.isRequired,
  subtitle: PropTypes.string,
  title: PropTypes.string,
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

const mapStateToProps = (state) => {
  return {
    date: getDate(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDate: (date) => dispatch(setDate(date)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SymptomPageTitle)
