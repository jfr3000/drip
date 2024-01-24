import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

import AppText from '../common/app-text'
import { formatDecimal } from '../helpers/cycle-day'
import { Sizes, Spacing, Typography } from '../../styles'

const StatsOverview = ({ data }) => {
  return data.map((rowContent, i) => <Row key={i} rowContent={rowContent} />)
}

StatsOverview.propTypes = {
  data: PropTypes.array.isRequired,
}

const Row = ({ rowContent }) => {
  const isStandardDeviation = rowContent[1].includes('deviation')
  if (isStandardDeviation && rowContent[0] !== '—') {
    rowContent[0] = formatDecimal(rowContent[0], 1)
  }
  return (
    <View style={styles.row}>
      <Cell content={rowContent[0]} isLeft />
      <Cell content={rowContent[1]} hasAsterisk={isStandardDeviation} />
    </View>
  )
}

Row.propTypes = {
  rowContent: PropTypes.array.isRequired,
}

const Cell = ({ content, isLeft, hasAsterisk }) => {
  const styleContainer = isLeft ? styles.cellLeft : styles.cellRight
  const styleText = isLeft ? styles.accentPurpleBig : styles.accentOrange
  const numberOfLines = isLeft ? 1 : 2
  const ellipsizeMode = isLeft ? 'clip' : 'tail'

  return (
    <View style={styleContainer}>
      <AppText
        numberOfLines={numberOfLines}
        ellipsizeMode={ellipsizeMode}
        style={styleText}
      >
        {content}
        {hasAsterisk && <AppText style={styles.accentOrange}>*</AppText>}
      </AppText>
    </View>
  )
}

Cell.propTypes = {
  content: PropTypes.node.isRequired,
  isLeft: PropTypes.bool,
  hasAsterisk: PropTypes.bool,
}

const styles = StyleSheet.create({
  accentOrange: {
    ...Typography.accentOrange,
    fontSize: Sizes.small,
    margin: Sizes.tiny,
  },
  accentPurpleBig: {
    ...Typography.accentPurpleBig,
    marginRight: Spacing.tiny,
  },
  cellLeft: {
    alignItems: 'flex-end',
    flex: 3,
    justifyContent: 'center',
  },
  cellRight: { flex: 5 },
  row: { flexDirection: 'row' },
})

export default StatsOverview
