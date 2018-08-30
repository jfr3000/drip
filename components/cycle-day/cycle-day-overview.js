import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import { LocalDate } from 'js-joda'
import Header from '../header'
import { getOrCreateCycleDay } from '../../db'
import cycleModule from '../../lib/cycle'
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
  intensity as intensityLabels,
  pain as painLabels,
  sex as sexLabels
} from './labels/labels'

export default class CycleDayOverView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cycleDay: props.cycleDay
    }
  }

  goToCycleDay(target) {
    const localDate = LocalDate.parse(this.state.cycleDay.date)
    const targetDate = target === 'before' ?
      localDate.minusDays(1).toString() :
      localDate.plusDays(1).toString()
    this.setState({ cycleDay: getOrCreateCycleDay(targetDate) })
  }

  navigate(symptom) {
    this.props.navigate(symptom, {
      cycleDay: this.state.cycleDay,
    })
  }

  render() {
    const cycleDay = this.state.cycleDay
    const getCycleDayNumber = cycleModule().getCycleDayNumber
    const cycleDayNumber = getCycleDayNumber(cycleDay.date)
    return (
      <View style={{ flex: 1 }}>
        <Header
          isCycleDayOverView={true}
          cycleDayNumber={cycleDayNumber}
          date={cycleDay.date}
          goToCycleDay={this.goToCycleDay.bind(this)}
        />
        <ScrollView>
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
            <SymptomBox
              title='Pain'
              onPress={() => this.navigate('PainEditView')}
              data={getLabel('pain', cycleDay.pain)}
            />
            {/*  this is just to make the last row adhere to the grid
        (and) because there are no pseudo properties in RN */}
            <FillerBoxes />
          </View >
        </ScrollView >
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
      const categories = ['feeling', 'texture', 'value']
      if (categories.every(c => typeof mucus[c] === 'number')) {
        let mucusLabel = [feelingLabels[mucus.feeling], textureLabels[mucus.texture]].join(', ')
        mucusLabel += `\n${computeSensiplanMucusLabels[mucus.value]}`
        if (mucus.exclude) mucusLabel = `(${mucusLabel})`
        return mucusLabel
      }
    },
    cervix: cervix => {
      let cervixLabel = []
      if (cervix.opening > -1 && cervix.firmness > -1) {
        cervixLabel.push(
          openingLabels[cervix.opening],
          firmnessLabels[cervix.firmness]
        )
        if (cervix.position > -1) {
          cervixLabel.push(positionLabels[cervix.position])
        }
        cervixLabel = cervixLabel.join(', ')
        if (cervix.exclude) cervixLabel = `(${cervixLabel})`
        return cervixLabel
      }
    },
    note: note => {
      return note.value
    },
    desire: desire => {
      if (typeof desire.value === 'number') {
        const desireLabel = `${intensityLabels[desire.value]}`
        return desireLabel
      }
    },
    sex: sex => {
      let sexLabel = []
      if (sex && Object.values(sex).some(val => val)){
        Object.keys(sex).forEach(key => {
          if(sex[key] && key !== 'note') {
            sexLabel.push(sexLabels[key])
          }
          if(key === "note" && sex.note) {
            sexLabel.push(sex.note)
          }
        })
        sexLabel = sexLabel.join(', ')
        if (sex.exclude) sexLabel = `(${sexLabel})`
      }
      return sexLabel
    },
    pain: pain => {
      let painLabel = []
      if (pain && Object.values(pain).some(val => val)){
        Object.keys(pain).forEach(key => {
          if(pain[key] && key !== 'note') {
            painLabel.push(painLabels[key])
          }
          if(key === "note" && pain.note) {
            painLabel.push(pain.note)
          }
        })
        painLabel = painLabel.join(', ')
        if (pain.exclude) painLabel = `(${painLabel})`
      }
      return painLabel
    }
  }

  if (!symptom) return
  const label = labels[symptomName](symptom)
  if (label.length < 45) return label
  return label.slice(0, 42) + '...'
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
        </View>
        <View style={styles.symptomDataBox}>
          <Text style={styles.symptomDataText}>{this.props.data}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

class FillerBoxes extends Component {
  render() {
    const n = Dimensions.get('window').width / styles.symptomBox.width
    const fillerBoxes = []
    for (let i = 0; i < Math.ceil(n); i++) {
      fillerBoxes.push(
        <View
          width={styles.symptomBox.width}
          height={0}
          key={i.toString()}
        />
      )
    }
    return fillerBoxes
  }
}
