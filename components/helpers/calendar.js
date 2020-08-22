import { LocalDate } from 'js-joda'

import { Colors, Fonts } from '../../styles'

const { shades } = Colors.iconColors.bleeding

export const toCalFormat = (bleedingDaysSortedByDate) => {
  const todayDateString = LocalDate.now().toString()

  return bleedingDaysSortedByDate.reduce((acc, day) => {
    acc[day.date] = {
      customStyles: {
        container: {
          backgroundColor: shades[day.bleeding.value],
        }
      }
    }
    if (day.date === todayDateString) {
      acc[day.date].customStyles.text = styles.calendarToday
    }
    return acc
  }, {})
}

export const predictionToCalFormat = (predictedDays) => {
  if (!predictedDays.length) return {}
  const todayDateString = LocalDate.now().toString()
  const middleIndex = (predictedDays[0].length - 1) / 2
  return predictedDays.reduce((acc, setOfDays) => {
    setOfDays.reduce((accSet, day, i) => {
      accSet[day] = {
        customStyles: {
          container: {
            borderColor: (i === middleIndex) ? shades[3] : shades[0],
            borderStyle: (i === middleIndex) ? 'solid' : 'dashed',
            borderWidth: 1,
          },

        }
      }
      if (day === todayDateString) {
        accSet[day].customStyles.text = styles.calendarToday
      }

      return accSet
    }, acc)
    return acc
  }, {})
}

export const todayToCalFormat = () => {
  const todayDateString = LocalDate.now().toString()
  const todayFormated = {}
  todayFormated[todayDateString] = {
    customStyles: {
      text: styles.calendarToday
    }
  }
  return todayFormated
}

const styles = {
  calendarToday: {
    fontFamily: Fonts.bold,
    color: Colors.purple
  },
}