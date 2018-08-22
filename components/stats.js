import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView
} from 'react-native'
import { LocalDate, ChronoUnit } from 'js-joda'
import styles from '../styles/index'
import cycleModule from '../lib/cycle'
import getCycleInfo from '../lib/cycle-length'
import {stats as labels} from './labels'

export default class Stats extends Component {
  render() {
    const allMensesStarts = cycleModule().getAllMensesStarts()
    const atLeastOneCycle = allMensesStarts.length > 1
    let cycleLengths
    let numberOfCycles
    let cycleInfo
    if (atLeastOneCycle) {
      cycleLengths = getCycleLength(allMensesStarts)
      numberOfCycles = cycleLengths.length
      if (numberOfCycles > 1) {
        cycleInfo = getCycleInfo(cycleLengths)
      }
    }
    return (
      <ScrollView>
        <View>
          {!atLeastOneCycle &&
            <Text style={styles.statsIntro}>{labels.emptyStats}</Text>
          }
          {atLeastOneCycle && numberOfCycles === 1 &&
            <Text style={styles.statsIntro}>{labels.oneCycleStats(cycleLengths[0])}</Text>
          }
          {atLeastOneCycle && numberOfCycles > 1 && <View>
            <Text style={styles.statsIntro}>{labels.getBasisOfStats(numberOfCycles)}</Text>
            <View style={styles.statsRow}>
              <Text style={styles.statsLabelLeft}>{labels.averageLabel}</Text>
              <Text style={styles.statsLabelRight}>{cycleInfo.mean + ' ' + labels.daysLabel}</Text>
            </View>
            <View style={styles.statsRow}>
              <Text style={styles.statsLabelLeft}>{labels.minLabel}</Text>
              <Text style={styles.statsLabelRight}>{cycleInfo.minimum + ' ' + labels.daysLabel}</Text>
            </View>
            <View style={styles.statsRow}>
              <Text style={styles.statsLabelLeft}>{labels.maxLabel}</Text>
              <Text style={styles.statsLabelRight}>{cycleInfo.maximum + ' ' + labels.daysLabel}</Text>
            </View>
            <View style={styles.statsRow}>
              <Text style={styles.statsLabelLeft}>{labels.stdLabel}</Text>
              <Text style={styles.statsLabelRight}>{cycleInfo.stdDeviation + ' ' + labels.daysLabel}</Text>
            </View>
          </View>}
        </View>
      </ScrollView>
    )
  }
}

function getCycleLength(cycleStartDates) {
  const cycleLengths = []
  for (let i = 0; i < cycleStartDates.length - 1; i++) {
    const nextCycleStart = LocalDate.parse(cycleStartDates[i])
    const cycleStart = LocalDate.parse(cycleStartDates[i + 1])
    cycleLengths.push(cycleStart.until(nextCycleStart, ChronoUnit.DAYS))
  }
  return cycleLengths
}