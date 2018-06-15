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

    this.state = {
      visibleComponent: 'dayView',
    }

    this.showView = view => {
      this.setState({visibleComponent: view})
    }
  }

  render() {
    const cycleDayNumber = getCycleDayNumber(this.cycleDay.date)
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around'}}>
        <View style={{flex: 2, justifyContent: 'center', backgroundColor: 'steelblue'}}>
          <Text style={styles.dateHeader}>
            {formatDateForViewHeader(this.cycleDay.date)}
          </Text>
        </View >
        <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'skyblue'}}>
          { cycleDayNumber && <Text style={styles.cycleDayNumber} >Cycle day {cycleDayNumber}</Text> }
        </View >
        <View style={{flex: 8, justifyContent: 'center',}}>
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