import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'
import cycleModule from '../lib/cycle'
import { getTemperatureFertilityStatus } from '../lib/sensiplan-adapter'
import DayView from './cycle-day-overview'
import BleedingEditView from './bleeding'
import TemperatureEditView from './temperature'
import { formatDateForViewHeader } from '../labels/format'
import styles from '../styles/index'

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
  }

  render() {
    const cycleDayNumber = getCycleDayNumber(this.cycleDay.date)
    const temperatureFertilityStatus = getTemperatureFertilityStatus(this.cycleDay.date)
    return (
      <View style={ styles.cycleDayOuterView }>
        <View style={ styles.cycleDayDateView }>
          <Text style={styles.dateHeader}>
            {formatDateForViewHeader(this.cycleDay.date)}
          </Text>
        </View >
        <View style={ styles.cycleDayNumberView }>
          { cycleDayNumber && <Text style={styles.cycleDayNumber} >Cycle day {cycleDayNumber}</Text> }
          { cycleDayNumber && <Text style={styles.cycleDayNumber} >Temperature status: {temperatureFertilityStatus}</Text> }
        </View >
        <View style={ styles.cycleDaySymptomsView }>
          {
            { dayView: <DayView cycleDay={this.cycleDay} showView={this.showView} />,
              bleedingEditView: <BleedingEditView cycleDay={this.cycleDay} showView={this.showView}/>,
              temperatureEditView: <TemperatureEditView cycleDay={this.cycleDay} showView={this.showView}/>
            }[this.state.visibleComponent]
          }
        </View >
      </View >
    )
  }
}