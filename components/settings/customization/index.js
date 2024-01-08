import React, { useState } from 'react'

import AppPage from '../../common/app-page'
import AppSwitch from '../../common/app-switch'
import AppText from '../../common/app-text'
import TemperatureSlider from './temperature-slider'
import Segment from '../../common/segment'

import { useCervixObservable, saveUseCervix } from '../../../local-storage'
import { Colors } from '../../../styles'
import labels from '../../../i18n/en/settings'

const Settings = () => {
  const [shouldUseCervix, setShouldUseCervix] = useState(
    useCervixObservable.value
  )

  const [isEnabled, setIsEnabled] = useState(true)
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

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
          onToggle={toggleSwitch}
          text={'temperature'}
          value={isEnabled}
          trackColor={{ true: Colors.turquoiseDark }}
        />
        <AppSwitch
          onToggle={toggleSwitch}
          text={'cervical mucus'}
          value={isEnabled}
          trackColor={{ true: Colors.turquoiseDark }}
        />
        <AppSwitch
          onToggle={toggleSwitch}
          text={'cervix'}
          value={isEnabled}
          trackColor={{ true: Colors.turquoiseDark }}
        />
        <AppSwitch
          onToggle={toggleSwitch}
          text={'sex'}
          value={isEnabled}
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

      <Segment title={'Period prediction'}>
        <AppSwitch
          onToggle={toggleSwitch}
          text={
            'If turned on drip will predict your next menstrual bleeding, after you have tracked 3 complete menstrual cycles.'
          }
          value={isEnabled}
          trackColor={{ true: Colors.turquoiseDark }}
        />
      </Segment>
    </AppPage>
  )
}

export default Settings
