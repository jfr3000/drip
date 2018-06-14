import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'
import cycleDayModule from './get-cycle-day-number'
import DayView from './cycle-day-overview'
import BleedingEditView from './bleeding'
import TemperatureEditView from './temperature'
import { formatDateForViewHeader } from './format'
import styles from './styles'

const getCycleDayNumber = cycleDayModule()

export default class Day extends Component {
  constructor(props) {
    super(props)
    this.cycleDay = props.navigation.state.params.cycleDay
    this.cycleDayNumber = getCycleDayNumber(this.cycleDay.date)

    this.state = {
      visibleComponent: 'dayView',
    }

    this.bringIntoView = view => {
      this.setState({visibleComponent: view})
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{formatDateForViewHeader(this.cycleDay.date)}</Text>
        { this.cycleDayNumber && <Text>Cycle day {this.cycleDayNumber}</Text> }
        {
          { dayView: <DayView cycleDay={this.cycleDay} bringIntoView={this.bringIntoView} />,
            bleedingEditView: <BleedingEditView cycleDay={this.cycleDay} bringIntoView={this.bringIntoView}/>,
            temperatureEditView: <TemperatureEditView cycleDay={this.cycleDay} bringIntoView={this.bringIntoView}/>
          }[this.state.visibleComponent]
        }

      </View >
    )
  }
}