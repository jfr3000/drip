const LocalDate = require("js-joda").LocalDate
const moment = require('moment')

describe('Date', () => {
  beforeEach(async () => {
    await device.reloadReactNative()
  })

  it('should have same date when navigating between cycle day and symptom view', async () => {
    await element(by.id('licenseOkButton')).tap()

    await element(by.text('add data for today')).tap()
    await expect(
      element(by.id('cycleDayTitleDate').and(by.text('today')))
    ).toBeVisible()
    await element(by.id('previousDateButton')).tap()
    await element(by.id('drip-icon-bleeding')).tap()

    const today = LocalDate.now()
    const yesterday = today.minusDays(1)
    const yesterdayFormatted = moment(
      yesterday.toString()).format('MMMM Do YYYY')
      .toLowerCase()

    await expect(
      element(by.id('symptomViewTitleDate').and(by.text(yesterdayFormatted)))
    ).toBeVisible()
  })

})
