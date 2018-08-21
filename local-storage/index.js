import { AsyncStorage } from 'react-native'

export async function getTempScale() {
  const result = await AsyncStorage.getItem('tempScale')
  if (!result) return result
  return JSON.parse(result)
}

export async function saveTempScale(scale) {
  return AsyncStorage.setItem('tempScale', JSON.stringify(scale))
}
