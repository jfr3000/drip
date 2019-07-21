describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });
  it('should navigate to home on accepting the license agreement', async () => {
    await expect(element(by.id('licensePage'))).toBeVisible();
    await element(by.id('licenseOkButton')).tap();
    await expect(
      element(by.id('pageTitle').and(by.text('home')))
    ).toBeVisible();
  });
});
