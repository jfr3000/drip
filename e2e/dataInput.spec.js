const LocalTime = require("js-joda").LocalTime
const ChronoUnit = require("js-joda").ChronoUnit

const {
  symptomValues,
  reloadApp,
  goToHomePage,
  goBack,
} = require('./helpers')

const minutes = ChronoUnit.MINUTES
let currentTime

const symptoms = Object.keys(symptomValues).map( symptom => {
  return symptom === 'mucus' ? 'cervical mucus' : symptom
})

const navigateToSymptomView = (symptom) => {
  return element(by.text(symptom)).tap()
}

const navigateToCycleDayOverview = () => {
  return element(by.text('add data for today')).tap()
}

const tapExclude = () => {
  return element(by.type('android.widget.CompoundButton')).tap()
}

const enterSymptomData = async (symptom) => {
  const { valuesToSelect, shouldExclude } = symptomValues[symptom]

  for (const value of valuesToSelect) {
    await element(by.text(value)).tap()
  }

  if (shouldExclude) {
    await tapExclude()
  }
}

const formExpectedSymptomSummary = (symptom) => {
  const { valuesToSelect, shouldExclude } = symptomValues[symptom]
  let expectedText, temperature

  switch (symptom) {
  case 'temperature':
    temperature = valuesToSelect[0]
    expectedText = `${temperature} °C - ${currentTime}`
    break
  case 'mucus':
    expectedText = `feeling: ${valuesToSelect[0]}, texture: ${valuesToSelect[1]}\n => S`
    break
  case 'cervix':
    expectedText = `opening: ${valuesToSelect[0]}, firmness: ${valuesToSelect[1]}, position: ${valuesToSelect[2]}`
    break
  case 'note':
    expectedText = valuesToSelect[0]
    break
  default: expectedText = valuesToSelect.join(', ')
  }

  if (shouldExclude) {
    expectedText = `(${expectedText})`
  }

  return expectedText
}

const enterNote = async() => {
  const note = symptomValues['note'].valuesToSelect[0]
  await element(by.id('noteInput')).replaceText(note)
}

const enterTemperature = async() => {
  const temperature = symptomValues['temperature'].valuesToSelect[0]
  currentTime = LocalTime.now().truncatedTo(minutes).toString()
  const note = symptomValues['temperature'].valuesToSelect[1]

  await element(by.id('temperatureInput')).typeText(temperature)
  await element(by.id('timeInput')).tap()
  await element(by.text('OK')).tap()
  await element(by.id('noteInput')).replaceText(note)
  await tapExclude()
}

describe('Symptom Data Input', () => {

  before(async () => {
    await reloadApp()
    await goToHomePage()
    await navigateToCycleDayOverview()
  })

  for (const symptom of symptoms) {
    it(`Should test ${symptom} data input.`, async () => {

      await navigateToSymptomView(symptom)

      let expectedSymptomSummary
      await expect(element(by.id('headerTitle').and(by.text(symptom))))
        .toBeVisible()

      switch (symptom) {
      case 'temperature':
        await enterTemperature()
        expectedSymptomSummary = formExpectedSymptomSummary('temperature')
        console.log(
          'This test a bit flaky. console.log apparently helps to fix it.'
        )

        await goBack()
        await expect(element(by.text(expectedSymptomSummary))).toExist()

        // Testing here additionally the deletion of data
        await navigateToSymptomView(symptom)
        await element(by.id('deleteIcon')).tap()
        await element(by.text('YES, I AM SURE')).tap()
        await expect(element(by.text(expectedSymptomSummary))).toNotExist()

        await navigateToSymptomView(symptom)
        await enterTemperature()

        break
      case 'note':
        await enterNote()
        expectedSymptomSummary = formExpectedSymptomSummary('note')
        break
      case 'cervical mucus':
        await enterSymptomData('mucus')
        expectedSymptomSummary = formExpectedSymptomSummary('mucus')
        break
      default:
        await enterSymptomData(symptom)
        expectedSymptomSummary = formExpectedSymptomSummary(symptom)
      }

      await goBack()

      await expect(element(by.text(expectedSymptomSummary))).toExist()
    })
  }

})