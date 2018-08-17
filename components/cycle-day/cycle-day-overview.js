import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles, { iconStyles } from '../../styles'
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

export default class DayView extends Component {
  render() {
    const cycleDay = this.props.cycleDay
    return (
      <View style={styles.symptomBoxesView}>
        <SymptomBox
          title='Bleeding'
          onPress={() => this.props.showView('BleedingEditView')}
          data={getLabel('bleeding', cycleDay.bleeding)}
        />
        <SymptomBox
          title='Temperature'
          onPress={() => this.props.showView('TemperatureEditView')}
          data={getLabel('temperature', cycleDay.temperature)}
        />
        <SymptomBox
          title='Mucus'
          onPress={() => this.props.showView('MucusEditView')}
          data={getLabel('mucus', cycleDay.mucus)}
        />
        <SymptomBox
          title='Cervix'
          onPress={() => this.props.showView('CervixEditView')}
          data={getLabel('cervix', cycleDay.cervix)}
        />
        <SymptomBox
          title='Note'
          onPress={() => this.props.showView('NoteEditView')}
          data={getLabel('note', cycleDay.note)}
        />
        <SymptomBox
          title='Desire'
          onPress={() => this.props.showView('DesireEditView')}
          data={getLabel('desire', cycleDay.desire)}
        />
        <SymptomBox
          title='Sex'
          onPress={() => this.props.showView('SexEditView')}
          data={getLabel('sex', cycleDay.sex)}
        />
        {/*  this is just to make the last row adhere to the grid
        (and) because there are no pseudo properties in RN */}
        <FillerBoxes/>
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
      return sexLabel ? sexLabel : undefined
    }
  }

  if (!symptom) return
  return labels[symptomName](symptom)
}

class SymptomBox extends Component {
  render() {
    const d = this.props.data
    const boxActive = d ? styles.symptomBoxActive : {}
    const iconActive = d ? iconStyles.symptomBoxActive : {}
    const textStyle = d ? styles.symptomTextActive : {}

    const symptomBoxStyle = Object.assign({}, styles.symptomBox, boxActive)
    const iconStyle = Object.assign({}, iconStyles.symptomBox, iconActive)

    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={symptomBoxStyle}>
          <Icon
            name='thermometer'
            {...iconStyle}
          />
          <Text style={textStyle}>{this.props.title}</Text>
          <Text style={textStyle}>{this.props.data}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

class FillerBoxes extends Component {
  render() {
    const n = Dimensions.get('window').width / styles.symptomBox.minHeight
    const fillerBoxes = []
    for (let i = 0; i < Math.ceil(n); i++) {
      fillerBoxes.push(
        <View
          width={styles.symptomBox.minHeight}
          height={0}
          key={i.toString()}
        />
      )
    }
    return fillerBoxes
  }
}