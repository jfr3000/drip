import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import cycleModule from '../../lib/cycle'
import { formatDateForViewHeader } from './labels/format'
import styles, { iconStyles } from '../../styles'
import actionButtonModule from './action-buttons'
import symptomComponents from './symptoms'
import DayView from './cycle-day-overview'
import { LocalDate } from 'js-joda'
import { getOrCreateCycleDay } from '../../db'

const getCycleDayNumber = cycleModule().getCycleDayNumber
const symptomComponentNames = Object.keys(symptomComponents)

export default class Day extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visibleComponent: 'DayView',
      cycleDay: props.navigation.state.params.cycleDay
    }

    this.showView = view => {
      this.setState({visibleComponent: view})
    }
    this.makeActionButtons = actionButtonModule(this.showView)
  }

  goToCycleDay(target) {
    const localDate = LocalDate.parse(this.state.cycleDay.date)
    const targetDate = target === 'before' ?
      localDate.minusDays(1).toString() :
      localDate.plusDays(1).toString()
    this.setState({cycleDay: getOrCreateCycleDay(targetDate)})
  }

  render() {
    const cycleDayNumber = getCycleDayNumber(this.state.cycleDay.date)
    const cycleDayViews = symptomComponentNames.reduce((acc, curr) => {
      acc[curr] = React.createElement(
        symptomComponents[curr],
        {
          cycleDay: this.state.cycleDay,
          makeActionButtons: this.makeActionButtons
        }
      )
      return acc
    }, {})
    // DayView needs showView instead of makeActionButtons
    cycleDayViews.DayView = React.createElement(DayView, {
      dateString: this.state.cycleDay.date,
      cycleDay: this.state.cycleDay,
      showView: this.showView
    })

    return (
      <ScrollView>
        <View style={ styles.cycleDayDateView }>
          <Icon
            name='arrow-left-drop-circle'
            {...iconStyles.navigationArrow}
            onPress={() => this.goToCycleDay('before')}
          />
          <View>
            <Text style={styles.dateHeader}>
              {formatDateForViewHeader(this.state.cycleDay.date)}
            </Text>
            {cycleDayNumber &&
              <Text style={styles.cycleDayNumber} >
                Cycle day {cycleDayNumber}
              </Text>}
          </View >
          <Icon
            name='arrow-right-drop-circle'
            {...iconStyles.navigationArrow}
            onPress={() => this.goToCycleDay('after')}
          />
        </View >
        <View>
          { cycleDayViews[this.state.visibleComponent] }
        </View >
      </ScrollView >
    )
  }
}