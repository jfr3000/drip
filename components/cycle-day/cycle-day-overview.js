import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

import AppPage from '../common/app-page'
import SymptomBox from './symptom-box'
import SymptomPageTitle from './symptom-page-title'

import { connect } from 'react-redux'
import { getDate } from '../../slices/date'

import cycleModule from '../../lib/cycle'
import { dateToTitle } from '../helpers/format-date'
import { getCycleDay } from '../../db'
import { getData } from '../helpers/cycle-day'

import { general as labels } from '../../i18n/en/cycle-day'
import { Spacing } from '../../styles'
import { SYMPTOMS } from '../../config'

const CycleDayOverView = ({ date, isTemperatureEditView }) => {
  const cycleDay = getCycleDay(date)

  const { getCycleDayNumber } = cycleModule()
  const cycleDayNumber = getCycleDayNumber(date)
  const subtitle = cycleDayNumber && `${labels.cycleDayNumber}${cycleDayNumber}`
  const [editedSymptom, setEditedSymptom] = useState(
    isTemperatureEditView ? 'temperature' : ''
  )

  return (
    <AppPage>
      <SymptomPageTitle subtitle={subtitle} title={dateToTitle(date)} />
      <View style={styles.container}>
        {SYMPTOMS.map((symptom) => {
          const symptomData =
            cycleDay && cycleDay[symptom] ? cycleDay[symptom] : null

          return (
            <SymptomBox
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

const mapStateToProps = (state) => {
  return {
    date: getDate(state),
  }
}

export default connect(mapStateToProps, null)(CycleDayOverView)
