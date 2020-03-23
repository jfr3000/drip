import React, { Component } from 'react'
import {
  View,
  ScrollView
} from 'react-native'

import styles from '../styles/index'
import cycleModule from '../lib/cycle'
import {getCycleLengthStats as getCycleInfo} from '../lib/cycle-length'
import {stats as labels} from '../i18n/en/labels'
import AppText from './common/app-text'
import Segment from './common/segment'

export default class Stats extends Component {
  render() {
    const cycleLengths = cycleModule().getAllCycleLengths()
    const atLeastOneCycle = cycleLengths.length >= 1
    let numberOfCycles
    let cycleInfo
    if (atLeastOneCycle) {
      numberOfCycles = cycleLengths.length
      if (numberOfCycles > 1) {
        cycleInfo = getCycleInfo(cycleLengths)
      }
    }
    return (
      <ScrollView>
        <Segment
          style={styles.framedSegmentLast}
          title={labels.cycleLengthTitle}
        >
          <AppText style={styles.paragraph}>
            {labels.cycleLengthExplainer}
          </AppText>

          {!atLeastOneCycle &&
            <AppText>{labels.emptyStats}</AppText>
          }
          {atLeastOneCycle && numberOfCycles === 1 &&
            <View style={[styles.statsRow, styles.paragraph]}>
              <AppText>{labels.oneCycleStats}</AppText>
              <AppText style={styles.emphasis}> {cycleLengths[0]} </AppText>
              <AppText>{labels.daysLabel}.</AppText>
            </View>
          }
          {atLeastOneCycle && numberOfCycles > 1 && <View>
            <View style={styles.paragraph}>
              <AppText style={styles.emphasis}>
                {labels.averageLabel}: {cycleInfo.mean} {labels.daysLabel}
              </AppText>
            </View>
            <View>
              <AppText>
                {labels.minLabel}: {cycleInfo.minimum} {labels.daysLabel}
              </AppText>
            </View>
            <View>
              <AppText>
                {labels.maxLabel}: {cycleInfo.maximum} {labels.daysLabel}
              </AppText>
            </View>
            <View style={styles.paragraph}>
              <AppText>
                {labels.stdLabel}: {cycleInfo.stdDeviation} {labels.daysLabel}
              </AppText>
            </View>
            <View style={styles.statsRow}>
              <AppText>{labels.basisOfStatsBeginning}</AppText>
              <AppText style={styles.emphasis}> {numberOfCycles} </AppText>
              <AppText>{labels.basisOfStatsEnd}</AppText>
            </View>
          </View>}
        </Segment>
      </ScrollView>
    )
  }
}
