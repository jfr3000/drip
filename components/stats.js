import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView
} from 'react-native'
import { LocalDate, ChronoUnit } from 'js-joda'
import Header from './header'
import styles from '../styles/index'
import cycleModule from '../lib/cycle'
import getCycleInfo from '../lib/cycle-length'

export default class Stats extends Component {
  render() {
    const allMensesStarts = cycleModule().getAllMensesStarts()
    const statsText = determineStatsText(allMensesStarts)
    return (
      <ScrollView>
        <View>
          <Text style={styles.stats}>{statsText}</Text>
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

function determineStatsText(allMensesStarts) {
  const emptyStats = 'At least one completed cycle is needed to present you with stats here.'
  if (allMensesStarts.length < 2) {
    return emptyStats
  } else {
    const cycleLengths = getCycleLength(allMensesStarts)
    const numberOfCycles = cycleLengths.length
    if (numberOfCycles === 1) {
      return `You have documented one cycle of ${cycleLengths[0]} days.`
    }
    const cycleInfo = getCycleInfo(cycleLengths)
    const statsText = `Stats are based on ${numberOfCycles} completed cycles.\n\n\
    Average cycle length: ${cycleInfo.mean} days\n\nShortest cycle: ${cycleInfo.minimum} days\nLongest cycle: ${cycleInfo.maximum} days\nMedian length (meaning 50% of cycles are of this length or shorter): ${cycleInfo.median} days\nStandard deviation: ${cycleInfo.stdDeviation}`
    return statsText
  }
}