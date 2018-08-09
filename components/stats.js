import React, { Component } from 'react'
import {
  Text,
  ScrollView
} from 'react-native'
import { LocalDate, ChronoUnit } from 'js-joda'
import styles from '../styles/index'
import cycleModule from '../lib/cycle'
import getPeriodInfo from '../lib/period-length'

export default class Stats extends Component {
  constructor(props) {
    super(props)
    const allMensesStarts = cycleModule().getAllMensesStarts()
    this.test = allMensesStarts
    this.state = {
      text: determineStatsText(allMensesStarts)
    }
  }

  render() {
    return (
      <ScrollView>
        <Text style={styles.welcome}>{this.state.text}</Text>
      </ScrollView>
    )
  }
}

function getCycleLength(cycleStartDates) {
  const periodLengths = []
  for (let i = 0; i < cycleStartDates.length - 1; i++) {
    const nextPeriodStart = LocalDate.parse(cycleStartDates[i])
    const periodStart = LocalDate.parse(cycleStartDates[i + 1])
    periodLengths.push(periodStart.until(nextPeriodStart, ChronoUnit.DAYS))
  }
  return periodLengths
}

function determineStatsText(allMensesStarts) {
  const emptyStats = 'At least one completed period is needed to present you with stats here.'
  if (allMensesStarts.length < 2) {
    return emptyStats
  } else {
    const cycleLengths = getCycleLength(allMensesStarts)
    const numberOfCycles = cycleLengths.length
    const periodInfo = getPeriodInfo(cycleLengths)
    if (numberOfCycles === 1) {
      return `You have documented one period of ${cycleLengths[0]} days.`
    } else {
      const statsText = `Stats are based on ${numberOfCycles} completed 
        periods.\n\n
        Average period length: ${periodInfo.mean} days\n\n
        shortest period: ${periodInfo.minimum} days\n
        longest period: ${periodInfo.maximum} days\n
        median length (meaning 50% of periods are of this length or shorter):
         ${periodInfo.median} days\n
        standard deviation: ${periodInfo.stdDeviation}`
      return statsText
    }
  }
}