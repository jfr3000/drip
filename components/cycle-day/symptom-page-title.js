import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import AppIcon from '../common/app-icon'
import AppText from '../common/app-text'

import { connect } from 'react-redux'
import { getDate, setDate } from '../../slices/date'

import {
  nextDate,
  prevDate,
  isTomorrowInFuture,
  isYesterdayInFuture
} from '../helpers/cycle-day'
import { Colors, Containers, Spacing, Typography } from '../../styles/redesign'

const SymptomPageTitle = ({
  date,
  reloadSymptomData,
  setDate,
  subtitle,
  title
}) => {
  const rightArrowColor = isTomorrowInFuture(date) ? Colors.grey : Colors.orange
  const leftArrowColor = isYesterdayInFuture(date) ? Colors.grey : Colors.orange
  const navigate = (isForward) => {
    const nextDay = isForward ? nextDate(date) : prevDate(date)
    reloadSymptomData(nextDay)
    setDate(nextDay)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate(false)}>
        <AppIcon name='chevron-left' color={leftArrowColor}/>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <AppText style={styles.title}>{title}</AppText>
        {subtitle && <AppText style={styles.subtitle}>{subtitle}</AppText>}
      </View>
      <TouchableOpacity onPress={() => navigate(true)}>
        <AppIcon name='chevron-right' color={rightArrowColor}/>
      </TouchableOpacity>
    </View>
  )
}

SymptomPageTitle.propTypes = {
  date: PropTypes.string.isRequired,
  reloadSymptomData: PropTypes.func.isRequired,
  setDate: PropTypes.func.isRequired,
  subtitle: PropTypes.string,
  title: PropTypes.string
}

const styles = StyleSheet.create({
  container: {
    height: (Spacing.base * 4),
    marginHorizontal: Spacing.base,
    marginTop: Spacing.base,
    ...Containers.rowContainer
  },
  textContainer: {
    alignItems: 'center'
  },
  title: {
    ...Typography.titleWithoutMargin
  }
})

const mapStateToProps = (state) => {
  return({
    date: getDate(state),
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    setDate: (date) => dispatch(setDate(date)),
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SymptomPageTitle)