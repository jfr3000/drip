import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import AppIcon from '../../common/app-icon'
import AppPage from '../../common/app-page'
import AppSwitch from '../../common/app-switch'
import AppText from '../../common/app-text'
import TemperatureSlider from './temperature-slider'
import Segment from '../../common/segment'

import { useCervixObservable, saveUseCervix } from '../../../local-storage'
import { Colors, Spacing, Typography } from '../../../styles/redesign'
import labels from '../../../i18n/en/settings'

export default class Settings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      shouldUseCervix: useCervixObservable.value
    }
  }

  onCervixToggle = (value) => {
    this.setState({ shouldUseCervix: value })
    saveUseCervix(value)
  }

  render() {
    const { shouldUseCervix } = this.state
    const cervixText = shouldUseCervix ?
      labels.useCervix.cervixModeOn : labels.useCervix.cervixModeOff

    return (
      <AppPage>
        <Segment title={labels.useCervix.title}>
          <AppSwitch
            onToggle={this.onCervixToggle}
            text={cervixText}
            value={shouldUseCervix}
          />
        </Segment>
        <Segment title={labels.tempScale.segmentTitle}>
          <AppText>{labels.tempScale.segmentExplainer}</AppText>
          <TemperatureSlider />
        </Segment>
        <Segment last>
          <View style={styles.line}>
            <AppIcon
              color={Colors.purple}
              name="info-with-circle"
              style={styles.icon}
            />
            <AppText style={styles.title}>{labels.preOvu.title}</AppText>
          </View>
          <AppText>{labels.preOvu.note}</AppText>
        </Segment>
      </AppPage>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    marginRight: Spacing.base
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    ...Typography.subtitle
  }
})
