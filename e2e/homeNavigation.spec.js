const isOnPage = async (page, parentPage) => {
  await expect(
    element(by.id('pageTitle').and(by.text(page)))
  ).toBeVisible()
  await expect(
    element(
      by.id('activeMenuItem').and(by.text(parentPage ? parentPage : page))
    )
  ).toBeVisible()
}

describe('Home Navigation', () => {
  before(async () => {
    await device.launchApp({ newInstance: true })
  })
  beforeEach(async () => {
    await device.reloadReactNative()
  })

  // TODO: clarify how to test that exiting from the app happened
  // https://stackoverflow.com/questions/57133730/how-to-test-an-exit-app-scenario-using-detox
  // it('should exit the app when license agreement declined', async () => {
  //   await expect(element(by.id('licensePage'))).toBeVisible();
  //   await element(by.id('licenseOkCance')).tap();
  // });

  // TODO: figure out how to clean the localStorage between the different specs are running
  // for now disabling the License Agreement test.
  // it('should navigate to home on accepting the license agreement', async () => {
  //   await expect(element(by.id('licensePage'))).toBeVisible()
  //   await element(by.id('licenseOkButton')).tap()
  //   await isOnPage('home')
  // })

  it('should navigate to today bleeding symptom', async () => {
    await element(by.text('track your period')).tap()
    await expect(
      element(by.id('symptomViewTitleName').and(by.text('bleeding')))
    ).toBeVisible()
    await expect(
      element(by.id('symptomViewTitleDate').and(by.text('today')))
    ).toBeVisible()
  })

  it('should navigate to chart to check your fertility', async () => {
    await element(by.text('check your fertility')).tap()
    await isOnPage('chart')
  })

  it('should navigate to settings, its sub pages and back', async () => {
    await element(by.id('menuItemSettings')).tap()
    await isOnPage('settings')
    await element(by.text('reminders')).tap()
    await isOnPage('reminders', 'settings')
    await element(by.id('backButton')).tap()
    await element(by.text('nfp settings')).tap()
    await isOnPage('nfp settings', 'settings')
    await device.pressBack()
  })

  it('should navigate to today cycle day page and all its symptoms', async () => {
    await element(by.text('add data for today')).tap()
    await expect(
      element(by.id('cycleDayTitleDate').and(by.text('today')))
    ).toBeVisible()

    await element(by.id('drip-icon-bleeding')).tap()
    await expect(
      element(by.id('symptomViewTitleName').and(by.text('bleeding')))
    ).toBeVisible()
    await device.pressBack()

    await element(by.id('drip-icon-temperature')).tap()
    await expect(
      element(by.id('symptomViewTitleName').and(by.text('temperature')))
    ).toBeVisible()
    // first back press removes the focus from the field and the input keyboard
    await device.pressBack()
    // second back press goes back to the cycle day view
    await device.pressBack()

    await element(by.id('drip-icon-mucus')).tap()
    await expect(
      element(by.id('symptomViewTitleName').and(by.text('cervical mucus')))
    ).toBeVisible()
    await device.pressBack()

    await element(by.id('drip-icon-cervix')).tap()
    await expect(
      element(by.id('symptomViewTitleName').and(by.text('cervix')))
    ).toBeVisible()
    await device.pressBack()

    await element(by.id('drip-icon-desire')).tap()
    await expect(
      element(by.id('symptomViewTitleName').and(by.text('desire')))
    ).toBeVisible()
    await device.pressBack()

    await element(by.id('drip-icon-sex')).tap()
    await expect(
      element(by.id('symptomViewTitleName').and(by.text('sex')))
    ).toBeVisible()
    await device.pressBack()

    await element(by.id('drip-icon-pain')).tap()
    await expect(
      element(by.id('symptomViewTitleName').and(by.text('pain')))
    ).toBeVisible()
    await device.pressBack()

    await element(by.id('drip-icon-mood')).tap()
    await expect(
      element(by.id('symptomViewTitleName').and(by.text('mood')))
    ).toBeVisible()
    await device.pressBack()

    await element(by.id('drip-icon-note')).tap()
    await expect(
      element(by.id('symptomViewTitleName').and(by.text('note')))
    ).toBeVisible()
    await element(by.id('symptomInfoButton')).tap()
    await expect(element(by.id('symptomInfoPopup'))).toBeVisible()

    // first back press removes the focus from the field and the input keyboard
    await device.pressBack()
    // second back press goes back to the cycle day view
    await device.pressBack()

    await expect(
      element(by.id('cycleDayTitleDate').and(by.text('today')))
    ).toBeVisible()

    // waiting for a feedback on what should happen on pressing back

  })
})
