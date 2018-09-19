const config = {
  columnWidth: 25,
  xAxisHeightPercentage: 0.08,
  symptomHeightPercentage: 0.05,
  temperatureScale: {
    defaultLow: 35,
    defaultHigh: 38,
    min: 34,
    max: 40,
    units: 0.1,
    verticalPadding: 0.03
  }
}

config.columnMiddle = config.columnWidth / 2

export default config