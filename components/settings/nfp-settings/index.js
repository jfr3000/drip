import React, { Component } from 'react'
import {
  ScrollView, View
} from 'react-native'
import styles from '../../../styles'
import labels from '../../../i18n/en/settings'
import AppText from '../../common/app-text'
import FramedSegment from '../../common/framed-segment'
import TempSlider from './temp-slider'
import UseCervixSetting from './use-cervix'
import Icon from 'react-native-vector-icons/Entypo'

export default class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <ScrollView>
        <FramedSegment title={labels.useCervix.title}>
          <UseCervixSetting/>
        </FramedSegment>
        <FramedSegment title={labels.tempScale.segmentTitle}>
          <AppText>{labels.tempScale.segmentExplainer}</AppText>
          <TempSlider/>
        </FramedSegment>
        <FramedSegment style={styles.framedSegmentLast} >
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="info-with-circle"/>
            <AppText style={styles.framedSegmentTitle}>{` ${labels.preOvu.title} `}</AppText>
          </View>
          <AppText>{labels.preOvu.note}</AppText>
        </FramedSegment>
      </ScrollView>
    )
  }
}
