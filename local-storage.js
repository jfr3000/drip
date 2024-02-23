import AsyncStorage from '@react-native-async-storage/async-storage'
import Observable from 'obv'
import { TEMP_SCALE_MIN, TEMP_SCALE_MAX, TEMP_SCALE_UNITS } from './config'

export const scaleObservable = Observable()
setObvWithInitValue('tempScale', scaleObservable, {
  min: TEMP_SCALE_MIN,
  max: TEMP_SCALE_MAX,
})

export const unitObservable = Observable()
unitObservable.set(TEMP_SCALE_UNITS)
scaleObservable((scale) => {
  const scaleRange = scale.max - scale.min
  if (scaleRange <= 1.5) {
    unitObservable.set(0.1)
  } else {
    unitObservable.set(0.5)
  }
})

export async function saveTempScale(scale) {
  await AsyncStorage.setItem('tempScale', JSON.stringify(scale))
  scaleObservable.set(scale)
}

export const tempReminderObservable = Observable()
setObvWithInitValue('tempReminder', tempReminderObservable, {
  enabled: false,
})

export async function saveTempReminder(reminder) {
  await AsyncStorage.setItem('tempReminder', JSON.stringify(reminder))
  tempReminderObservable.set(reminder)
}

export const periodReminderObservable = Observable()
setObvWithInitValue('periodReminder', periodReminderObservable, {
  enabled: false,
})

export async function savePeriodReminder(reminder) {
  await AsyncStorage.setItem('periodReminder', JSON.stringify(reminder))
  periodReminderObservable.set(reminder)
}

export const periodPredictionObservable = Observable()
setObvWithInitValue('periodPrediction', periodPredictionObservable, true)

export async function savePeriodPrediction(bool) {
  await AsyncStorage.setItem('periodPrediction', JSON.stringify(bool))
  periodPredictionObservable.set(bool)

  if (!periodPredictionObservable.value) {
    const result = await AsyncStorage.getItem('periodReminder')
    if (JSON.parse(result).enabled) {
      periodReminderObservable.set(false)
    }
  }
}

export const useCervixAsSecondarySymptomObservable = Observable()
setObvWithInitValue(
  'useCervixAsSecondarySymptom',
  useCervixAsSecondarySymptomObservable,
  0
)

export async function saveUseCervixAsSecondarySymptom(value) {
  await AsyncStorage.setItem(
    'useCervixAsSecondarySymptom',
    JSON.stringify(value)
  )
  useCervixAsSecondarySymptomObservable.set(value)
}

export const hasEncryptionObservable = Observable()
setObvWithInitValue('hasEncryption', hasEncryptionObservable, false)

export async function saveEncryptionFlag(bool) {
  await AsyncStorage.setItem('hasEncryption', JSON.stringify(bool))
  hasEncryptionObservable.set(bool)
}

export async function getLicenseFlag() {
  return AsyncStorage.getItem('agreedToLicense')
}

export async function saveLicenseFlag() {
  await AsyncStorage.setItem('agreedToLicense', JSON.stringify(true))
}

export async function getChartFlag() {
  const isFirstChartView = await AsyncStorage.getItem('isFirstChartView')
  return isFirstChartView === null ? 'true' : isFirstChartView
}

export async function setChartFlag() {
  await AsyncStorage.setItem('isFirstChartView', JSON.stringify(false))
}

export const temperatureTrackingCategoryObservable = Observable()
setObvWithInitValue('temperature', temperatureTrackingCategoryObservable, true)

export async function saveTemperatureTrackingCategory(bool) {
  await AsyncStorage.setItem('temperature', JSON.stringify(bool))
  temperatureTrackingCategoryObservable.set(bool)

  if (!temperatureTrackingCategoryObservable.value) {
    // if temperature tracking is turned off, the fertility tracking gets disabled
    const fertilityTrackingResult = await AsyncStorage.getItem('fertilityTracking')    
    if (fertilityTrackingResult) {
      saveFertilityTrackingEnabled(false)
    }

    // if temperature tracking is turned off, the temperature reminder gets disabled
    const tempReminderResult = await AsyncStorage.getItem('tempReminder')
     if (tempReminderResult && JSON.parse(tempReminderResult).enabled) {
      tempReminderObservable.set(false)
    }
  }
}

