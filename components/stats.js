import React, { Component } from 'react'
import {
  View,
  ScrollView
} from 'react-native'

import styles from '../styles/index'
import cycleModule from '../lib/cycle'
import {getCycleLengthStats as getCycleInfo} from '../lib/cycle-length'
import {stats as labels} from '../i18n/en/labels'
import AppText from './app-text'
import { getCycleStartsSortedByDate } from '../db'

export default class Stats extends Component {
  render() {
    const allMensesStarts = getCycleStartsSortedByDate()
    const atLeastOneCycle = allMensesStarts.length > 1
    let cycleLengths
    let numberOfCycles
    let cycleInfo
    if (atLeastOneCycle) {
      cycleLengths = cycleModule().getAllCycleLengths()
      numberOfCycles = cycleLengths.length
      if (numberOfCycles > 1) {
        cycleInfo = getCycleInfo(cycleLengths)
      }
    }
    return (
      <ScrollView>
        <View style={[styles.textWrappingView]}>
          <AppText style={styles.title}>{labels.cycleLengthTitle}</AppText>
          <AppText style={styles.paragraph}>{labels.cycleLengthExplainer}</AppText>
          {!atLeastOneCycle &&
            <AppText>{labels.emptyStats}</AppText>
          }
          {atLeastOneCycle && numberOfCycles === 1 &&
            <AppText>
              {labels.oneCycleStats}
              <AppText style={styles.emphasis}> {cycleLengths[0]} </AppText>
              {labels.daysLabel + '.'}
            </AppText>
          }
          {atLeastOneCycle && numberOfCycles > 1 && <View>
            <View style={styles.statsRow}>
              <AppText style={[styles.statsLabelLeft, styles.emphasis]}>{labels.averageLabel}</AppText>
              <AppText style={[styles.statsLabelRight, styles.emphasis]}>{cycleInfo.mean + ' ' + labels.daysLabel}</AppText>
            </View>
            <View style={styles.statsRow}>
              <AppText style={styles.statsLabelLeft}>{labels.minLabel}</AppText>
              <AppText style={styles.statsLabelRight}>{cycleInfo.minimum + ' ' + labels.daysLabel}</AppText>
            </View>
            <View style={styles.statsRow}>
              <AppText style={styles.statsLabelLeft}>{labels.maxLabel}</AppText>
              <AppText style={styles.statsLabelRight}>{cycleInfo.maximum + ' ' + labels.daysLabel}</AppText>
            </View>
            <View style={[styles.statsRow, styles.paragraph]}>
              <AppText style={styles.statsLabelLeft}>{labels.stdLabel}</AppText>
              <AppText style={styles.statsLabelRight}>{cycleInfo.stdDeviation + ' ' + labels.daysLabel}</AppText>
            </View>
            <AppText>
              {labels.basisOfStatsBeginning}
              <AppText style={styles.emphasis}> {numberOfCycles} </AppText>
              {labels.basisOfStatsEnd}
            </AppText>
          </View>}
        </View>
      </ScrollView>
    )
  }
}