import React, { useState } from 'react'
import { ImageBackground, SafeAreaView, ScrollView, View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { useTranslation } from 'react-i18next'

import AppText from '../common/app-text'
import Button from '../common/button'
import Footnote from '../common/Footnote'
import StatsOverview from './StatsOverview'
import PeriodDetailsModal from './PeriodDetailsModal'

import cycleModule from '../../lib/cycle'
import { getCycleLengthStats as getCycleInfo } from '../../lib/cycle-length'

import { Containers, Sizes, Spacing, Typography } from '../../styles'

const image = require('../../assets/cycle-icon.png')

const Stats = () => {
  const [isStatsVisible, setIsStatsVisible] = useState(false)

  const { t } = useTranslation(null, { keyPrefix: 'stats' })

  const cycleLengths = cycleModule().getAllCycleLengths()
  const numberOfCycles = cycleLengths.length
  const cycleData =
    numberOfCycles > 0
      ? getCycleInfo(cycleLengths)
      : { minimum: '—', maximum: '—', stdDeviation: '—' }
  const standardDeviation = cycleData.stdDeviation
    ? cycleData.stdDeviation
    : '—'
  const statsData = [
    [cycleData.minimum, t('overview.min')],
    [cycleData.maximum, t('overview.max')],
    [standardDeviation, t('overview.standardDeviation')],
    [numberOfCycles, t('overview.completedCycles')],
  ]

  return (
    <SafeAreaView style={styles.pageContainer}>
      <ScrollView contentContainerStyle={styles.overviewContainer}>
        <AppText>{t('intro')}</AppText>
        {numberOfCycles === 0 ? (
          <AppText>{t('noData')}</AppText>
        ) : (
          <>
            <View style={styles.container}>
              <View style={styles.columnLeft}>
                <ImageBackground
                  source={image}
                  imageStyle={styles.image}
                  style={styles.imageContainter}
                >
                  <AppText
                    numberOfLines={1}
                    ellipsizeMode="clip"
                    style={styles.accentPurpleGiant}
                  >
                    {cycleData.mean}
                  </AppText>
                  <AppText style={styles.accentPurpleHuge}>
                    {t('overview.days')}
                  </AppText>
                </ImageBackground>
                <AppText style={styles.accentOrange}>
                  {t('overview.average')}
                </AppText>
              </View>
              <View style={styles.columnRight}>
                <StatsOverview data={statsData} />
              </View>
            </View>
            <Button isCTA onPress={() => setIsStatsVisible(true)}>
              {t('showStats')}
            </Button>
            {isStatsVisible && (
              <PeriodDetailsModal onClose={() => setIsStatsVisible(false)} />
            )}
            <Footnote>{t('footnote')}</Footnote>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const column = {
  flexDirection: 'column',
}

const styles = ScaledSheet.create({
  accentOrange: {
    ...Typography.accentOrange,
    fontSize: Sizes.small,
  },
  accentPurpleGiant: {
    ...Typography.accentPurpleGiant,
    marginTop: Spacing.base * -2,
  },
  accentPurpleHuge: {
    ...Typography.accentPurpleHuge,
    marginTop: Spacing.base * -1,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  columnLeft: {
    ...column,
    flex: 3,
  },
  columnRight: {
    ...column,
    flex: 5,
    paddingTop: Spacing.small,
  },
  image: {
    resizeMode: 'contain',
  },
  imageContainter: {
    paddingTop: Spacing.large * 2.5,
    marginBottom: Spacing.large,
  },
  overviewContainer: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
  },
  pageContainer: {
    ...Containers.pageContainer,
  },
})

export default Stats
