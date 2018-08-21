import { AsyncStorage } from 'react-native'
import Observable from 'obv'

export const tempScaleObservable = Observable()
getTempScale()

async function getTempScale() {
  const result = await AsyncStorage.getItem('tempScale')
  if (!result) return result
  tempScaleObservable.set(JSON.parse(result))
}

export async function saveTempScale(scale) {
  await AsyncStorage.setItem('tempScale', JSON.stringify(scale))
  tempScaleObservable.set(scale)
}

