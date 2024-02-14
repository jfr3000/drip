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
  const periodPredictionText = isPeriodPredictionEnabled
    ? labels.periodPrediction.on
    : labels.periodPrediction.off

  const secondarySymptomButtons = [
    {
      label: 'cervical mucus',
      value: 0,
    },
    {
      label: 'cervix',
      value: 1,
    },
  ]

  const onSelectTab = (value) => {
    if (isMucusTrackingCategoryEnabled && isCervixTrackingCategoryEnabled) {
      setShouldUseCervix(value)
      saveUseCervix(value)
    }
  }

  useEffect(() => {
    manageSecondarySymptom(
      cervixTrackingCategoryObservable.value,
      mucusTrackingCategoryObservable.value
    )
  }, [])

  const manageSecondarySymptom = (cervix, mucus) => {
    if (!cervix && mucus) {
      setShouldUseCervix(false)
      setIsSecondarySymptomDisabled(true)
    } else if (cervix && mucus) {
      setIsSecondarySymptomDisabled(false)
    } else if (cervix && !mucus) {
      setShouldUseCervix(true)
      setIsSecondarySymptomDisabled(true)
    } else if (!cervix && !mucus) {
      setIsSecondarySymptomDisabled(true)
    }
    setMucusTrackingCategory(mucus)
    saveMucusTrackingCategory(mucus)
    setCervixTrackingCategory(cervix)
    saveCervixTrackingCategory(cervix)
    saveUseCervix(shouldUseCervix)
  }

  const secSymptomDisabledPrompt = () => {
    if (!isMucusTrackingCategoryEnabled && !isCervixTrackingCategoryEnabled) {
      Alert.alert(
        labels.useCervix.disabled.title,
        labels.useCervix.disabled.message
      )
    } else if (
      !isMucusTrackingCategoryEnabled ||
      !isCervixTrackingCategoryEnabled
    ) {
      Alert.alert(
        labels.useCervix.disabled.title,
        labels.useCervix.disabled.noSecondaryEnabled
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
          text={SYMPTOMS[2]}
          value={isMucusTrackingCategoryEnabled}
          trackColor={{ true: Colors.turquoiseDark }}
        />

        <AppSwitch
          onToggle={(enabled) => {
            cervixTrackingCategoryToggle(enabled)
          }}
          text={SYMPTOMS[3]}
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
          {/* noch condition adden like isSecondarySymptomDisabled */}
          {isTemperatureTrackingCategoryEnabled && (
            <>
              <AppText>{cervixText}</AppText>

              <SelectTabGroup
                activeButton={shouldUseCervix}
                buttons={secondarySymptomButtons}
                onSelect={(value) => onSelectTab(value)}
              />
            </>
          )}
          {!isTemperatureTrackingCategoryEnabled && (
            <AppText>{labels.disabled.message}</AppText>
          )}
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
