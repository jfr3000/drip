import { LocalDate } from 'js-joda'

import { scaleObservable, unitObservable } from '../../local-storage'
import { getCycleDay, getAmountOfCycleDays } from '../../db'

import config from '../../config'

//YAxis helpers

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

export function getTickPositions(columnHeight) {
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

export function getTickList(columnHeight) {

  const units = unitObservable.value
  const scaleMax = scaleObservable.value.max

  return getTickPositions(columnHeight).map((tickPosition, i) => {

    const tick = scaleMax - i * units
    let isBold, label, shouldShowLabel

    if (Number.isInteger(tick)) {
      isBold = true
      label = tick.toString() + '.0'
    } else {
      isBold = false
      label = tick.toString()
    }

    // when temp range <= 3, units === 0.1 we show temp values with step 0.2
    // when temp range > 3, units === 0.5 we show temp values with step 0.5

    if (units === 0.1) {
      // show label with step 0.2
      shouldShowLabel = !(tick * 10 % 2)
    } else {
      // show label with step 0.5
      shouldShowLabel = !(tick * 10 % 5)
    }

    return {
      position: tickPosition,
      label,
      isBold,
      shouldShowLabel,
    }
  })
}

//DayColumn helpers

export function isSymptomDataComplete(symptom, dateString) {
  const cycleDayData = getCycleDay(dateString)
  const symptomData = cycleDayData[symptom]

  const dataCompletenessCheck = {
    'cervix': () => {
      const { opening, firmness } = symptomData
      return (opening !== null) && (firmness !== null)
    },
    'mucus': () => {
      const { feeling, texture } = symptomData
      return (feeling !== null) && (texture !== null)
    },
    'default': () => {
      return true
    }
  }
  return (dataCompletenessCheck[symptom] || dataCompletenessCheck['default'])()
}

function getInfoForNeighborColumns(dateString, columnHeight) {
  const ret = {
    rightY: null,
    rightTemperatureExclude: null,
    leftY: null,
    leftTemperatureExclude: null
  }
  const target = LocalDate.parse(dateString)
  const dayBefore = target.minusDays(1).toString()
  const dayAfter = target.plusDays(1).toString()
  const cycleDayBefore = getCycleDay(dayBefore)
  const cycleDayAfter = getCycleDay(dayAfter)

  if (cycleDayAfter && cycleDayAfter.temperature) {
    ret.rightY = normalizeToScale(cycleDayAfter.temperature.value, columnHeight)
    ret.rightTemperatureExclude = cycleDayAfter.temperature.exclude
  }
  if (cycleDayBefore && cycleDayBefore.temperature) {
    ret.leftY = normalizeToScale(cycleDayBefore.temperature.value, columnHeight)
    ret.leftTemperatureExclude = cycleDayBefore.temperature.exclude
  }

  return ret
}

export function getTemperatureProps(symptomData, columnHeight, dateString) {
  const extractedData = {}
  const { value, exclude } = symptomData
  const neighborTemperatureGraphPoints =
    getInfoForNeighborColumns(dateString, columnHeight)

  for (const key in neighborTemperatureGraphPoints) {
    extractedData[key] = neighborTemperatureGraphPoints[key]
  }
  return Object.assign({
    value,
    y: normalizeToScale(value, columnHeight),
    temperatureExclude: exclude,
  }, extractedData)
}

export const symptomColorMethods = {
  'mucus': (symptomData) => {
    const { feeling, texture } = symptomData
    const colorIndex = feeling + texture
    return colorIndex
  },
  'cervix': (symptomData) => {
    const { opening, firmness } = symptomData
    const isDataComplete = opening !== null && firmness !== null
    const isClosedAndHard =
      isDataComplete &&
      (opening === 0 && firmness === 0)
    const colorIndex = isClosedAndHard ? 0 : 2
    return colorIndex
  },
  'sex': (symptomData) => {
    const { solo, partner } = symptomData
    const colorIndex = (solo !== null && partner !== null) ?
      (solo + 2 * partner - 1) : 0
    return colorIndex
  },
  'bleeding': (symptomData) => {
    const { value } = symptomData
    const colorIndex = value
    return colorIndex
  },
  'desire': (symptomData) => {
    const { value } = symptomData
    const colorIndex = value
    return colorIndex
  },
  'default': () => { //pain, mood, note
    return 0
  }
}

// Chart helpers

export function makeColumnInfo() {
  let amountOfCycleDays = getAmountOfCycleDays()
  // if there's not much data yet, we want to show at least 30 days on the chart
  if (amountOfCycleDays < 30) {
    amountOfCycleDays = 30
  } else {
    // we don't want the chart to end abruptly before the first data day
    amountOfCycleDays += 5
  }
  const localDates = getTodayAndPreviousDays(amountOfCycleDays)
  return localDates.map(localDate => localDate.toString())
}

function getTodayAndPreviousDays(n) {
  const today = LocalDate.now()
  const targetDate = today.minusDays(n)

  function getDaysInRange(currDate, range) {
    if (currDate.isBefore(targetDate)) {
      return range
    } else {
      range.push(currDate)
      const next = currDate.minusDays(1)
      return getDaysInRange(next, range)
    }
  }

  return getDaysInRange(today, [])
}