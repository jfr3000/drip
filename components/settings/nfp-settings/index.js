import React, { Component } from 'react'
import {
  ScrollView, View
} from 'react-native'
import styles from '../../../styles'
import labels from '../../../i18n/en/settings'
import AppText from '../../common/app-text'
import Segment from '../../common/segment'
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
        <Segment title={labels.useCervix.title}>
          <UseCervixSetting/>
        </Segment>
        <Segment title={labels.tempScale.segmentTitle}>
          <AppText>{labels.tempScale.segmentExplainer}</AppText>
          <TempSlider/>
        </Segment>
        <Segment style={styles.framedSegmentLast} >
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="info-with-circle"/>
            <AppText style={styles.framedSegmentTitle}>{` ${labels.preOvu.title} `}</AppText>
          </View>
          <AppText>{labels.preOvu.note}</AppText>
        </Segment>
      </ScrollView>
    )
  }
}
