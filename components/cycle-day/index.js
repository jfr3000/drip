import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView
} from 'react-native'
import cycleModule from '../../lib/cycle'
import { getFertilityStatusStringForDay } from '../../lib/sympto-adapter'
import DayView from './cycle-day-overview'
import BleedingEditView from './symptoms/bleeding'
import TemperatureEditView from './symptoms/temperature'
import MucusEditView from './symptoms/mucus'
import { formatDateForViewHeader } from './labels/format'
import CervixEditView from './symptoms/cervix'
import styles from '../../styles'
import actionButtonModule from './action-buttons'

const getCycleDayNumber = cycleModule().getCycleDayNumber

export default class Day extends Component {
  constructor(props) {
    super(props)
    this.cycleDay = props.navigation.state.params.cycleDay

    this.state = {
      visibleComponent: 'dayView',
    }

    this.showView = view => {
      this.setState({visibleComponent: view})
    }

    this.makeActionButtons = actionButtonModule(this.showView)
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
          {
            { dayView: <DayView cycleDay={this.cycleDay} showView={this.showView} />,
              bleedingEditView: <BleedingEditView cycleDay={this.cycleDay} makeActionButtons={this.makeActionButtons}/>,
              temperatureEditView: <TemperatureEditView cycleDay={this.cycleDay} makeActionButtons={this.makeActionButtons}/>,
              mucusEditView: <MucusEditView cycleDay={this.cycleDay} makeActionButtons={this.makeActionButtons}/>,
              cervixEditView: <CervixEditView cycleDay={this.cycleDay} makeActionButtons={this.makeActionButtons} />
            }[this.state.visibleComponent]
          }
        </View >
      </ScrollView >
    )
  }
}
