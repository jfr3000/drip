const isOnPage = async (page, parentPage) => {
  await expect(
    element(by.id('headerTitle').and(by.text(page)))
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
      element(by.id('headerTitle').and(by.text('bleeding')))
    ).toBeVisible()
    await expect(
      element(by.id('headerSubtitle').and(by.text('today')))
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
})
