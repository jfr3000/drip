import { ChronoUnit, LocalDate, LocalTime } from 'js-joda'

import { getPreviousTemperature, saveSymptom } from '../../db'
import { scaleObservable } from '../../local-storage'

import * as labels from '../../i18n/en/cycle-day'
import { getLabelsList } from './labels'
import { TEMP_MAX, TEMP_MIN } from '../../config'

const bleedingLabels = labels.bleeding.labels
const cervixLabels = labels.cervix
const contraceptiveLabels = labels.contraceptives.categories
const intensityLabels = labels.intensity
const moodLabels = labels.mood.categories
const mucusLabels = labels.mucus
const noteDescription = labels.noteExplainer
const painLabels = labels.pain.categories
const sexLabels = labels.sex.categories
const temperatureLabels = labels.temperature

const minutes = ChronoUnit.MINUTES

const isNumber = (value) => typeof value === 'number'
export const shouldShow = (value) => value !== null ? true : false

export const isPreviousTemperature = (temperature) => {
  const previousTemperature = getPreviousTemperature(temperature)
  const shouldShowSuggestion = previousTemperature ? true : false
  const suggestedTemperature = previousTemperature ?
    previousTemperature.toString() : null

  return { shouldShowSuggestion, suggestedTemperature }
}

export const isTemperatureOutOfRange = (temperature) => {
  if (temperature === '') return null

  const value = Number(temperature)
  const range = { min: TEMP_MIN, max: TEMP_MAX }
  const scale = scaleObservable.value

  let warningMsg = null

  if (value < range.min || value > range.max) {
    warningMsg = labels.temperature.outOfAbsoluteRangeWarning
  } else if (value < scale.min || value > scale.max) {
    warningMsg = labels.temperature.outOfRangeWarning
  }

  return warningMsg
}

export const blank = {
  bleeding: {
    exclude: false,
    value: null
  },
  cervix: {
    exclude: false,
    firmness: null,
    opening: null,
    position: null,
  },
  desire: {
    value: null
  },
  mood:{
    happy: null,
    sad: null,
    stressed: null,
    balanced: null,
    fine: null,
    anxious: null,
    energetic: null,
    fatigue: null,
    angry: null,
    other: null,
    note: null
  },
  mucus: {
    exclude: false,
    feeling: null,
    texture: null,
    value: null
  },
  note: {
    value: null
  },
  pain: {
    cramps: null,
    ovulationPain: null,
    headache: null,
    backache: null,
    nausea: null,
    tenderBreasts: null,
    migraine: null,
    other: null,
    note: null
  },
  sex: {
    solo: null,
    partner: null,
    condom: null,
    pill: null,
    iud: null,
    patch: null,
    ring: null,
    implant: null,
    diaphragm: null,
    none: null,
    other: null,
    note: null
  },
  temperature: {
    exclude: false,
    note: null,
    time: LocalTime.now().truncatedTo(minutes).toString(),
    value: null
  }
}

