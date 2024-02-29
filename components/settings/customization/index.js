import React, { useEffect, useState } from 'react'
import { Alert, Pressable } from 'react-native'
import { useTranslation } from 'react-i18next'

import AppPage from '../../common/app-page'
import AppSwitch from '../../common/app-switch'
import AppText from '../../common/app-text'
import TemperatureSlider from './temperature-slider'
import Segment from '../../common/segment'
import SelectTabGroup from '../../cycle-day/select-tab-group'

import {
  desireTrackingCategoryObservable,
  fertilityTrackingObservable,
  moodTrackingCategoryObservable,
  noteTrackingCategoryObservable,
  painTrackingCategoryObservable,
  sexTrackingCategoryObservable,
  temperatureTrackingCategoryObservable,
  mucusTrackingCategoryObservable,
  cervixTrackingCategoryObservable,
  periodPredictionObservable,
  useCervixAsSecondarySymptomObservable,
  saveDesireTrackingCategory,
  saveFertilityTrackingEnabled,
  saveMoodTrackingCategory,
  saveNoteTrackingCategory,
  savePainTrackingCategory,
  saveMucusTrackingCategory,
  saveCervixTrackingCategory,
  savePeriodPrediction,
  saveSexTrackingCategory,
  saveTemperatureTrackingCategory,
  saveUseCervixAsSecondarySymptom,
} from '../../../local-storage'
import labels from '../../../i18n/en/settings'
import { SYMPTOMS } from '../../../config'
import DisabledTemperatureSlider from './disabled-temperature-slider'

