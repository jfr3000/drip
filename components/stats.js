import React, { Component } from 'react'
import {
  View,
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

    const cycleLengths = getCycleLength(allMensesStarts)
    this.bla = cycleLengths
    this.numberOfCycles = cycleLengths.length
    this.periodInfo = getPeriodInfo(cycleLengths)

  }

  render() {
    console.log('...............')
    console.log(this.test)
    console.log(this.bla)
    return (
      <ScrollView>
        <Text style={styles.welcome}>based on {this.numberOfCycles} periods:</Text>
        <Text style={styles.welcome}>min: {this.periodInfo.minimum}</Text>
        <Text style={styles.welcome}>mean: {this.periodInfo.mean}</Text>
        <Text style={styles.welcome}>max: {this.periodInfo.maximum}</Text>
        <Text style={styles.welcome}>median: {this.periodInfo.median}</Text>
        <Text style={styles.welcome}>standard deviation: {this.periodInfo.stdDeviation}</Text>
      </ScrollView>
    )
  }
}

function getCycleLength(cycleStartDates) {
  const cycleStartDatesReverse = cycleStartDates.reverse()
  const periodLengths = []
  for (let i = 0; i < cycleStartDates.length - 1; i++) {
    const periodStart = LocalDate.parse(cycleStartDatesReverse[i])
    const periodEnd = LocalDate.parse(cycleStartDatesReverse[i + 1])
    periodLengths.unshift(periodStart.until(periodEnd, ChronoUnit.DAYS))
  }
  return periodLengths.reverse()
}