import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

import AppText from '../common/app-text'

import { Typography } from '../../styles'
import { CHART_YAXIS_WIDTH } from '../../config'
import { shared as labels } from '../../i18n/en/labels'

const ChartLegend = ({ height }) => {
  return (
    <View style={[styles.container, { height }]}>
      <AppText style={styles.textBold}>#</AppText>
      <AppText style={styles.text}>{labels.date}</AppText>
    </View>
  )
}

ChartLegend.propTypes = {
  height: PropTypes.number.isRequired,
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: CHART_YAXIS_WIDTH,
  },
  text: {
    ...Typography.label,
  },
  textBold: {
    ...Typography.labelBold,
  },
})

export default ChartLegend
