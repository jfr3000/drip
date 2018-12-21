import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import AppText from '../app-text'
import styles from '../../styles/index'
import labels from '../../i18n/en/settings'
export default class AboutSection extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.settingsSegment}>
          <AppText style={styles.settingsSegmentTitle}>{`${labels.aboutSection.title} `}</AppText>
          <AppText>{`${labels.aboutSection.segmentExplainer} `}</AppText>
        </View>
        <View style={styles.settingsSegment}>
          <AppText style={styles.settingsSegmentTitle}>{`${labels.credits.title} `}</AppText>
          <AppText>{`${labels.credits.note}`}</AppText>
        </View>
      </ScrollView>
    )
  }
}
