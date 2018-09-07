import React, { Component } from 'react'
import {
  View,
  ScrollView
} from 'react-native'

import styles from '../styles/index'
import cycleModule from '../lib/cycle'
import {getCycleLengthStats as getCycleInfo} from '../lib/cycle-length'
import {stats as labels} from './labels'
import { AppText } from './app-text'

export default class Stats extends Component {
  render() {
    const allMensesStarts = cycleModule().getAllMensesStarts()
    const atLeastOneCycle = allMensesStarts.length > 1
    let cycleLengths
    let numberOfCycles
    let cycleInfo
    if (atLeastOneCycle) {
      cycleLengths = cycleModule().getCycleLength(allMensesStarts)
      numberOfCycles = cycleLengths.length
      if (numberOfCycles > 1) {
        cycleInfo = getCycleInfo(cycleLengths)
      }
    }
    return (
      <ScrollView>
        <View>
          {!atLeastOneCycle &&
            <AppText style={styles.statsIntro}>{labels.emptyStats}</AppText>
          }
          {atLeastOneCycle && numberOfCycles === 1 &&
            <AppText style={styles.statsIntro}>
              {labels.oneCycleStats(cycleLengths[0])}
            </AppText>
          }
          {atLeastOneCycle && numberOfCycles > 1 && <View>
            <AppText style={styles.statsIntro}>
              {labels.getBasisOfStats(numberOfCycles)}
            </AppText>
            <View style={styles.statsRow}>
              <AppText style={styles.statsLabelLeft}>{labels.averageLabel}</AppText>
              <AppText style={styles.statsLabelRight}>{cycleInfo.mean + ' ' + labels.daysLabel}</AppText>
            </View>
            <View style={styles.statsRow}>
              <AppText style={styles.statsLabelLeft}>{labels.minLabel}</AppText>
              <AppText style={styles.statsLabelRight}>{cycleInfo.minimum + ' ' + labels.daysLabel}</AppText>
            </View>
            <View style={styles.statsRow}>
              <AppText style={styles.statsLabelLeft}>{labels.maxLabel}</AppText>
              <AppText style={styles.statsLabelRight}>{cycleInfo.maximum + ' ' + labels.daysLabel}</AppText>
            </View>
            <View style={styles.statsRow}>
              <AppText style={styles.statsLabelLeft}>{labels.stdLabel}</AppText>
              <AppText style={styles.statsLabelRight}>{cycleInfo.stdDeviation + ' ' + labels.daysLabel}</AppText>
            </View>
          </View>}
        </View>
      </ScrollView>
    )
  }
}