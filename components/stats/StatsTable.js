import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import AppText from '../common/app-text'

import cycleModule from '../../lib/cycle'
import { Spacing, Typography, Colors } from '../../styles'
import { humanizeDate } from '../helpers/format-date'

const Item = ({ data }) => {
  const { t } = useTranslation(null, { keyPrefix: 'plurals' })

  if (!data) return false

  const { date, cycleLength, bleedingLength } = data

  return (
    <View style={styles.row}>
      <View style={styles.accentCell}>
        <AppText>{humanizeDate(date)}</AppText>
      </View>
      <View style={styles.cell}>
        <AppText>{t('day', { count: cycleLength })}</AppText>
      </View>
      <View style={styles.cell}>
        <AppText>{t('day', { count: bleedingLength })}</AppText>
      </View>
    </View>
  )
}

Item.propTypes = {
  data: PropTypes.object.isRequired,
}

const StatsTable = () => {
  const renderItem = ({ item }) => <Item data={item} />
  const data = cycleModule().getStats()

  if (!data || data.length === 0) return false

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.date}
      ItemSeparatorComponent={ItemDivider}
      ListHeaderComponent={FlatListHeader}
      ListHeaderComponentStyle={styles.headerDivider}
      stickyHeaderIndices={[0]}
      contentContainerStyle={styles.container}
    />
  )
}

const ItemDivider = () => <View style={styles.divider} />

const FlatListHeader = () => (
  <View style={styles.row}>
    <View style={styles.accentCell}>
      <AppText style={styles.header}>{'Cycle Start'}</AppText>
    </View>
    <View style={styles.cell}>
      <AppText style={styles.header}>{'Cycle Length'}</AppText>
    </View>
    <View style={styles.cell}>
      <AppText style={styles.header}>{'Bleeding'}</AppText>
    </View>
  </View>
)

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.grey,
  },
  header: {
    ...Typography.accentOrange,
    paddingVertical: Spacing.small,
  },
  headerDivider: {
    borderBottomColor: Colors.purple,
    borderBottomWidth: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.tiny,
    backgroundColor: Colors.turquoiseLight,
  },
  cell: {
    flex: 2,
    justifyContent: 'center',
  },
  accentCell: {
    flex: 3,
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: Spacing.base,
  },
})

export default StatsTable
