import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'
import styles from '../../styles'
import {
  bleeding as bleedingLabels,
  mucusFeeling as feelingLabels,
  mucusTexture as textureLabels,
  mucusNFP as computeSensiplanMucusLabels,
  cervixOpening as openingLabels,
  cervixFirmness as firmnessLabels,
  cervixPosition as positionLabels,
  intensity as intensityLabels
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

    this.setStateWithCycleDayNumber = (function (DayViewComponent) {
      return function () {
        DayViewComponent.setState({
          cycleDayNumber: getCycleDayNumber(DayViewComponent.cycleDay.date)
        })
      }
    })(this)

    bleedingDaysSortedByDate.addListener(this.setStateWithCycleDayNumber)
  }

  componentWillUnmount() {
    bleedingDaysSortedByDate.removeListener(this.setStateWithCycleDayNumber)
  }

  render() {
    const cycleDay = this.cycleDay
    return (
      <View style={styles.symptomEditView}>
        <View style={styles.symptomBoxesView}>
          <SymptomBox
            title='Bleeding'
            icon={require('./assets/placeholder.png')}
            onPress={() => this.showView('BleedingEditView')}
            data={getLabel('bleeding', cycleDay.bleeding)}
          />
          <SymptomBox
            title='Temperature'
            icon={require('./assets/placeholder.png')}
            onPress={() => this.showView('TemperatureEditView')}
            data={getLabel('temperature', cycleDay.temperature)}
          />
          <SymptomBox
            title='Mucus'
            icon={require('./assets/placeholder.png')}
            onPress={() => this.showView('MucusEditView')}
            data={getLabel('mucus', cycleDay.mucus)}
          />
          <SymptomBox
            title='Cervix'
            icon={require('./assets/placeholder.png')}
            onPress={() => this.showView('CervixEditView')}
            data={getLabel('cervix', cycleDay.cervix)}
          />
          <SymptomBox
            title='Note'
            icon={require('./assets/placeholder.png')}
            onPress={() => this.showView('NoteEditView')}
            data={getLabel('note', cycleDay.note)}
          />
          <SymptomBox
            title='Desire'
            icon={require('./assets/placeholder.png')}
            onPress={() => this.showView('DesireEditView')}
            data={getLabel('desire', cycleDay.desire)}
          />
          <SymptomBox
            title='Sex'
            icon={require('./assets/placeholder.png')}
            onPress={() => this.showView('SexEditView')}
            data={getLabel('sex', cycleDay.sex)}
          />
        </View >
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
        let mucusLabel =
          `${feelingLabels[mucus.feeling]} +
          ${textureLabels[mucus.texture]}
          ( ${computeSensiplanMucusLabels[mucus.value]} )`
        if (mucus.exclude) mucusLabel = "( " + mucusLabel + " )"
        return mucusLabel
      }
    },
    cervix: cervix => {
      if (cervix.opening > -1 && cervix.firmness > -1) {
        let cervixLabel =
          `${openingLabels[cervix.opening]} +
          ${firmnessLabels[cervix.firmness]}`
        if (cervix.position > -1) {
          cervixLabel += `+ ${positionLabels[cervix.position]}`
        }
        if (cervix.exclude) cervixLabel = "( " + cervixLabel + " )"
        return cervixLabel
      }
    },
    note: note => {
      return note.value.slice(0, 12) + '...'
    },
    desire: desire => {
      if (typeof desire.value === 'number') {
        const desireLabel = `${intensityLabels[desire.value]}`
        return desireLabel
      }
    },
    sex: sex => {
      let sexLabel = ''
      if ( sex.solo || sex.partner ) {
        sexLabel += 'Activity '
      }
      if (sex.condom || sex.pill || sex.iud ||
        sex.patch || sex.ring || sex.implant || sex.other) {
        sexLabel += 'Contraceptive'
      }
      return sexLabel ? sexLabel : 'edit'
    }
  }

  if (!symptom) return 'edit'
  return labels[symptomName](symptom) || 'edit'
}

class SymptomBox extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.symptomBox}>
          <Image
            source={require('./assets/placeholder.png')}
            style={styles.symptomBoxImage}
          />
          <Text>{this.props.title}</Text>
          <Text>{this.props.data}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}