export const symtomPage = {
  bleeding: {
    excludeText: labels.bleeding.exclude.explainer,
    note: null,
    selectBoxGroups: null,
    selectTabGroups: [{
      key: 'value',
      options: getLabelsList(bleedingLabels),
      title: labels.bleeding.heaviness.explainer,
    }]
  },
  cervix: {
    excludeText: cervixLabels.excludeExplainer,
    note: null,
    selectBoxGroups: null,
    selectTabGroups: [
      {
        key: 'opening',
        options: getLabelsList(cervixLabels.opening.categories),
        title: cervixLabels.opening.explainer,
      },
      {
        key: 'firmness',
        options: getLabelsList(cervixLabels.firmness.categories),
        title: cervixLabels.firmness.explainer,
      },
      {
        key: 'position',
        options: getLabelsList(cervixLabels.position.categories),
        title: cervixLabels.position.explainer,
      }
    ]
  },
  desire: {
    excludeText: null,
    note: null,
    selectBoxGroups: null,
    selectTabGroups: [{
      key: 'value',
      options: getLabelsList(intensityLabels),
      title: labels.desire.explainer
    }]
  },
  mucus: {
    excludeText: mucusLabels.excludeExplainer,
    note: null,
    selectBoxGroups: null,
    selectTabGroups: [
      {
        key: 'feeling',
        options: getLabelsList(mucusLabels.feeling.categories),
        title: mucusLabels.feeling.explainer,
      },
      {
        key: 'texture',
        options: getLabelsList(mucusLabels.texture.categories),
        title: mucusLabels.texture.explainer,
      }
    ]
  },
  mood: {
    excludeText: null,
    note: null,
    selectBoxGroups: [{
      key: 'mood',
      options: moodLabels,
      title: labels.mood.explainer
    }],
    selectTabGroups: null
  },
  note: {
    excludeText: null,
    note: noteDescription,
    selectBoxGroups: null,
    selectTabGroups: null
  },
  pain: {
    excludeText: null,
    note: null,
    selectBoxGroups: [{
      key: 'pain',
      options: painLabels,
      title: labels.pain.explainer
    }],
    selectTabGroups: null
  },
  sex: {
    excludeText: null,
    note: null,
    selectBoxGroups: [
      {
        key: 'sex',
        options: sexLabels,
        title: labels.sex.explainer,
      },
      {
        key: 'contraceptives',
        options: contraceptiveLabels,
        title: labels.contraceptives.explainer,
      }
    ],
    selectTabGroups: null
  },
  temperature: {
    excludeText: temperatureLabels.exclude.explainer,
    note: temperatureLabels.note.explainer,
    selectBoxGroups: null,
    selectTabGroups: null
  }
}

export const save = {
  bleeding: (data, date, shouldDeleteData) => {
    const { exclude, value } = data
    const isDataEntered = isNumber(value)
    const valuesToSave = shouldDeleteData || !isDataEntered
      ? null : { value, exclude }

    saveSymptom('bleeding', date, valuesToSave)
  },
  cervix: (data, date, shouldDeleteData) => {
    const { opening, firmness, position, exclude } = data
    const isDataEntered = ['opening', 'firmness', 'position'].some(
      value => isNumber(data[value]))
    const valuesToSave = shouldDeleteData || !isDataEntered
      ? null : { opening, firmness, position, exclude }

    saveSymptom('cervix', date, valuesToSave)
  },
  desire: (data, date, shouldDeleteData) => {
    const { value } = data
    const valuesToSave = shouldDeleteData || !isNumber(value)
      ? null : { value }

    saveSymptom('desire', date, valuesToSave)
  },
  mood: (data, date, shouldDeleteData) => {
    saveBoxSymptom(data, date, shouldDeleteData, 'mood')
  },
  mucus: (data, date, shouldDeleteData) => {
    const { feeling, texture, exclude } = data
    const isDataEntered = ['feeling', 'texture'].some(
      value => isNumber(data[value]))
    const valuesToSave = shouldDeleteData || !isDataEntered
      ? null : { feeling, texture, exclude }

    saveSymptom('mucus', date, valuesToSave)
  },
  note: (data, date, shouldDeleteData) => {
    const { value } = data
    const isValidData = value !== null && value !== ''
    const valuesToSave = shouldDeleteData || !isValidData ? null : { value }

    saveSymptom('note', date, valuesToSave)
  },
  pain: (data, date, shouldDeleteData) => {
    saveBoxSymptom(data, date, shouldDeleteData, 'pain')
  },
  sex: (data, date, shouldDeleteData) => {
    saveBoxSymptom(data, date, shouldDeleteData, 'sex')
  },
  temperature: (data, date, shouldDeleteData) => {
    const { exclude, note, time, value } = data
    const valuesToSave = {
      exclude,
      note,
      time,
      value: Number(value)
    }

    saveSymptom(
      'temperature',
      date,
      (shouldDeleteData || value === null) ? null : valuesToSave
    )
  }
}

const saveBoxSymptom = (data, date, shouldDeleteData, symptom) => {
  const isDataEntered = Object.keys(data).some(key => data[key] !== null)
  const valuesToSave = shouldDeleteData || !isDataEntered
    ? null : data

  saveSymptom(symptom, date, valuesToSave)
}

