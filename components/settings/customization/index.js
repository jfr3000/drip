import React, { useEffect, useState } from 'react'
import { Alert, Pressable } from 'react-native'

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
  periodPredictionObservable,
  useCervixAsSecondarySymptomObservable,
} from '../../../local-storage'
import labels from '../../../i18n/en/settings'
import { SYMPTOMS } from '../../../config'

const Settings = () => {
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
    } else if (cervix && mucus) {
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
    if (!isMucusTrackingCategoryEnabled == isCervixTrackingCategoryEnabled) {
      Alert.alert(
        labels.secondarySymptom.disabled.title,
        labels.secondarySymptom.disabled.noSecondaryEnabled
      )
    }
  }

  const cervixText = useCervixAsSecondarySymptom
    ? labels.secondarySymptom.cervixModeOn
    : labels.secondarySymptom.cervixModeOff

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
          text={SYMPTOMS[2]}
          value={isMucusTrackingCategoryEnabled}
        />

        <AppSwitch
          onToggle={(enabled) => {
            cervixTrackingCategoryToggle(enabled)
          }}
          text={SYMPTOMS[3]}
          value={isCervixTrackingCategoryEnabled}
        />

        <AppSwitch
          onToggle={sexTrackingCategoryToggle}
          text={SYMPTOMS[4]}
          value={isSexTrackingCategoryEnabled}
        />
        <AppSwitch
          onToggle={desireTrackingCategoryToggle}
          text={SYMPTOMS[5]}
          value={isDesireTrackingCategoryEnabled}
        />
        <AppSwitch
          onToggle={painTrackingCategoryToggle}
          text={SYMPTOMS[6]}
          value={isPainTrackingCategoryEnabled}
        />
        <AppSwitch
          onToggle={moodTrackingCategoryToggle}
          text={SYMPTOMS[7]}
          value={isMoodTrackingCategoryEnabled}
        />
        <AppSwitch
          onToggle={noteTrackingCategoryToggle}
          text={SYMPTOMS[8]}
          value={isNoteTrackingCategoryEnabled}
        />
      </Segment>
      <Pressable onPress={sliderDisabledPrompt}>
        <Segment title={labels.fertilityTracking.title}>
          {isTemperatureTrackingCategoryEnabled &&
          (isMucusTrackingCategoryEnabled ||
            isCervixTrackingCategoryEnabled) ? (
            <>
              <AppText>{labels.fertilityTracking.message}</AppText>
              <AppSwitch
                onToggle={fertilityTrackingToggle}
                text={fertilityTrackingText}
                value={isFertilityTrackingEnabled}
              />
            </>
          ) : (
            <AppText>{labels.disabled.message}</AppText>
          )}
        </Segment>
      </Pressable>

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

      {/* used to be switch for onCervixToggle */}
      <Pressable onPress={secondarySymptomDisabledPrompt}>
        <Segment title={labels.secondarySymptom.title}>
          {!isFertilityTrackingEnabled ? (
            <AppText>{labels.secondarySymptom.disabled.message}</AppText>
          ) : (
            <>
              <AppText>{cervixText}</AppText>
              <SelectTabGroup
                activeButton={useCervixAsSecondarySymptom}
                buttons={secondarySymptomButtons}
                onSelect={(value) => onSelectTab(value)}
              />
            </>
          )}
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
