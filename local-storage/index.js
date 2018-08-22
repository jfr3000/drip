import { AsyncStorage } from 'react-native'
import Observable from 'obv'
import config from '../config'

export const tempScaleObservable = Observable()
setTempScaleInitially()

async function setTempScaleInitially() {
  const result = await AsyncStorage.getItem('tempScale')
  let value
  if (result) {
    value = JSON.parse(result)
  } else {
    value = {
      min: config.temperatureScale.defaultLow,
      max: config.temperatureScale.defaultHigh
    }
  }
  tempScaleObservable.set(value)
}

export async function saveTempScale(scale) {
  await AsyncStorage.setItem('tempScale', JSON.stringify(scale))
  tempScaleObservable.set(scale)
}

