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
  cervixOpening as openingLabels,
  cervixFirmness as firmnessLabels,
  cervixPosition as positionLabels
} from './labels/labels'
import cycleDayModule from '../../lib/get-cycle-day-number'
import { bleedingDaysSortedByDate } from '../../db'

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
    let bleedingLabel
    if (this.cycleDay.bleeding) {
      const bleeding = this.cycleDay.bleeding
      if (typeof bleeding === 'number') {
        bleedingLabel = `${bleedingLabels[bleeding]}`
        if (bleeding.exclude) bleedingLabel = "( " + bleedingLabel + " )"
      }
    } else {
      bleedingLabel = 'edit'
    }

    let temperatureLabel
    if (this.cycleDay.temperature) {
      const temperature = this.cycleDay.temperature
      if (typeof temperature === 'number') {
        temperatureLabel = `${temperature} °C - ${temperature.time}`
        if (temperature.exclude) {
          temperatureLabel = "( " + temperatureLabel + " )"
        }
      }
    } else {
      temperatureLabel = 'edit'
    }

    let mucusLabel
    if (this.cycleDay.mucus) {
      const mucus = this.cycleDay.mucus
      if (typeof mucus.feeling === 'number' && typeof mucus.texture === 'number') {
        mucusLabel = `${feelingLabels[mucus.feeling]} + ${textureLabels[mucus.texture]} ( ${computeSensiplanMucusLabels[mucus.computedNfp]} )`
        if (mucus.exclude) mucusLabel = "( " + mucusLabel + " )"
      }
    } else {
      mucusLabel = 'edit'
    }

    let cervixLabel
    if (this.cycleDay.cervix) {
      const cervix = this.cycleDay.cervix
      if (cervix.opening > -1 && cervix.firmness > -1) {
        cervixLabel = `${openingLabels[cervix.opening]} + ${firmnessLabels[cervix.firmness]}`
        if (cervix.position > -1) cervixLabel += `+ ${positionLabels[cervix.position]}`
        if (cervix.exclude) cervixLabel = "( " + cervixLabel + " )"
      }
    } else {
      cervixLabel = 'edit'
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
        <View style={ styles.itemsInRowSeparatedView }>
          <View style={{flex: 1}}>
            <Text style={styles.symptomDayView}>Cervix</Text>
          </View>
          <View style={ styles.singleButtonView }>
            <Button
              onPress={() => this.showView('cervixEditView')}
              title={cervixLabel}>
            </Button>
          </View>
        </View>
      </View >
    )
  }
}
