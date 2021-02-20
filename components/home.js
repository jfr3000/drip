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
import { determinePredictionText, formatWithOrdinalSuffix } from './helpers/home'

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
    this.prediction = determinePredictionText(prediction)
    this.title = `${today.dayOfMonth()} ${today.month()} ${today.year()}`

    if (this.cycleDayNumber) {
      this.cycleDayText = formatWithOrdinalSuffix(this.cycleDayNumber)
    }

    if (phase) {
      this.phase = phase
      this.phaseText = formatWithOrdinalSuffix(phase)
      this.status = status
      this.statusText = statusText
    }
  }

  navigateToCycleDayView = () => {
    this.props.setDate(this.todayDateString)
    this.props.navigate('CycleDay')
  }

  render() {
    const {
      cycleDayNumber,
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

        {cycleDayNumber &&
          <View style={styles.line}>
            <AppText style={styles.whiteSubtitle}>{cycleDayText}</AppText>
            <AppText style={styles.turquoiseText}>{labels.cycleDay}</AppText>
          </View>
        }
        {phase &&
          <View style={styles.line}>
            <AppText style={styles.whiteSubtitle}>{phaseText}</AppText>
            <AppText style={styles.turquoiseText}>
              {labels.cyclePhase}
            </AppText>
            <AppText style={styles.turquoiseText}>{status}</AppText>
            <Asterisk />
          </View>
        }
        <View style={styles.line}>
          <AppText style={styles.turquoiseText}>{prediction}</AppText>
        </View>
        <Button isCTA isSmall={false} onPress={this.navigateToCycleDayView}>
          {labels.addData}
        </Button>
        {phase && (
          <View style={styles.line}>
            <Asterisk />
            <AppText linkStyle={styles.whiteText} style={styles.greyText}>
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
  },
  container: {
    backgroundColor: Colors.purple,
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.base,
    paddingTop: 0,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: Spacing.tiny,
    marginTop: Spacing.small,
  },
  title: {
    color: Colors.purpleLight,
    fontFamily: Fonts.bold,
    fontSize: Sizes.huge,
    marginVertical: Spacing.small,
  },
  turquoiseText: {
    color: Colors.turquoise,
    fontSize: Sizes.subtitle,
  },
  whiteSubtitle: {
    color: 'white',
    fontSize: Sizes.subtitle,
  },
  whiteText: {
    color: 'white',
  },
  greyText: {
    color: Colors.greyLight,
    paddingLeft: Spacing.base,
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