const Settings = () => {
  const { t } = useTranslation(null, { keyPrefix: 'symptoms' })

  const [useCervixAsSecondarySymptom, setUseCervixAsSecondarySymptom] =
    useState(useCervixAsSecondarySymptomObservable.value)

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

  const [isFertilityTrackingEnabled, setFertilityTrackingEnabled] = useState(
    fertilityTrackingObservable.value
  )
  const fertilityTrackingToggle = (value) => {
    setFertilityTrackingEnabled(value)
    saveFertilityTrackingEnabled(value)
  }

  const temperatureTrackingCategoryToggle = (value) => {
    setTemperatureTrackingCategory(value)
    saveTemperatureTrackingCategory(value)
    if (!value) {
      setFertilityTrackingEnabled(false)
      saveFertilityTrackingEnabled(false)
    }
  }
  const mucusTrackingCategoryToggle = (value) => {
    manageSecondarySymptom(cervixTrackingCategoryObservable.value, value)
  }
  const cervixTrackingCategoryToggle = (value) => {
    manageSecondarySymptom(value, mucusTrackingCategoryObservable.value)
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

  const fertilityTrackingText = isFertilityTrackingEnabled
    ? labels.fertilityTracking.on
    : labels.fertilityTracking.off

  const periodPredictionText = isPeriodPredictionEnabled
    ? labels.periodPrediction.on
    : labels.periodPrediction.off

  const secondarySymptomButtons = [
    {
      label: labels.secondarySymptom.mucus,
      value: 0,
    },
    {
      label: labels.secondarySymptom.cervix,
      value: 1,
    },
  ]

  const onSelectTab = (value) => {
    if (isMucusTrackingCategoryEnabled && isCervixTrackingCategoryEnabled) {
      setUseCervixAsSecondarySymptom(value)
      saveUseCervixAsSecondarySymptom(value)
    } else {
      secondarySymptomDisabledPrompt()
    }
  }

  // is needed so secondary symptom is set correct on load
  useEffect(() => {
    manageSecondarySymptom(
      cervixTrackingCategoryObservable.value,
      mucusTrackingCategoryObservable.value
    )
  }, [])

  const manageSecondarySymptom = (cervix, mucus) => {
    if (!cervix && mucus) {
      setUseCervixAsSecondarySymptom(0)
      saveUseCervixAsSecondarySymptom(0)
    } else if (cervix && !mucus) {
      setUseCervixAsSecondarySymptom(1)
      saveUseCervixAsSecondarySymptom(1)
    } else if (!cervix && !mucus) {
      setFertilityTrackingEnabled(false)
      saveFertilityTrackingEnabled(false)
    }
    setMucusTrackingCategory(mucus)
    saveMucusTrackingCategory(mucus)
    setCervixTrackingCategory(cervix)
    saveCervixTrackingCategory(cervix)
  }

  const secondarySymptomDisabledPrompt = () => {
    if (!isFertilityTrackingEnabled) {
      Alert.alert(
        labels.secondarySymptom.disabled.title,
        labels.secondarySymptom.disabled.message
      )
    } else if (
      !isMucusTrackingCategoryEnabled == isCervixTrackingCategoryEnabled
    ) {
      Alert.alert(
        labels.secondarySymptom.disabled.title,
        labels.secondarySymptom.disabled.noSecondaryEnabled
      )
    }
  }

  const manageFertilityFeature =
    isTemperatureTrackingCategoryEnabled &&
    (isMucusTrackingCategoryEnabled || isCervixTrackingCategoryEnabled)

  const cervixText = useCervixAsSecondarySymptom
    ? labels.secondarySymptom.cervixModeOn
    : labels.secondarySymptom.cervixModeOff

  const sliderDisabledPrompt = () => {
    if (!isFertilityTrackingEnabled) {
      Alert.alert(labels.tempScale.disabled, labels.tempScale.disabledMessage)
    }
  }

  const fertilityDisabledPrompt = () => {
    if (!isFertilityTrackingEnabled) {
      Alert.alert(labels.disabled.title, labels.fertilityTracking.disabled)
    }
  }

  return (
    <AppPage title={labels.customization.title}>
      <Segment title={labels.customization.trackingCategories}>
        <AppSwitch
          onToggle={temperatureTrackingCategoryToggle}
          text={t(SYMPTOMS[1])}
          value={isTemperatureTrackingCategoryEnabled}
        />
        <AppSwitch
          onToggle={(enabled) => {
            mucusTrackingCategoryToggle(enabled)
          }}
          text={t(SYMPTOMS[2])}
          value={isMucusTrackingCategoryEnabled}
        />
        <AppSwitch
          onToggle={(enabled) => {
            cervixTrackingCategoryToggle(enabled)
          }}
          text={t(SYMPTOMS[3])}
          value={isCervixTrackingCategoryEnabled}
        />
        <AppSwitch
          onToggle={sexTrackingCategoryToggle}
          text={t(SYMPTOMS[4])}
          value={isSexTrackingCategoryEnabled}
        />
        <AppSwitch
          onToggle={desireTrackingCategoryToggle}
          text={t(SYMPTOMS[5])}
          value={isDesireTrackingCategoryEnabled}
        />
        <AppSwitch
          onToggle={painTrackingCategoryToggle}
          text={t(SYMPTOMS[6])}
          value={isPainTrackingCategoryEnabled}
        />
        <AppSwitch
          onToggle={moodTrackingCategoryToggle}
          text={t(SYMPTOMS[7])}
          value={isMoodTrackingCategoryEnabled}
        />
        <AppSwitch
          onToggle={noteTrackingCategoryToggle}
          text={t(SYMPTOMS[8])}
          value={isNoteTrackingCategoryEnabled}
        />
      </Segment>
      <Pressable onPress={fertilityDisabledPrompt}>
        <Segment title={labels.fertilityTracking.title}>
          <AppText>{labels.fertilityTracking.message}</AppText>
          <AppSwitch
            onToggle={fertilityTrackingToggle}
            text={fertilityTrackingText}
            value={isFertilityTrackingEnabled}
            disabled={!manageFertilityFeature}
          />
        </Segment>
      </Pressable>
      {/* Not ideal to have a extra DisabledTemperatureSlider but right now hard to have always the correct state of fertilityTrackingObservable in TemperatureSlider */}
      <Pressable onPress={sliderDisabledPrompt}>
        <Segment title={labels.tempScale.segmentTitle}>
          <AppText>{labels.tempScale.segmentExplainer}</AppText>
          {isTemperatureTrackingCategoryEnabled & isFertilityTrackingEnabled ? (
            <>
              <TemperatureSlider />
            </>
          ) : (
            <>
              <DisabledTemperatureSlider />
            </>
          )}
        </Segment>
      </Pressable>

      <Pressable onPress={secondarySymptomDisabledPrompt}>
        <Segment title={labels.secondarySymptom.title}>
          <AppText>{cervixText}</AppText>
          <SelectTabGroup
            activeButton={useCervixAsSecondarySymptom}
            buttons={secondarySymptomButtons}
            onSelect={(value) => onSelectTab(value)}
            disabled={!isFertilityTrackingEnabled}
          />
        </Segment>
      </Pressable>

      <Segment title={labels.periodPrediction.title} last>
        <AppSwitch
          onToggle={onPeriodPredictionToggle}
          text={periodPredictionText}
          value={isPeriodPredictionEnabled}
        />
      </Segment>
    </AppPage>
  )
}

export default Settings
