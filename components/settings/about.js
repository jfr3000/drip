import React, { Component } from 'react'
import {
  View
} from 'react-native'
import AppText from '../app-text'
import styles from '../../styles/index'
import { settings as labels } from '../../i18n/en/settings'
export default class AboutSection extends Component {
  render() {
    return (
      <View style={styles.settingsSegment}>
        <AppText style={styles.settingsSegmentTitle}>{`${labels.aboutSection.title} `}</AppText>
        <AppText>{`${labels.aboutSection.segmentExplainer} `}</AppText>
      </View>
    )
  }
}
