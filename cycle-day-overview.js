import React, { Component } from 'react'
import {
  View,
  Button,
  Text
} from 'react-native'
import styles from './styles'
import { bleeding as labels} from './labels'
import cycleDayModule from './get-cycle-day-number'
import { bleedingDaysSortedByDate } from './db'

const getCycleDayNumber = cycleDayModule()

export default class DayView extends Component {
  constructor(props) {
    super(props)
    this.cycleDay = props.cycleDay
    this.showView = props.showView
    this.state = {
      cycleDayNumber: getCycleDayNumber(this.cycleDay.date),
    }

    this.setStateWithCurrentCycleDayNumber = (function (DayViewComponent) {
      return function () {
        DayViewComponent.setState({
          cycleDayNumber: getCycleDayNumber(DayViewComponent.cycleDay.date)
        })
      }
    })(this)

    bleedingDaysSortedByDate.addListener(this.setStateWithCurrentCycleDayNumber)
  }

  componentWillUnmount() {
    bleedingDaysSortedByDate.removeListener(this.setStateWithCurrentCycleDayNumber)
  }

  render() {
    const bleedingValue = this.cycleDay.bleeding && this.cycleDay.bleeding.value
    let bleedingLabel
    if (typeof bleedingValue === 'number') {
      bleedingLabel = `${labels[bleedingValue]}`
      if (this.cycleDay.bleeding.exclude) bleedingLabel = "( " + bleedingLabel + " )"
    } else {
      bleedingLabel = 'edit'
    }
    const temperatureValue = this.cycleDay.temperature && this.cycleDay.temperature.value
    let temperatureLabel
    if (typeof temperatureValue === 'number') {
      temperatureLabel = `${temperatureValue} °C`
      if (this.cycleDay.temperature.exclude) temperatureLabel = "( " + temperatureLabel + " )"
    } else {
      temperatureLabel = 'edit'
    }

    return (
      <View style={ styles.symptomEditListedSymptomView }>
        <View style={ styles.itemsInRowSeparatedView }>
          <View style={{flex: 1}}>
            <Text style={styles.symptomDayView}>Bleeding</Text>
          </View>
          <View style={ styles.singleButtonView }>
            <Button
              onPress={() => this.showView('bleedingEditView')}
              title={bleedingLabel}>
            </Button>
          </View>
        </View>
        <View style={ styles.itemsInRowSeparatedView}>
          <View style={{flex: 1}}>
            <Text style={styles.symptomDayView}>Temperature</Text>
          </View>
          <View style={ styles.singleButtonView }>
            <Button
              onPress={() => this.showView('temperatureEditView')}
              title={temperatureLabel}>
            </Button>
          </View>
        </View>
      </View >
    )
  }
}