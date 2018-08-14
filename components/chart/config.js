const config = {
  chartHeight: 350,
  columnWidth: 25,
  temperatureScale: {
    low: 35,
    high: 38,
    units: 0.1
  }
}

const margin = 3
config.columnMiddle = config.columnWidth / 2,
config.dateRowY = config.chartHeight - 15 - margin
config.cycleDayNumberRowY = config.chartHeight - margin

export default config