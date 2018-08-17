import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import { LocalDate } from 'js-joda'
import { getOrCreateCycleDay } from '../../db'
import cycleModule from '../../lib/cycle'
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { formatDateForViewHeader } from './labels/format'
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

const getCycleDayNumber = cycleModule().getCycleDayNumber

export default class CycleDayOverView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cycleDay: props.navigation.state.params.cycleDay
    }
  }

  goToCycleDay(target) {
    const localDate = LocalDate.parse(this.state.cycleDay.date)
    const targetDate = target === 'before' ?
      localDate.minusDays(1).toString() :
      localDate.plusDays(1).toString()
    this.setState({cycleDay: getOrCreateCycleDay(targetDate)})
  }

  navigate(symptom) {
    this.props.navigation.navigate('SymptomView', {
      symptom,
      cycleDay: this.state.cycleDay
    })
  }

  render() {
    const cycleDay = this.state.cycleDay
    const cycleDayNumber = getCycleDayNumber(cycleDay.date)
    return (
      <ScrollView>
        <View style={ styles.cycleDayDateView }>
          <MaterialIcon
            name='arrow-left-drop-circle'
            {...iconStyles.navigationArrow}
            onPress={() => this.goToCycleDay('before')}
          />
          <View>
            <Text style={styles.dateHeader}>
              {formatDateForViewHeader(cycleDay.date)}
            </Text>
            {cycleDayNumber &&
              <Text style={styles.cycleDayNumber} >
                Cycle day {cycleDayNumber}
              </Text>}
          </View >
          <MaterialIcon
            name='arrow-right-drop-circle'
            {...iconStyles.navigationArrow}
            onPress={() => this.goToCycleDay('after')}
          />
        </View >
        <View style={styles.symptomBoxesView}>
          <SymptomBox
            title='Bleeding'
            onPress={() => this.navigate('BleedingEditView')}
            data={getLabel('bleeding', cycleDay.bleeding)}
          />
          <SymptomBox
            title='Temperature'
            onPress={() => this.navigate('TemperatureEditView')}
            data={getLabel('temperature', cycleDay.temperature)}
          />
          <SymptomBox
            title='Mucus'
            onPress={() => this.navigate('MucusEditView')}
            data={getLabel('mucus', cycleDay.mucus)}
          />
          <SymptomBox
            title='Cervix'
            onPress={() => this.navigate('CervixEditView')}
            data={getLabel('cervix', cycleDay.cervix)}
          />
          <SymptomBox
            title='Note'
            onPress={() => this.navigate('NoteEditView')}
            data={getLabel('note', cycleDay.note)}
          />
          <SymptomBox
            title='Desire'
            onPress={() => this.navigate('DesireEditView')}
            data={getLabel('desire', cycleDay.desire)}
          />
          <SymptomBox
            title='Sex'
            onPress={() => this.navigate('SexEditView')}
            data={getLabel('sex', cycleDay.sex)}
          />
          {/*  this is just to make the last row adhere to the grid
        (and) because there are no pseudo properties in RN */}
          <FillerBoxes />
        </View >
      </ScrollView >
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