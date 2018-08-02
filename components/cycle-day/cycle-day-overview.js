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
  positionOrIntensity as positionLabels
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
    const cycleDay = this.cycleDay
    return (
      <View style={styles.symptomEditView}>
        <View style={styles.symptomViewRowInline}>
          <Text style={styles.symptomDayView}>Bleeding</Text>
          <View style={styles.symptomEditButton}>
            <Button
              onPress={() => this.showView('bleedingEditView')}
              title={getLabel('bleeding', cycleDay.bleeding)}>
            </Button>
          </View>
        </View>
        <View style={styles.symptomViewRowInline}>
          <Text style={styles.symptomDayView}>Temperature</Text>
          <View style={styles.symptomEditButton}>
            <Button
              onPress={() => this.showView('temperatureEditView')}
              title={getLabel('temperature', cycleDay.temperature)}>
            </Button>
          </View>
        </View>
        <View style={ styles.symptomViewRowInline }>
          <Text style={styles.symptomDayView}>Mucus</Text>
          <View style={styles.symptomEditButton}>
            <Button
              onPress={() => this.showView('mucusEditView')}
              title={getLabel('mucus', cycleDay.mucus)}>
            </Button>
          </View>
        </View>
        <View style={styles.symptomViewRowInline}>
          <Text style={styles.symptomDayView}>Cervix</Text>
          <View style={styles.symptomEditButton}>
            <Button
              onPress={() => this.showView('cervixEditView')}
              title={getLabel('cervix', cycleDay.cervix)}>
            </Button>
          </View>
        </View>
        <View style={styles.symptomViewRowInline}>
          <Text style={styles.symptomDayView}>Note</Text>
          <View style={styles.symptomEditButton}>
            <Button
              onPress={() => this.showView('noteEditView')}
              title={getLabel('note', cycleDay.note)}
            >
            </Button>
          </View>
        </View>
        <View style={ styles.symptomViewRowInline }>
          <Text style={styles.symptomDayView}>Desire</Text>
          <View style={styles.symptomEditButton}>
            <Button
              onPress={() => this.showView('desireEditView')}
              title={getLabel('desire', cycleDay.desire)}>
            </Button>
          </View>
        </View>
      </View >
    )
  }
}

function getLabel(symptomName, symptom) {
  const labels = {
    bleeding: bleeding => {
      if (typeof bleeding.value === 'number') {
        let bleedingLabel = `${bleedingLabels[bleeding.value]}`
        if (bleeding.exclude) bleedingLabel = "( " + bleedingLabel + " )"
        return bleedingLabel
      }
    },
    temperature: temperature => {
      if (typeof temperature.value === 'number') {
        let temperatureLabel = `${temperature.value} °C - ${temperature.time}`
        if (temperature.exclude) {
          temperatureLabel = "( " + temperatureLabel + " )"
        }
        return temperatureLabel
      }
    },
    mucus: mucus => {
      if (
        typeof mucus.feeling === 'number' &&
        typeof mucus.texture === 'number' &&
        typeof mucus.value === 'number'
      ) {
        let mucusLabel = `${feelingLabels[mucus.feeling]} + ${textureLabels[mucus.texture]} ( ${computeSensiplanMucusLabels[mucus.value]} )`
        if (mucus.exclude) mucusLabel = "( " + mucusLabel + " )"
        return mucusLabel
      }
    },
    cervix: cervix => {
      if (cervix.opening > -1 && cervix.firmness > -1) {
        let cervixLabel = `${openingLabels[cervix.opening]} + ${firmnessLabels[cervix.firmness]}`
        if (cervix.position > -1) cervixLabel += `+ ${positionLabels[cervix.position]}`
        if (cervix.exclude) cervixLabel = "( " + cervixLabel + " )"
        return cervixLabel
      }
    },
    note: note => {
      return note.value.slice(0, 12) + '...'
    },
    desire: desire => {
      if (typeof desire.value === 'number') {
        const desireLabel = `${positionLabels[desire.value]}`
        return desireLabel
      }
    }
  }

  if (!symptom) return 'edit'
  return labels[symptomName](symptom) || 'edit'
}
