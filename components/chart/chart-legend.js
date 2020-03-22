import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import AppText from '../common/app-text'
import DripHomeIcon from '../../assets/drip-home-icons'

import styles from './styles'
import { cycleDayColor } from '../../styles'

import { shared as labels } from '../../i18n/en/labels'

const ChartLegend = ({ xAxisHeight }) => {
  return (
    <View style={[styles.yAxis, styles.chartLegend, {height: xAxisHeight}]}>
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

ChartLegend.propTypes = {
  xAxisHeight: PropTypes.number.isRequired
}

export default ChartLegend
