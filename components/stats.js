import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView
} from 'react-native'
import { LocalDate } from 'js-joda'
import styles from '../styles/index'
import cycleModule from '../lib/cycle'
import getPeriodInfo from '../lib/period-length'

export default class Stats extends Component {
  constructor(props) {
    super(props)
    const lastMensStart = cycleModule().getLastMensesStart(
      LocalDate.now().toString()
    )
    const completedCycles = cycleModule().getCyclesBefore(lastMensStart)
    this.numberOfCycles = completedCycles.length
    // TODO get first days, compare with joda
    const periodLengths = completedCycles.map(cycle => {
      return cycle.length
    })
    // until this point
    this.periodInfo = getPeriodInfo(periodLengths)

  }

  render() {
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