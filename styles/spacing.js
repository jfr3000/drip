import { moderateScale } from 'react-native-size-matters'

import { fontRatio } from '../config'

export default {
  tiny: moderateScale(4 / fontRatio),
  small: moderateScale(10 / fontRatio),
  base: moderateScale(16 / fontRatio),
  large: moderateScale(20 / fontRatio),
  symptomTileWidth: '48%',
  textWidth: '70%'
}
