import React, { Component } from 'react'
import { ScrollView, View, TouchableOpacity, TouchableHighlight, Dimensions } from 'react-native'
import { LocalDate, ChronoUnit } from 'js-joda'
import Icon from 'react-native-vector-icons/Entypo'
import { secondaryColor, cycleDayColor, periodColor } from '../styles'
import { home as labels, bleedingPrediction as predictLabels, shared } from '../i18n/en/labels'
import cycleModule from '../lib/cycle'
import { getCycleDaysSortedByDate } from '../db'
import { getFertilityStatusForDay } from '../lib/sympto-adapter'
import styles from '../styles'
import AppText, { AppTextLight } from './app-text'
import nothingChanged from '../db/db-unchanged'
import DripHomeIcon from '../assets/drip-home-icons'

const HomeButton = ({ backgroundColor, children }) => {
  return (
    <View style={[
      styles.homeButton,
      {backgroundColor}
    ]}>
      <AppText style={styles.homeButtonText}>
        {children}
      </AppText>
    </View>
  )
}

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.getCycleDayNumber = cycleModule().getCycleDayNumber
    this.getBleedingPrediction = cycleModule().getPredictedMenses
    this.todayDateString = LocalDate.now().toString()
    const prediction = this.getBleedingPrediction()
    const fertilityStatus = getFertilityStatusForDay(this.todayDateString)

    this.state = {
      cycleDayNumber: this.getCycleDayNumber(this.todayDateString),
      predictionText: determinePredictionText(prediction),
      bleedingPredictionRange: getBleedingPredictionRange(prediction),
      ...fertilityStatus
    }

    this.cycleDays = getCycleDaysSortedByDate()
    this.cycleDays.addListener(this.updateState)
  }

  updateState = (_, changes) => {
    if (nothingChanged(changes)) return
    const prediction = this.getBleedingPrediction()
    const fertilityStatus = getFertilityStatusForDay(this.todayDateString)
    this.setState({
      cycleDayNumber: this.getCycleDayNumber(this.todayDateString),
      predictionText: determinePredictionText(prediction),
      bleedingPredictionRange: getBleedingPredictionRange(prediction),
      ...fertilityStatus
    })
  }

  componentWillUnmount() {
    this.cycleDays.removeListener(this.updateState)
  }

  passTodayTo(componentName) {
    const navigate = this.props.navigate
    navigate(componentName, { date: LocalDate.now().toString() })
  }

  render() {
    const cycleDayMoreText = this.state.cycleDayNumber ?
      labels.cycleDayKnown(this.state.cycleDayNumber)
      :
      labels.cycleDayNotEnoughInfo

    const {height, width} = Dimensions.get('window')
    return (
      <View flex={1}>
        <ScrollView>
          <View
            style={styles.homeView}
          >
            <TouchableOpacity
              onPress={() => this.passTodayTo('CycleDay')}
              style={styles.homeIconElement}
            >
              <View position='absolute'>
                <DripHomeIcon name="circle" size={80} color={cycleDayColor}/>
              </View>
              <View style={[styles.homeIconTextWrapper, styles.wrapperCycle]}>
                <AppTextLight style={styles.iconText}>
                  {this.state.cycleDayNumber || labels.unknown}
                </AppTextLight>
              </View>

              { this.state.showMore &&
                  <AppText style={styles.paragraph}>{cycleDayMoreText}</AppText>
              }

              <HomeButton backgroundColor={cycleDayColor}>
                {labels.editToday}
              </HomeButton>

            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.passTodayTo('BleedingEditView')}
              style={styles.homeIconElement}
            >
              <View position='absolute'>
                <DripHomeIcon name="drop" size={105} color={periodColor} />
              </View>
              <View style={[styles.homeIconTextWrapper, styles.wrapperDrop]}>
                <AppTextLight style={styles.iconText}>
                  {this.state.bleedingPredictionRange}
                </AppTextLight>
              </View>

              {this.state.showMore &&
                <AppText style={styles.paragraph}>
                  {this.state.predictionText}
                </AppText>
              }

              <HomeButton backgroundColor={periodColor}>
                {labels.trackPeriod}
              </HomeButton>

            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigate('Chart')}
              style={styles.homeIconElement}
            >

              <View style={styles.homeCircle} position='absolute' />

              <View style={[styles.homeIconTextWrapper, styles.wrapperCircle]}>
                <AppTextLight style={styles.iconText}>
                  {this.state.phase ?
                    this.state.phase.toString()
                    :
                    labels.unknown
                  }
                </AppTextLight>
              </View>
              {this.state.phase &&
              <AppTextLight>
                {`${labels.phase(this.state.phase)} (${this.state.status})`}
              </AppTextLight>
              }
              {this.state.showMore &&
                <AppText styles={styles.paragraph}>
                  {this.state.statusText}
                </AppText>
              }

              <HomeButton backgroundColor={secondaryColor}>
                {labels.checkFertility}
              </HomeButton>
            </TouchableOpacity>
          </View>

        </ScrollView>

        {!this.state.showMore &&
          <TouchableHighlight
            onPress={() => this.setState({showMore: true})}
            style={[styles.showMore, {
              top: height / 2 - styles.header.height - 30,
              left: width - 40
            }]}
          >
            <View style={{alignItems: 'center'}}>
              <AppTextLight>{shared.more}</AppTextLight>
              <Icon name='chevron-thin-down' />
            </View>
          </TouchableHighlight>
        }

        {this.state.showMore &&
          <TouchableHighlight
            onPress={() => this.setState({showMore: false})}
            style={[styles.showLess, {
              top: height / 2 - styles.header.height - 30,
              left: 10
            }]}
          >
            <View style={{alignItems: 'center'}}>
              <AppTextLight>{shared.less}</AppTextLight>
              <Icon name='chevron-thin-down' />
            </View>
          </TouchableHighlight>
        }
      </View>
    )
  }
}

function determinePredictionText(bleedingPrediction) {
  if (!bleedingPrediction.length) return predictLabels.noPrediction
  const todayDate = LocalDate.now()
  const bleedingStart = LocalDate.parse(bleedingPrediction[0][0])
  const bleedingEnd = LocalDate.parse(
    bleedingPrediction[0][ bleedingPrediction[0].length - 1 ]
  )
  if (todayDate.isBefore(bleedingStart)) {
    return predictLabels.predictionInFuture(
      todayDate.until(bleedingStart, ChronoUnit.DAYS),
      todayDate.until(bleedingEnd, ChronoUnit.DAYS)
    )
  }
  if (todayDate.isAfter(bleedingEnd)) {
    return predictLabels.predictionInPast(
      bleedingStart.toString(), bleedingEnd.toString()
    )
  }
  const daysToEnd = todayDate.until(bleedingEnd, ChronoUnit.DAYS)
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
  const todayDate = LocalDate.now()
  const bleedingStart = LocalDate.parse(prediction[0][0])
  const bleedingEnd = LocalDate.parse(prediction[0][ prediction[0].length - 1 ])
  if (todayDate.isBefore(bleedingStart)) {
    return `${todayDate.until(bleedingStart, ChronoUnit.DAYS)}-${todayDate.until(bleedingEnd, ChronoUnit.DAYS)}`
  }
  if (todayDate.isAfter(bleedingEnd)) {
    return labels.unknown
  }
  return '0'
}