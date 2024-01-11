import React, { useState } from 'react'

import AppPage from '../../common/app-page'
import AppSwitch from '../../common/app-switch'
import AppText from '../../common/app-text'
import TemperatureSlider from './temperature-slider'
import Segment from '../../common/segment'

import {
  periodPredictionObservable,
  savePeriodPrediction,
  useCervixObservable,
  saveUseCervix,
  saveSexTrackingCategory,
  sexTrackingCategoryObservable,
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

  const [isSexTrackingCategoryEnabled, setSexTrackingCategory] = useState(
    sexTrackingCategoryObservable.value
  )

  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

  const sexTrackingCategoryToggle = (value) => {
    setSexTrackingCategory(value)
    saveSexTrackingCategory(value)
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
          onToggle={sexTrackingCategoryToggle}
          text={"sex: when turned off it won't show"}
          value={isSexTrackingCategoryEnabled}
          trackColor={{ true: Colors.turquoiseDark }}
        />
        <AppSwitch
          onToggle={toggleSwitch}
          text={'desire'}
          value={isEnabled}
          trackColor={{ true: Colors.turquoiseDark }}
        />
        <AppSwitch
          onToggle={toggleSwitch}
          text={'pain'}
          value={isEnabled}
          trackColor={{ true: Colors.turquoiseDark }}
        />
        <AppSwitch
          onToggle={toggleSwitch}
          text={'mood'}
          value={isEnabled}
          trackColor={{ true: Colors.turquoiseDark }}
        />
        <AppSwitch
          onToggle={toggleSwitch}
          text={'note'}
          value={isEnabled}
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
