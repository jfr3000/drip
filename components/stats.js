import React from 'react'
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native'

import AppPage from './common/app-page'
import AppText from './common/app-text'
import Segment from './common/segment'
import Table from './common/table'

import cycleModule from '../lib/cycle'
import {getCycleLengthStats as getCycleInfo} from '../lib/cycle-length'
import {stats as labels} from '../i18n/en/labels'

import { Sizes, Spacing, Typography } from '../styles'
import { fontRatio } from '../config'

const image = require('../assets/cycle-icon.png')
const screen = Dimensions.get('screen')

const Stats = () => {
  const cycleLengths = cycleModule().getAllCycleLengths()
  const numberOfCycles = cycleLengths.length
  const hasAtLeastOneCycle = numberOfCycles >= 1
  const cycleData = hasAtLeastOneCycle ? getCycleInfo(cycleLengths)
    : { minimum: '—', maximum: '—', stdDeviation: '—' }
  const statsData = [
    [cycleData.minimum, labels.minLabel],
    [cycleData.maximum, labels.maxLabel],
    [cycleData.stdDeviation ? cycleData.stdDeviation : '—', labels.stdLabel],
    [numberOfCycles, labels.basisOfStatsEnd]
  ]
  const height = screen.height * 0.2
  const marginTop = (height / 8 - Sizes.icon / fontRatio) / 4

  return (
    <AppPage contentContainerStyle={styles.pageContainer}>
      <Segment last style={styles.pageContainer}>
        <AppText>{labels.cycleLengthExplainer}</AppText>
        {!hasAtLeastOneCycle && <AppText>{labels.emptyStats}</AppText>}
        {hasAtLeastOneCycle &&
          <View style={styles.container}>
            <View style={styles.columnLeft}>
              <ImageBackground
                source={image}
                imageStyle={styles.image}
                style={[styles.imageContainter, { height }]}
              >
                <AppText
                  numberOfLines={1}
                  ellipsizeMode="clip"
                  style={[styles.accentPurpleGiant, { marginTop }]}
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
              <Table tableContent={statsData} />
            </View>
          </View>
        }
      </Segment>
    </AppPage>
  )
}

const column = {
  flexDirection: 'column',
}

const styles = StyleSheet.create({
  accentOrange: {
    ...Typography.accentOrange,
    fontSize: Sizes.small,
  },
  accentPurpleGiant: {
    ...Typography.accentPurpleGiant,
  },
  accentPurpleHuge: {
    ...Typography.accentPurpleHuge,
    marginTop: Spacing.base * (-1),
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  columnLeft: {
    ...column,
    flex: 4,
  },
  columnRight: {
    ...column,
    flex: 5,
    paddingTop: Spacing.small,
  },
  image: {
    marginLeft: Spacing.large,
    marginTop: Spacing.large,
    resizeMode: 'contain',

  },
  imageContainter: {
    paddingTop: Spacing.large * 2,
    marginBottom: Spacing.large,
  },
  pageContainer: {
    marginVertical: Spacing.base,
  }
})

export default Stats