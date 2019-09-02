const symptomValues = {
  bleeding: {
    valuesToSelect: ['spotting'],
    shouldExclude: true,
  },
  temperature: {
    valuesToSelect: ['36.63', 'This is test text'],
    shouldExclude: true,
  },
  mucus: {
    valuesToSelect: ['dry', 'creamy'],
    shouldExclude: true,
  },
  cervix: {
    valuesToSelect: ['closed', 'hard', 'low'],
    shouldExclude: true,
  },
  desire: {
    valuesToSelect: ['low'],
    shouldExclude: false,
  },
  sex: {
    valuesToSelect: ['solo', 'condom'],
    shouldExclude: false,
  },
  pain: {
    valuesToSelect: ['cramps'],
    shouldExclude: false,
  },
  mood: {
    valuesToSelect: ['happy'],
    shouldExclude: false,
  },
  note: {
    valuesToSelect: ['This is test text'],
    shouldExclude: false,
  }
}

function goBack() {
  return device.pressBack()
}

function reloadApp() {
  return device.reloadReactNative()
}

function goToHomePage() {
  try {
    element(by.id('licenseOkButton')).tap()
  } catch (error) {
    goBack()
    element(by.text('home')).tap()
  }
}

module.exports = {
  symptomValues,
  reloadApp,
  goToHomePage,
  goBack,
}