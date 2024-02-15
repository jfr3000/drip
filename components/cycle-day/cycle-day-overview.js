import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

import AppPage from '../common/app-page'
import SymptomBox from './symptom-box'
import SymptomPageTitle from './symptom-page-title'

import { getCycleDay } from '../../db'
import { getData, nextDate, prevDate } from '../helpers/cycle-day'

import {
  desireTrackingCategoryObservable,
  moodTrackingCategoryObservable,
  noteTrackingCategoryObservable,
  painTrackingCategoryObservable,
  sexTrackingCategoryObservable,
  temperatureTrackingCategoryObservable,
} from '../../local-storage'
import { Spacing } from '../../styles'
import { SYMPTOMS } from '../../config'

const CycleDayOverView = ({ date, setDate, isTemperatureEditView }) => {
  const cycleDay = getCycleDay(date)

  const [editedSymptom, setEditedSymptom] = useState(
    isTemperatureEditView ? 'temperature' : ''
  )

  const showNextCycleDay = () => {
    setDate(nextDate(date))
  }

  const showPrevCycleDay = () => {
    setDate(prevDate(date))
  }

  const allEnabledSymptoms = SYMPTOMS.map((symptom) => {
    if (symptom === 'temperature') {
      return temperatureTrackingCategoryObservable.value ? symptom : null
    } else if (symptom === 'sex') {
      return sexTrackingCategoryObservable.value ? symptom : null
    } else if (symptom === 'desire') {
      return desireTrackingCategoryObservable.value ? symptom : null
    } else if (symptom === 'pain') {
      return painTrackingCategoryObservable.value ? symptom : null
    } else if (symptom === 'mood') {
      return moodTrackingCategoryObservable.value ? symptom : null
    } else if (symptom === 'note') {
      return noteTrackingCategoryObservable.value ? symptom : null
    } else {
      return symptom
    }
  })
  const cleanSymptoms = allEnabledSymptoms.filter(Boolean)

  return (
    <AppPage>
      <SymptomPageTitle
        date={date}
        onNextCycleDay={showNextCycleDay}
        onPrevCycleDay={showPrevCycleDay}
      />
      <View style={styles.container}>
        {cleanSymptoms.map((symptom) => {
          const symptomData =
            cycleDay && cycleDay[symptom] ? cycleDay[symptom] : null

          return (
            <SymptomBox
              date={date}
              key={symptom}
              symptom={symptom}
              symptomData={symptomData}
              symptomDataToDisplay={getData(symptom, symptomData)}
              editedSymptom={editedSymptom}
              setEditedSymptom={setEditedSymptom}
            />
          )
        })}
      </View>
    </AppPage>
  )
}

CycleDayOverView.propTypes = {
  cycleDay: PropTypes.object,
  date: PropTypes.string,
  setDate: PropTypes.func,
  isTemperatureEditView: PropTypes.bool,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: Spacing.base,
  },
})

export default CycleDayOverView
