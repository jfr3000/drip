import { LocalDate } from 'js-joda'

import { scaleObservable, unitObservable } from '../../local-storage'
import { getCycleStatusForDay } from '../../lib/sympto-adapter'
import { getCycleDay, getAmountOfCycleDays } from '../../db'

//YAxis helpers

export function normalizeToScale(temp, columnHeight) {
  const scale = scaleObservable.value
  const valueRelativeToScale = (scale.max - temp) / (scale.max - scale.min)
  return getAbsoluteValue(valueRelativeToScale, columnHeight)
}

function getAbsoluteValue(relative, columnHeight) {
  return columnHeight * relative
}

function getTickConfig() {
  const unit = unitObservable.value
  //Add 1 tick above the max value to display on chart
  const scaleMax = scaleObservable.value.max + unit
  const scaleMin = scaleObservable.value.min - unit
  const numberOfTicks = Math.round((scaleMax - scaleMin) / unit + 1)

  return { numberOfTicks, scaleMax, scaleMin, unit }
}

export function getTickPositions(columnHeight) {
  const { numberOfTicks } = getTickConfig()
  const tickDistance = 1 / (numberOfTicks - 1)
  const tickPositions = []
  for (let i = 0; i < numberOfTicks; i++) {
    const position = getAbsoluteValue(tickDistance * i, columnHeight)
    tickPositions.push(position)
  }
  return tickPositions
}

export function getTickList(columnHeight) {
  const { numberOfTicks, scaleMax, unit } = getTickConfig()
  const tickHeight = columnHeight / numberOfTicks

  return getTickPositions(columnHeight).map((tickPosition, i) => {

    const tick = scaleMax - i * unit
    const isBold = Number.isInteger(tick) ? true : false
    const label = tick.toFixed(1)
    let shouldShowLabel

    // when temp range <= 2, units === 0.1 we show temp values with step 0.2
    // when temp range > 2, units === 0.5 we show temp values with step 0.5

    if (unit === 0.1) {
      // show label with step 0.2
      shouldShowLabel = !(label * 10 % 2)
    } else {
      // show label with step 0.5
      shouldShowLabel = !(label * 10 % 5)
    }

    // don't show label, if first or last tick
    if ( i === 0 || i === (numberOfTicks - 1) ) {
      shouldShowLabel = false
    }

    return {
      position: tickPosition,
      label,
      isBold,
      shouldShowLabel,
      tickHeight
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

export function nfpLines() {
  const cycle = {
    status: null
  }

  function updateCurrentCycle(dateString) {
    // for the NFP lines, we don't care about potentially extending the
    // preOvu phase, so we don't include all earlier cycles, as that is
    // an expensive db operation at the moment
    cycle.status = getCycleStatusForDay(
      dateString, { excludeEarlierCycles: true }
    )
    if(!cycle.status) {
      cycle.noMoreCycles = true
      return
    }
    if (cycle.status.phases.preOvulatory) {
      cycle.startDate = cycle.status.phases.preOvulatory.start.date
    } else {
      cycle.startDate = cycle.status.phases.periOvulatory.start.date
    }
  }

  function dateIsInPeriOrPostPhase(dateString) {
    return (
      dateString >= cycle.status.phases.periOvulatory.start.date
    )
  }

  function precededByAnotherTempValue(dateString) {
    return (
      // we are only interested in days that have a preceding
      // temp
      Object.keys(cycle.status.phases).some(phaseName => {
        return cycle.status.phases[phaseName].cycleDays.some(day => {
          return day.temperature && day.date < dateString
        })
      })
      // and also a following temp, so we don't draw the line
      // longer than necessary
      &&
      cycle.status.phases.postOvulatory.cycleDays.some(day => {
        return day.temperature && day.date > dateString
      })
    )
  }

  function isInTempMeasuringPhase(temperature, dateString) {
    return (
      temperature || precededByAnotherTempValue(dateString)
    )
  }

  return function(dateString, temperature, columnHeight) {
    const ret = {
      drawLtlAt: null,
      drawFhmLine: false
    }
    if (!cycle.status && !cycle.noMoreCycles) updateCurrentCycle(dateString)
    if (cycle.noMoreCycles) return ret

    if (dateString < cycle.startDate) updateCurrentCycle(dateString)
    if (cycle.noMoreCycles) return ret

    const tempShift = cycle.status.temperatureShift

    if (tempShift) {
      if (tempShift.firstHighMeasurementDay.date === dateString) {
        ret.drawFhmLine = true
      }

      if (
        dateIsInPeriOrPostPhase(dateString) &&
        isInTempMeasuringPhase(temperature, dateString)
      ) {
        ret.drawLtlAt = normalizeToScale(tempShift.ltl, columnHeight)
      }
    }

    return ret
  }
}