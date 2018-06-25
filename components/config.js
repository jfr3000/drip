const config = {
  chartHeight: 350,
  columnWidth: 30,
  temperatureScale: {
    low: 33,
    high: 40
  },
  cycleDaysToShow: 40,
}

const margin = 3
config.columnMiddle = config.columnWidth / 2,
config.dateRowY = config.chartHeight - 15 - margin
config.cycleDayNumberRowY = config.chartHeight - margin

export default config