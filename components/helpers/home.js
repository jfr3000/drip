import { ChronoUnit, LocalDate } from 'js-joda'

import { formatDateForShortText } from './format-date'

import {
  home as labels,
  bleedingPrediction as predictLabels,
} from '../../i18n/en/labels'

function getTimes(prediction) {
  const todayDate = LocalDate.now()
  const predictedBleedingStart = LocalDate.parse(prediction[0][0])
  /* the range of predicted bleeding days can be either 3 or 5 */
  const predictedBleedingEnd =
    LocalDate.parse(prediction[0][prediction[0].length - 1])
  const daysToEnd = todayDate.until(predictedBleedingEnd, ChronoUnit.DAYS)
  return { todayDate, predictedBleedingStart, predictedBleedingEnd, daysToEnd }
}

export function determinePredictionText(bleedingPrediction) {
  if (!bleedingPrediction.length) return predictLabels.noPrediction
  const {
    todayDate,
    predictedBleedingStart,
    predictedBleedingEnd,
    daysToEnd
  } = getTimes(bleedingPrediction)
  if (todayDate.isBefore(predictedBleedingStart)) {
    return predictLabels.predictionInFuture(
      todayDate.until(predictedBleedingStart, ChronoUnit.DAYS),
      todayDate.until(predictedBleedingEnd, ChronoUnit.DAYS)
    )
  }
  if (todayDate.isAfter(predictedBleedingEnd)) {
    return predictLabels.predictionInPast(
      formatDateForShortText(predictedBleedingStart),
      formatDateForShortText(predictedBleedingEnd)
    )
  }
  if (daysToEnd === 0) {
    return predictLabels.predictionStartedNoDaysLeft
  } else if (daysToEnd === 1) {
    return predictLabels.predictionStarted1DayLeft
  } else {
    return predictLabels.predictionStartedXDaysLeft(daysToEnd)
  }
}

export function getBleedingPredictionRange(prediction) {
  if (!prediction.length) return labels.unknown
  const {
    todayDate,
    predictedBleedingStart,
    predictedBleedingEnd,
    daysToEnd
  } = getTimes(prediction)
  if (todayDate.isBefore(predictedBleedingStart)) {
    return `${todayDate.until(predictedBleedingStart, ChronoUnit.DAYS)}-${todayDate.until(predictedBleedingEnd, ChronoUnit.DAYS)}`
  }
  if (todayDate.isAfter(predictedBleedingEnd)) {
    return labels.unknown
  }
  return (daysToEnd === 0 ? '0' : `0 - ${daysToEnd}`)
}

export function getOrdinalSuffix(num) {
  const suffixes = {
    1: 'st',
    2: 'nd',
    3: 'rd',
    default: 'th'
  }

  const numAsString = num.toString()
  const lastNumber = numAsString[numAsString.length - 1]
  return suffixes[lastNumber] || suffixes.default
}