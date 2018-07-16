import React, { Component } from 'react'
import {
  View,
  Button,
  Text
} from 'react-native'
import styles from '../../styles'
import {
  bleeding as bleedingLabels,
  mucusFeeling as feelingLabels,
  mucusTexture as textureLabels,
  mucusNFP as computeSensiplanMucusLabels,
} from './labels/labels'
import cycleDayModule from '../../lib/cycle'
import { bleedingDaysSortedByDate } from '../../db'

const getCycleDayNumber = cycleDayModule().getCycleDayNumber

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
      bleedingLabel = `${bleedingLabels[bleedingValue]}`
      if (this.cycleDay.bleeding.exclude) bleedingLabel = "( " + bleedingLabel + " )"
    } else {
      bleedingLabel = 'edit'
    }
    const temperatureValue = this.cycleDay.temperature && this.cycleDay.temperature.value
    let temperatureLabel
    if (typeof temperatureValue === 'number') {
      temperatureLabel = `${temperatureValue} °C - ${this.cycleDay.temperature.time}`
      if (this.cycleDay.temperature.exclude) {
        temperatureLabel = "( " + temperatureLabel + " )"
      }
    } else {
      temperatureLabel = 'edit'
    }

    const mucusFeelingValue = this.cycleDay.mucus && this.cycleDay.mucus.feeling
    const mucusTextureValue = this.cycleDay.mucus && this.cycleDay.mucus.texture
    const mucusComputedValue = this.cycleDay.mucus && this.cycleDay.mucus.value
    let mucusLabel
    if (typeof mucusFeelingValue === 'number' && typeof mucusTextureValue === 'number') {
      mucusLabel = `${feelingLabels[mucusFeelingValue]} + ${textureLabels[mucusTextureValue]} ( ${computeSensiplanMucusLabels[mucusComputedValue]} )`
      if (this.cycleDay.mucus.exclude) mucusLabel = "( " + mucusLabel + " )"
    } else {
      mucusLabel = 'edit'
    }

    return (
      <View style={styles.symptomEditView}>
        <View style={styles.symptomViewRowInline}>
          <Text style={styles.symptomDayView}>Bleeding</Text>
          <View style={styles.symptomEditButton}>
            <Button
              onPress={() => this.showView('bleedingEditView')}
              title={bleedingLabel}>
            </Button>
          </View>
        </View>
        <View style={styles.symptomViewRowInline}>
          <Text style={styles.symptomDayView}>Temperature</Text>
          <View style={styles.symptomEditButton}>
            <Button
              onPress={() => this.showView('temperatureEditView')}
              title={temperatureLabel}>
            </Button>
          </View>
        </View>
        <View style={ styles.symptomViewRowInline }>
          <Text style={styles.symptomDayView}>Mucus</Text>
          <View style={ styles.symptomEditButton }>
            <Button
              onPress={() => this.showView('mucusEditView')}
              title={mucusLabel}>
            </Button>
          </View>
        </View>
      </View >
    )
  }
}
