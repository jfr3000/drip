import React, { useEffect, useState } from 'react'
import { Alert, Pressable } from 'react-native'

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
  mucusTrackingCategoryObservable,
  cervixTrackingCategoryObservable,
  saveDesireTrackingCategory,
  saveMoodTrackingCategory,
  saveNoteTrackingCategory,
  savePainTrackingCategory,
  saveMucusTrackingCategory,
  saveCervixTrackingCategory,
  savePeriodPrediction,
  saveSexTrackingCategory,
  saveTemperatureTrackingCategory,
  saveUseCervix,
  periodPredictionObservable,
  useCervixObservable,
} from '../../../local-storage'
import { Colors } from '../../../styles'
import labels from '../../../i18n/en/settings'
import { SYMPTOMS } from '../../../config'

const Settings = () => {
  const [shouldUseCervix, setShouldUseCervix] = useState(
    useCervixObservable.value
  )

  const [isPeriodPredictionEnabled, setPeriodPrediction] = useState(
    periodPredictionObservable.value
  )

  const [isTemperatureTrackingCategoryEnabled, setTemperatureTrackingCategory] =
    useState(temperatureTrackingCategoryObservable.value)

  const [isMucusTrackingCategoryEnabled, setMucusTrackingCategory] = useState(
    mucusTrackingCategoryObservable.value
  )

  const [isCervixTrackingCategoryEnabled, setCervixTrackingCategory] = useState(
    cervixTrackingCategoryObservable.value
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

  const [isSecondarySymptomDisabled, setIsSecondarySymptomDisabled] =
    useState(false)

  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

  const temperatureTrackingCategoryToggle = (value) => {
    setTemperatureTrackingCategory(value)
    saveTemperatureTrackingCategory(value)
  }

  const mucusTrackingCategoryToggle = (value) => {
    if (!cervixTrackingCategoryObservable.value && value) {
      setShouldUseCervix(false)
      setIsSecondarySymptomDisabled(true)
    } else if (cervixTrackingCategoryObservable.value && value) {
      setIsSecondarySymptomDisabled(false)
    } else if (cervixTrackingCategoryObservable.value && !value) {
      setShouldUseCervix(true)
      setIsSecondarySymptomDisabled(true)
    } else if (!cervixTrackingCategoryObservable.value && !value) {
      setIsSecondarySymptomDisabled(true)
    }
    setMucusTrackingCategory(value)
    saveMucusTrackingCategory(value)
    saveUseCervix(shouldUseCervix)
  }

  const cervixTrackingCategoryToggle = (value) => {
    if (!mucusTrackingCategoryObservable.value && value) {
      setShouldUseCervix(true)
      setIsSecondarySymptomDisabled(true)
    } else if (mucusTrackingCategoryObservable.value && value) {
      setIsSecondarySymptomDisabled(false)
    } else if (mucusTrackingCategoryObservable.value && !value) {
      setShouldUseCervix(false)
      setIsSecondarySymptomDisabled(true)
    } else if (!mucusTrackingCategoryObservable.value && !value) {
      setIsSecondarySymptomDisabled(true)
    }
    setCervixTrackingCategory(value)
    saveCervixTrackingCategory(value)
    saveUseCervix(shouldUseCervix)
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

  useEffect(() => {
    if (
      !mucusTrackingCategoryObservable.value &&
      cervixTrackingCategoryObservable.value
    ) {
      setShouldUseCervix(true)
      setIsSecondarySymptomDisabled(false)
    } else if (
      mucusTrackingCategoryObservable.value &&
      cervixTrackingCategoryObservable.value
    ) {
      setIsSecondarySymptomDisabled(false)
    } else if (
      mucusTrackingCategoryObservable.value &&
      !cervixTrackingCategoryObservable.value
    ) {
      setShouldUseCervix(false)
      setIsSecondarySymptomDisabled(false)
    } else if (
      !mucusTrackingCategoryObservable.value &&
      !cervixTrackingCategoryObservable.value
    ) {
      setIsSecondarySymptomDisabled(true)
    }
  }, [])

  const secSymptomDisabledPrompt = () => {
    if (isSecondarySymptomDisabled) {
      Alert.alert(
        labels.periodReminder.alertNoPeriodReminder.title,
        labels.periodReminder.alertNoPeriodReminder.message
      )
    }
  }

  const cervixText = shouldUseCervix
    ? labels.useCervix.cervixModeOn
    : labels.useCervix.cervixModeOff

  const sliderDisabledPrompt = () => {
    if (!isTemperatureTrackingCategoryEnabled) {
      Alert.alert(labels.disabled.title, labels.disabled.message)
    }
  }
  return (
    <AppPage title={'Customization'}>
      <Segment title={'Tracking categories'}>
        <AppSwitch
          onToggle={temperatureTrackingCategoryToggle}
          text={SYMPTOMS[1]}
          value={isTemperatureTrackingCategoryEnabled}
        />

        <AppSwitch
          onToggle={(enabled) => {
            mucusTrackingCategoryToggle(enabled)
          }}
          text={'mucus'}
          value={isMucusTrackingCategoryEnabled}
          trackColor={{ true: Colors.turquoiseDark }}
        />
        <AppSwitch
          onToggle={(enabled) => {
            cervixTrackingCategoryToggle(enabled)
          }}
          text={'cervix'}
          value={isCervixTrackingCategoryEnabled}
          trackColor={{ true: Colors.turquoiseDark }}
        />
        <AppSwitch
          onToggle={sexTrackingCategoryToggle}
          text={SYMPTOMS[4]}
          value={isSexTrackingCategoryEnabled}
          trackColor={{ true: Colors.turquoiseDark }}
        />
        <AppSwitch
          onToggle={desireTrackingCategoryToggle}
          text={SYMPTOMS[5]}
          value={isDesireTrackingCategoryEnabled}
          trackColor={{ true: Colors.turquoiseDark }}
        />
        <AppSwitch
          onToggle={painTrackingCategoryToggle}
          text={SYMPTOMS[6]}
          value={isPainTrackingCategoryEnabled}
          trackColor={{ true: Colors.turquoiseDark }}
        />
        <AppSwitch
          onToggle={moodTrackingCategoryToggle}
          text={SYMPTOMS[7]}
          value={isMoodTrackingCategoryEnabled}
          trackColor={{ true: Colors.turquoiseDark }}
        />
        <AppSwitch
          onToggle={noteTrackingCategoryToggle}
          text={SYMPTOMS[8]}
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

      <Pressable onPress={sliderDisabledPrompt}>
        <Segment title={labels.tempScale.segmentTitle}>
          {isTemperatureTrackingCategoryEnabled && (
            <>
              <AppText>{labels.tempScale.segmentExplainer}</AppText>
              <TemperatureSlider />
            </>
          )}
          {!isTemperatureTrackingCategoryEnabled && (
            <AppText>{labels.disabled.message}</AppText>
          )}
        </Segment>
      </Pressable>

      <Pressable onPress={secSymptomDisabledPrompt}>
        <Segment title={labels.useCervix.title}>
          <AppSwitch
            onToggle={onCervixToggle}
            text={cervixText}
            value={shouldUseCervix}
            trackColor={{ true: Colors.turquoiseDark }}
            disabled={isSecondarySymptomDisabled}
          />
        </Segment>
      </Pressable>

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
