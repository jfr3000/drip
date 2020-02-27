import { ChronoUnit, LocalDate } from 'js-joda'
import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { connect } from 'react-redux'

import { navigate } from '../slices/navigation'
import { setDate } from '../slices/date'

import DripHomeIcon from '../assets/drip-home-icons'

import AppText from './app-text'
import IconText from './icon-text'
import HomeElement from './home-element'

import {
  bleedingPrediction as predictLabels,
  home as labels
} from '../i18n/en/labels'
import links from '../i18n/en/links'

import cycleModule from '../lib/cycle'
import { getFertilityStatusForDay } from '../lib/sympto-adapter'
import { formatDateForShortText } from './helpers/format-date'

import styles, { cycleDayColor, periodColor, secondaryColor } from '../styles'

class Home extends Component {
  constructor(props) {
    super(props)
    const { getCycleDayNumber, getPredictedMenses } = cycleModule()
    this.getCycleDayNumber = getCycleDayNumber
    this.getBleedingPrediction = getPredictedMenses
    this.todayDateString = LocalDate.now().toString()
    const prediction = this.getBleedingPrediction()
    const fertilityStatus = getFertilityStatusForDay(this.todayDateString)

    this.state = {
      cycleDayNumber: this.getCycleDayNumber(this.todayDateString),
      predictionText: determinePredictionText(prediction),
      bleedingPredictionRange: getBleedingPredictionRange(prediction),
      ...fertilityStatus
    }
  }

  navigateToCycleDayView = () => {
    this.props.setDate(this.todayDateString)
    this.props.navigate('CycleDay')
  }

  navigateToBleedingEditView = () => {
    this.props.setDate(this.todayDateString)
    this.props.navigate('BleedingEditView')
  }

  navigateToChart = () => {
    this.props.navigate('Chart')
  }

  render() {
    const { cycleDayNumber, phase, status } = this.state
    const cycleDayMoreText = cycleDayNumber ?
      labels.cycleDayKnown(cycleDayNumber) :
      labels.cycleDayNotEnoughInfo

    const { statusText } = this.state

    return (
      <View flex={1}>
        <ScrollView>
          <View style={styles.homeView}>

            <HomeElement
              onPress={this.navigateToCycleDayView}
              buttonColor={ cycleDayColor }
              buttonLabel={ labels.editToday }
            >
              <View>
                <DripHomeIcon name="circle" size={80} color={cycleDayColor}/>
              </View>
              <IconText>{cycleDayNumber || labels.unknown}</IconText>

              <AppText style={styles.homeDescriptionText}>
                {cycleDayMoreText}
              </AppText>
            </HomeElement>

            <HomeElement
              onPress={this.navigateToBleedingEditView}
              buttonColor={ periodColor }
              buttonLabel={ labels.trackPeriod }
            >
              <DripHomeIcon name="drop" size={100} color={periodColor} />

              <IconText wrapperStyles={{ top: '45%' }}>
                {this.state.bleedingPredictionRange}
              </IconText>

              <AppText style={styles.homeDescriptionText}>
                {this.state.predictionText}
              </AppText>
            </HomeElement>

            <HomeElement
              onPress={this.navigateToChart}
              buttonColor={ secondaryColor }
              buttonLabel={ labels.checkFertility }
            >
              <View style={styles.homeCircle}/>

              <IconText>{ phase ? phase.toString() : labels.unknown }</IconText>

              { phase &&
                <AppText style={styles.homeDescriptionText}>
                  {`${labels.phase(phase)} (${status})`}
                </AppText>
              }
              <AppText style={styles.homeDescriptionText}>
                { `${statusText} Visit ${links.wiki.url}.` }
              </AppText>
            </HomeElement>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return({
    navigate: (page) => dispatch(navigate(page)),
    setDate: (date) => dispatch(setDate(date)),
  })
}

export default connect(
  null,
  mapDispatchToProps,
)(Home)


function getTimes(prediction) {
  const todayDate = LocalDate.now()
  const predictedBleedingStart = LocalDate.parse(prediction[0][0])
  /* the range of predicted bleeding days can be either 3 or 5 */
  const predictedBleedingEnd =
    LocalDate.parse(prediction[0][ prediction[0].length - 1 ])
  const daysToEnd = todayDate.until(predictedBleedingEnd, ChronoUnit.DAYS)
  return { todayDate, predictedBleedingStart, predictedBleedingEnd, daysToEnd }
}

function determinePredictionText(bleedingPrediction) {
  if (!bleedingPrediction.length) return predictLabels.noPrediction
  const {
    todayDate,
    predictedBleedingStart,
    predictedBleedingEnd,
    daysToEnd
  } = getTimes(bleedingPrediction)
  if (todayDate.isBefore(predictedBleedingStart)) {
    return predictLabels.predictionInFuture(
      todayDate.until(predictedBleedingStart, ChronoUnit.DAYS),
      todayDate.until(predictedBleedingEnd, ChronoUnit.DAYS)
    )
  }
  if (todayDate.isAfter(predictedBleedingEnd)) {
    return predictLabels.predictionInPast(
      formatDateForShortText(predictedBleedingStart),
      formatDateForShortText(predictedBleedingEnd)
    )
  }
  if (daysToEnd === 0) {
    return predictLabels.predictionStartedNoDaysLeft
  } else if (daysToEnd === 1) {
    return predictLabels.predictionStarted1DayLeft
  } else {
    return predictLabels.predictionStartedXDaysLeft(daysToEnd)
  }
}

function getBleedingPredictionRange(prediction) {
  if (!prediction.length) return labels.unknown
  const {
    todayDate,
    predictedBleedingStart,
    predictedBleedingEnd,
    daysToEnd
  } = getTimes(prediction)
  if (todayDate.isBefore(predictedBleedingStart)) {
    return `${todayDate.until(predictedBleedingStart, ChronoUnit.DAYS)}-${todayDate.until(predictedBleedingEnd, ChronoUnit.DAYS)}`
  }
  if (todayDate.isAfter(predictedBleedingEnd)) {
    return labels.unknown
  }
  return (daysToEnd === 0 ? '0' : `0 - ${daysToEnd}`)
}
