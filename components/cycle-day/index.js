import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView
} from 'react-native'
import cycleModule from '../../lib/cycle'
import { getFertilityStatusStringForDay } from '../../lib/sympto-adapter'
import { formatDateForViewHeader } from './labels/format'
import styles from '../../styles'
import actionButtonModule from './action-buttons'
import symptomComponents from './symptoms'
import DayView from './cycle-day-overview'

const getCycleDayNumber = cycleModule().getCycleDayNumber

export default class Day extends Component {
  constructor(props) {
    super(props)
    this.cycleDay = props.navigation.state.params.cycleDay

    this.state = {
      visibleComponent: 'DayView',
    }

    const showView = view => {
      this.setState({visibleComponent: view})
    }

    const makeActionButtons = actionButtonModule(showView)

    const symptomComponentNames = Object.keys(symptomComponents)
    this.cycleDayViews = symptomComponentNames.reduce((acc, curr) => {
      acc[curr] = React.createElement(
        symptomComponents[curr],
        {
          cycleDay: this.cycleDay,
          makeActionButtons
        }
      )
      return acc
    }, {})

    // DayView needs showView instead of makeActionButtons
    this.cycleDayViews.DayView = React.createElement(DayView, {
      cycleDay: this.cycleDay,
      showView
    })
  }

  render() {
    const cycleDayNumber = getCycleDayNumber(this.cycleDay.date)
    const fertilityStatus = getFertilityStatusStringForDay(this.cycleDay.date)
    return (
      <ScrollView>
        <View style={ styles.cycleDayDateView }>
          <Text style={styles.dateHeader}>
            {formatDateForViewHeader(this.cycleDay.date)}
          </Text>
        </View >
        <View style={ styles.cycleDayNumberView }>
          { cycleDayNumber &&
            <Text style={styles.cycleDayNumber} >
              Cycle day {cycleDayNumber}
            </Text> }

          <Text style={styles.cycleDayNumber} >
            {fertilityStatus}
          </Text>
        </View >
        <View>
          { this.cycleDayViews[this.state.visibleComponent] }
        </View >
      </ScrollView >
    )
  }
}
