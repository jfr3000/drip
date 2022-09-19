import React from 'react'
import { ImageBackground, View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import AppText from './common/app-text'
import StatsOverview from './common/StatsOverview'
import StatsTable from './common/StatsTable'

import cycleModule from '../lib/cycle'
import { getCycleLengthStats as getCycleInfo } from '../lib/cycle-length'
import { stats as labels } from '../i18n/en/labels'

import { Containers, Sizes, Spacing, Typography } from '../styles'

const image = require('../assets/cycle-icon.png')

const Stats = () => {
  const cycleLengths = cycleModule().getAllCycleLengths()
  const numberOfCycles = cycleLengths.length
  const hasAtLeastOneCycle = numberOfCycles >= 1
  const cycleData = hasAtLeastOneCycle
    ? getCycleInfo(cycleLengths)
    : { minimum: '—', maximum: '—', stdDeviation: '—' }
  const statsData = [
    [cycleData.minimum, labels.minLabel],
    [cycleData.maximum, labels.maxLabel],
    [cycleData.stdDeviation ? cycleData.stdDeviation : '—', labels.stdLabel],
    [numberOfCycles, labels.basisOfStatsEnd],
  ]

  return (
    <View style={styles.pageContainer}>
      <View style={styles.overviewContainer}>
        <AppText>{labels.cycleLengthExplainer}</AppText>
        {!hasAtLeastOneCycle && <AppText>{labels.emptyStats}</AppText>}
        {hasAtLeastOneCycle && (
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
                  {labels.daysLabel}
                </AppText>
              </ImageBackground>
              <AppText style={styles.accentOrange}>
                {labels.averageLabel}
              </AppText>
            </View>
            <View style={styles.columnRight}>
              <StatsOverview data={statsData} />
            </View>
          </View>
        )}
      </View>
      <StatsTable />
    </View>
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
