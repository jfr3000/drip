import { scale } from 'react-native-size-matters'

import { fontRatio } from '../config'

export default {
  tiny: scale(4 / fontRatio),
  small: scale(10 / fontRatio),
  base: scale(16 / fontRatio),
  large: scale(20 / fontRatio),
  symptomTileWidth: '48%',
  textWidth: '70%'
}
