import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Slider from '@ptomasroos/react-native-multi-slider'

import alertError from '../shared/alert-error'
import AppPage from '../../common/app-page'
import AppSwitch from '../../common/app-switch'
import AppText from '../../common/app-text'
import Label from './label'
import Segment from '../../common/segment'

import { useCervixObservable,
  saveUseCervix,
  scaleObservable,
  saveTempScale
} from '../../../local-storage'
import { Colors, Sizes } from '../../../styles/redesign'
import labels from '../../../i18n/en/settings'
import config from '../../../config'

export default class Settings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      useCervix: useCervixObservable.value,
      temperatureScale: { ...scaleObservable.value }
    }
  }

  onCervixToggle = (value) => {
    this.setState({ useCervix: value })
    saveUseCervix(value)
  }

  onSliderChange = (values) => {
    this.setState({ min: values[0], max: values[1] })
  }

  onSliderChangeFinish = (values) => {
    this.setState({ min: values[0], max: values[1] })

    try {
      saveTempScale({ min: values[0], max: values[1] })
    } catch(err) {
      alertError(labels.tempScale.saveError)
    }
  }

  render() {
    const { useCervix } = this.state
    const cervixText = useCervix ?
      labels.useCervix.cervixModeOn : labels.useCervix.cervixModeOff
    const { min, max } = this.state.temperatureScale
    return (
      <AppPage>
        <Segment title={labels.useCervix.title}>
          <AppSwitch
            onToggle={this.onCervixToggle}
            text={cervixText}
            value={useCervix}
          />
        </Segment>
        <Segment title={labels.tempScale.segmentTitle}>
          <AppText>{labels.tempScale.segmentExplainer}</AppText>
          <View style={styles.container}>
            <Slider
              customLabel={Label}
              enableLabel={true}
              markerStyle={styles.marker}
              markerOffsetY={Sizes.tiny}
              max={config.temperatureScale.max}
              min={config.temperatureScale.min}
              onValuesChange={this.onSliderChange}
              onValuesChangeFinish={this.onSliderChangeFinish}
              selectedStyle={styles.sliderAccentBackground}
              step={config.temperatureScale.step}
              trackStyle={styles.slider}
              unselectedStyle={styles.sliderBackground}
              values={[min, max]}
            />
          </View>
        </Segment>
        <Segment icon="info-with-circle" last title={labels.preOvu.title}>
          <AppText>{labels.preOvu.note}</AppText>
        </Segment>
      </AppPage>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: Sizes.base
  },
  marker: {
    backgroundColor: Colors.tourquiseDark,
    borderRadius: 50,
    elevation: 4,
    height: Sizes.subtitle,
    width: Sizes.subtitle
  },
  slider: {
    borderRadius: 25,
    height: Sizes.small
  },
  sliderAccentBackground: {
    backgroundColor: Colors.tourquiseDark
  },
  sliderBackground: {
    backgroundColor: Colors.tourquise
  },
})
