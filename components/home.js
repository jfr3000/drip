import { LocalDate } from 'js-joda'
import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { navigate } from '../slices/navigation'
import { getDate, setDate } from '../slices/date'

import DripHomeIcon from '../assets/drip-home-icons'

import AppText from './common/app-text'
import IconText from './icon-text'
import HomeElement from './home-element'

import { home as labels } from '../i18n/en/labels'
import links from '../i18n/en/links'

import cycleModule from '../lib/cycle'
import { getFertilityStatusForDay } from '../lib/sympto-adapter'
import {
  determinePredictionText,
  getBleedingPredictionRange
} from './helpers/home'

import styles, { cycleDayColor, periodColor, secondaryColor } from '../styles'

class Home extends Component {

  static propTypes = {
    navigate: PropTypes.func,
    setDate: PropTypes.func,
    // The following are not being used,
    // we could see if it's possible to not pass them from the <App />
    cycleDay: PropTypes.object,
    date: PropTypes.string,
  }

  constructor(props) {
    super(props)

    const { getCycleDayNumber, getPredictedMenses } = cycleModule()

    this.todayDateString = LocalDate.now().toString()
    this.cycleDayNumber = getCycleDayNumber(this.todayDateString)

    const prediction = getPredictedMenses()
    this.predictionText = determinePredictionText(prediction)
    this.bleedingPredictionRange = getBleedingPredictionRange(prediction)

    this.fertilityStatus = getFertilityStatusForDay(this.todayDateString)
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
    const {
      cycleDayNumber,
      predictionText,
      bleedingPredictionRange,
    } = this

    const { phase, status, statusText } = this.fertilityStatus

    const cycleDayMoreText = cycleDayNumber ?
      labels.cycleDayKnown(cycleDayNumber) :
      labels.cycleDayNotEnoughInfo

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
                {bleedingPredictionRange}
              </IconText>

              <AppText style={styles.homeDescriptionText}>
                {predictionText}
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

const mapStateToProps = (state) => {
  return({
    date: getDate(state),
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    navigate: (page) => dispatch(navigate(page)),
    setDate: (date) => dispatch(setDate(date)),
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
