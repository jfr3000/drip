const config = {
  chartLength: 350,
  columnWidth: 30,
  temperatureScale: {
    low: 33,
    high: 40
  },
  cycleDaysToShow: 40,
}

const margin = 3
config.columnMiddle = config.columnWidth / 2,
config.dateRowY = config.chartLength - 15 - margin
config.cycleDayNumberRowY = config.chartLength - margin

export default config