export const mucusTrackingCategoryObservable = Observable()
setObvWithInitValue('mucus', mucusTrackingCategoryObservable, true)

export async function saveMucusTrackingCategory(bool) {
  await AsyncStorage.setItem('mucus', JSON.stringify(bool))
  mucusTrackingCategoryObservable.set(bool)

  // if mucus and cervix tracking is turned off, the fertility tracking gets disabled
  if (!mucusTrackingCategoryObservable.value && !cervixTrackingCategoryObservable.value) {
    const fertilityTrackingResult = await AsyncStorage.getItem('fertilityTracking')    
    if (fertilityTrackingResult) {
      saveFertilityTrackingEnabled(false)
    }
  }
}

export const cervixTrackingCategoryObservable = Observable()
setObvWithInitValue('cervix', cervixTrackingCategoryObservable, true)

export async function saveCervixTrackingCategory(bool) {
  await AsyncStorage.setItem('cervix', JSON.stringify(bool))
  cervixTrackingCategoryObservable.set(bool)

  // if cervix and mucus tracking is turned off, the fertility tracking gets disabled
  if (!cervixTrackingCategoryObservable.value && !mucusTrackingCategoryObservable.value) {
    const fertilityTrackingResult = await AsyncStorage.getItem('fertilityTracking')    
    if (fertilityTrackingResult) {
      saveFertilityTrackingEnabled(false)
    }
  }
}

export const sexTrackingCategoryObservable = Observable()
setObvWithInitValue('sex', sexTrackingCategoryObservable, true)

export async function saveSexTrackingCategory(bool) {
  await AsyncStorage.setItem('sex', JSON.stringify(bool))
  sexTrackingCategoryObservable.set(bool)
}

export const desireTrackingCategoryObservable = Observable()
setObvWithInitValue('desire', desireTrackingCategoryObservable, true)

export async function saveDesireTrackingCategory(bool) {
  await AsyncStorage.setItem('desire', JSON.stringify(bool))
  desireTrackingCategoryObservable.set(bool)
}

export const painTrackingCategoryObservable = Observable()
setObvWithInitValue('pain', painTrackingCategoryObservable, true)

export async function savePainTrackingCategory(bool) {
  await AsyncStorage.setItem('pain', JSON.stringify(bool))
  painTrackingCategoryObservable.set(bool)
}

export const moodTrackingCategoryObservable = Observable()
setObvWithInitValue('mood', moodTrackingCategoryObservable, true)

export async function saveMoodTrackingCategory(bool) {
  await AsyncStorage.setItem('mood', JSON.stringify(bool))
  moodTrackingCategoryObservable.set(bool)
}

export const noteTrackingCategoryObservable = Observable()
setObvWithInitValue('note', noteTrackingCategoryObservable, true)

export async function saveNoteTrackingCategory(bool) {
  await AsyncStorage.setItem('note', JSON.stringify(bool))
  noteTrackingCategoryObservable.set(bool)
}

export const fertilityTrackingObservable = Observable()
setObvWithInitValue('fertilityTracking', fertilityTrackingObservable, true)

export async function saveFertilityTrackingEnabled(bool) {
  await AsyncStorage.setItem('fertilityTracking', JSON.stringify(bool))
  fertilityTrackingObservable.set(bool)
}

async function setObvWithInitValue(key, obv, defaultValue) {
  const result = await AsyncStorage.getItem(key)
  let value
  if (result) {
    value = JSON.parse(result)
  } else {
    value = defaultValue
  }
  obv.set(value)
}
