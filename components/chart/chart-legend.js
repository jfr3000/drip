import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

import AppText from '../common/app-text'

import { Sizes, Typography } from '../../styles'
import { CHART_YAXIS_WIDTH } from '../../config'
import { shared as labels } from '../../i18n/en/labels'

const ChartLegend = ({ height }) => {
  return (
    <View style={[styles.container, { height }]}>
      <View style={[styles.singleLabelContainer, { height: height / 2 }]}>
        <AppText style={styles.textBold}>#</AppText>
      </View>
      <View style={[styles.singleLabelContainer, { height: height / 2 }]}>
        <AppText style={styles.text}>{labels.date}</AppText>
      </View>
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
  singleLabelContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    ...Typography.label,
    fontSize: Sizes.footnote,
  },
  textBold: {
    ...Typography.labelBold,
  },
})

export default ChartLegend
