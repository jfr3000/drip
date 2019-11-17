import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import config from '../../config'
import { scaleObservable, unitObservable } from '../../local-storage'

import AppText from '../app-text'
import DripIcon from '../../assets/drip-icons'
import DripHomeIcon from '../../assets/drip-home-icons'

import styles from './styles'
import { cycleDayColor } from '../../styles'

import { shared as labels } from '../../i18n/en/labels'


const symptomIcons = {
  bleeding: <DripIcon size={16} name='drip-icon-bleeding' color={styles.iconShades.bleeding[3]}/>,
  mucus: <DripIcon size={16} name='drip-icon-mucus' color={styles.iconShades.mucus[4]}/>,
  cervix: <DripIcon size={16} name='drip-icon-cervix' color={styles.iconShades.cervix[3]}/>,
  desire: <DripIcon size={16} name='drip-icon-desire' color={styles.iconShades.desire[2]}/>,
  sex: <DripIcon size={16} name='drip-icon-sex' color={styles.iconShades.sex[2]}/>,
  pain: <DripIcon size={16} name='drip-icon-pain' color={styles.iconShades.pain[0]}/>,
  mood: <DripIcon size={16} name='drip-icon-mood' color={styles.iconShades.mood[0]}/>,
  note: <DripIcon size={16} name='drip-icon-note' color={styles.iconShades.note[0]}/>
}


export function makeYAxisLabels(columnHeight) {
  const units = unitObservable.value
  const scaleMax = scaleObservable.value.max
  const style = styles.yAxisLabels.tempScale

  return getTickPositions(columnHeight).map((y, i) => {
    const tick = scaleMax - i * units
    const tickLabel = tick * 10 % 10 ? tick.toString() : tick.toString() + '.0'
    let showTick
    let tickBold
    if (units === 0.1) {
      showTick =  (tick * 10 % 2) ? false : true
      tickBold = tick * 10 % 5 ? {} : {fontWeight: 'bold', fontSize: 11}
    } else {
      showTick =  (tick * 10 % 5) ? false : true
      tickBold = tick * 10 % 10 ? {} : {fontWeight: 'bold', fontSize: 11}
    }
    // this eyeballing is sadly necessary because RN does not
    // support percentage values for transforms, which we'd need
    // to reliably place the label vertically centered to the grid
    return (
      <AppText
        style={[style, {top: y - 8}, tickBold]}
        key={i}>
        {showTick && tickLabel}
      </AppText>
    )
  })
}

export function makeHorizontalGrid(columnHeight, symptomRowHeight) {
  return getTickPositions(columnHeight).map(tick => {
    return (
      <View
        top={tick + symptomRowHeight}
        {...styles.horizontalGrid}
        key={tick}
      />
    )
  })
}

function getTickPositions(columnHeight) {
  const units = unitObservable.value
  const scaleMin = scaleObservable.value.min
  const scaleMax = scaleObservable.value.max
  const numberOfTicks = (scaleMax - scaleMin) * (1 / units) + 1
  const tickDistance = 1 / (numberOfTicks - 1)
  const tickPositions = []
  for (let i = 0; i < numberOfTicks; i++) {
    const position = getAbsoluteValue(tickDistance * i, columnHeight)
    tickPositions.push(position)
  }
  return tickPositions
}

export function normalizeToScale(temp, columnHeight) {
  const scale = scaleObservable.value
  const valueRelativeToScale = (scale.max - temp) / (scale.max - scale.min)
  return getAbsoluteValue(valueRelativeToScale, columnHeight)
}

function getAbsoluteValue(relative, columnHeight) {
  // we add some height to have some breathing room
  const verticalPadding = columnHeight * config.temperatureScale.verticalPadding
  const scaleHeight = columnHeight - 2 * verticalPadding
  return scaleHeight * relative + verticalPadding
}

const YAxis = ({ height, symptomsToDisplay, symptomsSectionHeight }) => {
  return (
    <View>
      <View style={[styles.yAxis, {height: symptomsSectionHeight}]}>
        {symptomsToDisplay.map(symptomName => {
          return <View
            style={{ alignItems: 'center', justifyContent: 'center' }}
            key={symptomName}
            width={styles.yAxis.width}
            height={symptomsSectionHeight / symptomsToDisplay.length}
          >
            {symptomIcons[symptomName]}
          </View>
        })}
      </View>
      <View style={[styles.yAxis, { height }]}>{makeYAxisLabels(height)}</View>
      <View style={[styles.yAxis, { alignItems: 'center', justifyContent: 'center' }]}>
        <DripHomeIcon
          name="circle"
          size={styles.yAxis.width - 7}
          color={cycleDayColor}
        />
        <AppText style={[styles.yAxisLabels.dateLabel]}>
          {labels.date.toLowerCase()}
        </AppText>
      </View>
    </View>
  )
}

YAxis.propTypes = {
  height: PropTypes.number,
  symptomsToDisplay: PropTypes.array,
  symptomsSectionHeight: PropTypes.number,
}

export default YAxis
