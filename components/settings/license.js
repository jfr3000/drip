import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import Hyperlink from 'react-native-hyperlink'
import AppText from '../app-text'
import styles from '../../styles/index'
import labels from '../../i18n/en/settings'
import replace from '../helpers/replace-url-with-text'

export default class License extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.settingsSegment}>
          <Hyperlink linkStyle={styles.link} linkText={replace} linkDefault>
            <AppText style={styles.settingsSegmentTitle}>{`${labels.license.title} `}</AppText>
            <AppText>{`${labels.license.text} `}</AppText>
          </Hyperlink>
        </View>
      </ScrollView>
    )
  }
}
