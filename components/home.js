import React, { Component } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

import { LocalDate } from 'js-joda'

import { connect } from 'react-redux'
import { navigate } from '../slices/navigation'
import { getDate, setDate } from '../slices/date'

import AppText from './common/app-text'
import Button from './common/button'

import cycleModule from '../lib/cycle'
import { getFertilityStatusForDay } from '../lib/sympto-adapter'
import { determinePredictionText, getOrdinalSuffix } from './helpers/home'

import { Colors, Fonts, Sizes, Spacing } from '../styles'
import { home as labels } from '../i18n/en/labels'

class Home extends Component {

  static propTypes = {
    navigate: PropTypes.func,
    setDate: PropTypes.func
  }

  constructor(props) {
    super(props)

    const today = LocalDate.now()
    this.todayDateString = today.toString()
    const { getCycleDayNumber, getPredictedMenses } = cycleModule()
    this.cycleDayNumber = getCycleDayNumber(this.todayDateString)
    const { status, phase, statusText } =
      getFertilityStatusForDay(this.todayDateString)
    const prediction = getPredictedMenses()

    this.cycleDayText = !this.cycleDayNumber ? labels.cycleDayNotEnoughInfo
      : `${this.cycleDayNumber}${getOrdinalSuffix(this.cycleDayNumber)}`
    this.phase = phase
    this.phaseText = !phase ? statusText
      : `${phase}${getOrdinalSuffix(phase)}`
    this.prediction = determinePredictionText(prediction)
    this.status = status
    this.statusText = statusText
    this.title = `${today.dayOfMonth()} ${today.month()}`

  }

  navigateToCycleDayView = () => {
    this.props.setDate(this.todayDateString)
    this.props.navigate('CycleDay')
  }

  render() {
    const {
      cycleDayText,
      phase,
      phaseText,
      prediction,
      status,
      statusText,
      title
    } = this

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <AppText style={styles.title}>{title}</AppText>
        <View style={styles.line}>
          {this.cycleDayNumber && (
            <React.Fragment>
              <AppText style={styles.whiteText}>{cycleDayText}</AppText>
              <AppText style={styles.tourquiseText}>{labels.cycleDay}</AppText>
            </React.Fragment>
          )}
          {!this.cycleDayNumber && <AppText>{cycleDayText}</AppText>}
        </View>
        <View style={styles.line}>
          {!phase &&
            <AppText style={styles.tourquiseText}>{phaseText}</AppText>
          }
          {phase && (
            <React.Fragment>
              <AppText style={styles.whiteText}>{phaseText}</AppText>
              <AppText style={styles.tourquiseText}>
                {labels.cyclePhase}
              </AppText>
              <AppText style={styles.tourquiseText}>{status}</AppText>
              <Asterisk />
            </React.Fragment>
          )}
        </View>
        <View style={styles.line}>
          <AppText style={styles.tourquiseText}>{prediction}</AppText>
        </View>
        <Button isCTA isSmall={false} onPress={this.navigateToCycleDayView}>
          {labels.addData}
        </Button>
        {phase && (
          <View style={styles.line}>
            <Asterisk />
            <AppText style={styles.tourquiseText} linkStyle={styles.whiteText}>
              {statusText}
            </AppText>
          </View>
        )}
      </ScrollView>
    )
  }
}

const Asterisk = () => {
  return <AppText style={styles.asterisk}>*</AppText>
}

const styles = StyleSheet.create({
  asterisk: {
    color: Colors.orange,
    paddingRight: Spacing.base
  },
  container: {
    backgroundColor: Colors.purple,
    flex: 1
  },
  contentContainer: {
    padding: Spacing.base
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: Spacing.tiny
  },
  title: {
    color: Colors.purpleLight,
    fontFamily: Fonts.bold,
    fontSize: Sizes.huge,
    marginVertical: Spacing.base,
  },
  tourquiseText: {
    color: Colors.tourquise,
  },
  whiteText: {
    color: 'white'
  }
})

const mapStateToProps = (state) => {
  return ({
    date: getDate(state),
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    navigate: (page) => dispatch(navigate(page)),
    setDate: (date) => dispatch(setDate(date)),
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
