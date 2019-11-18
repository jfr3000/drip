import React from 'react'
import { View } from 'react-native'

import AppText from '../app-text'
import DripHomeIcon from '../../assets/drip-home-icons'

import styles from './styles'
import { cycleDayColor } from '../../styles'

import { shared as labels } from '../../i18n/en/labels'

const ChartLegend = () => {
  return (
    <View style={[styles.yAxis, styles.chartLegend]}>
      <DripHomeIcon
        name="circle"
        size={styles.yAxis.width - 7}
        color={cycleDayColor}
      />
      <AppText style={styles.yAxisLabels.dateLabel}>
        {labels.date.toLowerCase()}
      </AppText>
    </View>
  )
}

export default ChartLegend
