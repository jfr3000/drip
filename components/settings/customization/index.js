import React, { useState } from 'react'

import AppPage from '../../common/app-page'
import AppSwitch from '../../common/app-switch'
import AppText from '../../common/app-text'
import TemperatureSlider from './temperature-slider'
import Segment from '../../common/segment'

import {
  desireTrackingCategoryObservable,
  moodTrackingCategoryObservable,
  noteTrackingCategoryObservable,
  painTrackingCategoryObservable,
  sexTrackingCategoryObservable,
  temperatureTrackingCategoryObservable,
  saveDesireTrackingCategory,
  saveMoodTrackingCategory,
  saveNoteTrackingCategory,
  savePainTrackingCategory,
  savePeriodPrediction,
  saveSexTrackingCategory,
  saveTemperatureTrackingCategory,
  saveUseCervix,
  periodPredictionObservable,
  useCervixObservable,
} from '../../../local-storage'
import { Colors } from '../../../styles'
import labels from '../../../i18n/en/settings'

const Settings = () => {
  const [shouldUseCervix, setShouldUseCervix] = useState(
    useCervixObservable.value
  )

  const [isPeriodPredictionEnabled, setPeriodPrediction] = useState(
    periodPredictionObservable.value
  )

  const [isTemperatureTrackingCategoryEnabled, setTemperatureTrackingCategory] = useState(
    temperatureTrackingCategoryObservable.value
  )

  const [isSexTrackingCategoryEnabled, setSexTrackingCategory] = useState(
    sexTrackingCategoryObservable.value
  )

  const [isDesireTrackingCategoryEnabled, setDesireTrackingCategory] = useState(
    desireTrackingCategoryObservable.value
  )

  const [isPainTrackingCategoryEnabled, setPainTrackingCategory] = useState(
    painTrackingCategoryObservable.value
  )

  const [isMoodTrackingCategoryEnabled, setMoodTrackingCategory] = useState(
    moodTrackingCategoryObservable.value
  )

  const [isNoteTrackingCategoryEnabled, setNoteTrackingCategory] = useState(
    noteTrackingCategoryObservable.value
  )

  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

  const temperatureTrackingCategoryToggle = (value) => {
    setTemperatureTrackingCategory(value)
    saveTemperatureTrackingCategory(value)
  }

  const sexTrackingCategoryToggle = (value) => {
    setSexTrackingCategory(value)
    saveSexTrackingCategory(value)
  }

  const desireTrackingCategoryToggle = (value) => {
    setDesireTrackingCategory(value)
    saveDesireTrackingCategory(value)
  }
  const painTrackingCategoryToggle = (value) => {
    setPainTrackingCategory(value)
    savePainTrackingCategory(value)
  }
  const moodTrackingCategoryToggle = (value) => {
    setMoodTrackingCategory(value)
    saveMoodTrackingCategory(value)
  }
  const noteTrackingCategoryToggle = (value) => {
    setNoteTrackingCategory(value)
    saveNoteTrackingCategory(value)
  }

  const onPeriodPredictionToggle = (value) => {
    setPeriodPrediction(value)
    savePeriodPrediction(value)
  }

  const periodPredictionText = isPeriodPredictionEnabled
    ? labels.periodPrediction.on
    : labels.periodPrediction.off

  const onCervixToggle = (value) => {
    setShouldUseCervix(value)
    saveUseCervix(value)
  }

  const cervixText = shouldUseCervix
    ? labels.useCervix.cervixModeOn
    : labels.useCervix.cervixModeOff

  return (
    <AppPage title={'Customization'}>
      <Segment title={'Tracking categories'}>
        <AppSwitch
          onToggle={temperatureTrackingCategoryToggle}
          text={'temperature'}
          value={isTemperatureTrackingCategoryEnabled}
          trackColor={{ true: Colors.turquoiseDark }}
        />
        <AppSwitch
          onToggle={sexTrackingCategoryToggle}
          text={'sex'}
          value={isSexTrackingCategoryEnabled}
          trackColor={{ true: Colors.turquoiseDark }}
        />
        <AppSwitch
          onToggle={desireTrackingCategoryToggle}
          text={'desire'}
          value={isDesireTrackingCategoryEnabled}
          trackColor={{ true: Colors.turquoiseDark }}
        />
        <AppSwitch
          onToggle={painTrackingCategoryToggle}
          text={'pain'}
          value={isPainTrackingCategoryEnabled}
          trackColor={{ true: Colors.turquoiseDark }}
        />
        <AppSwitch
          onToggle={moodTrackingCategoryToggle}
          text={'mood'}
          value={isMoodTrackingCategoryEnabled}
          trackColor={{ true: Colors.turquoiseDark }}
        />
        <AppSwitch
          onToggle={noteTrackingCategoryToggle}
          text={'note'}
          value={isNoteTrackingCategoryEnabled}
          trackColor={{ true: Colors.turquoiseDark }}
        />
      </Segment>

      <Segment title={'Fertility feature'}>
        <AppSwitch
          onToggle={toggleSwitch}
          text={'If turned on ...'}
          value={isEnabled}
          trackColor={{ true: Colors.turquoiseDark }}
        />
      </Segment>

      <Segment title={labels.tempScale.segmentTitle}>
        <AppText>{labels.tempScale.segmentExplainer}</AppText>
        <TemperatureSlider />
      </Segment>

      <Segment title={labels.useCervix.title}>
        <AppSwitch
          onToggle={onCervixToggle}
          text={cervixText}
          value={shouldUseCervix}
          trackColor={{ true: Colors.turquoiseDark }}
        />
      </Segment>

      <Segment title={labels.periodPrediction.title} last>
        <AppSwitch
          onToggle={onPeriodPredictionToggle}
          text={periodPredictionText}
          value={isPeriodPredictionEnabled}
          trackColor={{ true: Colors.turquoiseDark }}
        />
      </Segment>
    </AppPage>
  )
}

export default Settings