const label = {
  bleeding: ({ value, exclude }) => {
    if (isNumber(value)) {
      const bleedingLabel = bleedingLabels[value]
      return exclude ? `(${bleedingLabel})` : bleedingLabel
    }
  },
  temperature: ({ value, time, exclude }) => {
    if (isNumber(value)) {
      let temperatureLabel = `${value} °C`
      if (time) {
        temperatureLabel += ` - ${time}`
      }
      if (exclude) {
        temperatureLabel = `(${temperatureLabel})`
      }
      return temperatureLabel
    }
  },
  mucus: mucus => {
    const filledCategories = ['feeling', 'texture'].filter(c => isNumber(mucus[c]))
    let label = filledCategories.map(category => {
      return labels.mucus.subcategories[category] + ': ' + labels.mucus[category].categories[mucus[category]]
    }).join(', ')

    if (isNumber(mucus.value)) label += `\n => ${labels.mucusNFP[mucus.value]}`
    if (mucus.exclude) label = `(${label})`

    return label
  },
  cervix: cervix => {
    const filledCategories = ['opening', 'firmness', 'position'].filter(c => isNumber(cervix[c]))
    let label = filledCategories.map(category => {
      return labels.cervix.subcategories[category] + ': ' + labels.cervix[category].categories[cervix[category]]
    }).join(', ')

    if (cervix.exclude) label = `(${label})`

    return label
  },
  note: note => note.value,
  desire: ({ value }) => {
    if (isNumber(value)) {
      return intensityLabels[value]
    }
  },
  sex: sex => {
    const sexLabel = []
    if (sex && Object.values({...sex}).some(val => val)){
      Object.keys(sex).forEach(key => {
        if(sex[key] && key !== 'other' && key !== 'note') {
          sexLabel.push(
            sexLabels[key] ||
            contraceptiveLabels[key]
          )
        }
        if(key === 'other' && sex.other) {
          let label = contraceptiveLabels[key]
          if(sex.note) {
            label = `${label} (${sex.note})`
          }
          sexLabel.push(label)
        }
      })
      return sexLabel.join(', ')
    }
  },
  pain: pain => {
    const painLabel = []
    if (pain && Object.values({...pain}).some(val => val)){
      Object.keys(pain).forEach(key => {
        if(pain[key] && key !== 'other' && key !== 'note') {
          painLabel.push(painLabels[key])
        }
        if(key === 'other' && pain.other) {
          let label = painLabels[key]
          if(pain.note) {
            label = `${label} (${pain.note})`
          }
          painLabel.push(label)
        }
      })
      return painLabel.join(', ')
    }
  },
  mood: mood => {
    const moodLabel = []
    if (mood && Object.values({...mood}).some(val => val)){
      Object.keys(mood).forEach(key => {
        if(mood[key] && key !== 'other' && key !== 'note') {
          moodLabel.push(moodLabels[key])
        }
        if(key === 'other' && mood.other) {
          let label = moodLabels[key]
          if(mood.note) {
            label = `${label} (${mood.note})`
          }
          moodLabel.push(label)
        }
      })
      return moodLabel.join(', ')
    }
  }
}

export const getData = (symptom, symptomData) => {
  return symptomData && label[symptom](symptomData)
}

export const prevDate = (dateString) => {
  return LocalDate.parse(dateString).minusDays(1).toString()
}

export const nextDate = (dateString) => {
  return LocalDate.parse(dateString).plusDays(1).toString()
}

export const isDateInFuture = (dateString) => {
  return LocalDate.now().isBefore(LocalDate.parse(dateString))
}

export const isTomorrowInFuture = (dateString) => {
  const tomorrow = nextDate(dateString)
  return LocalDate.now().isBefore(LocalDate.parse(tomorrow))
}

export const isYesterdayInFuture = (dateString) => {
  const yesterday = prevDate(dateString)
  return LocalDate.now().isBefore(LocalDate.parse(yesterday))
}