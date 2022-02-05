import { Platform } from 'react-native'
import { scale } from 'react-native-size-matters'


import { fontRatio } from '../config'

import Colors from './colors'
import Spacing from './spacing'

export const fonts = {
  main: Platform.OS === 'ios' ? 'Jost-Book' : 'Jost-400-Book',
  bold : Platform.OS === 'ios' ? 'Jost-Bold' : 'Jost-700-Bold',
}

export const sizes = {
  tiny: scale(7 / fontRatio),
  footnote: scale(10 / fontRatio),
  small: scale(13 / fontRatio),
  base: scale(18 / fontRatio),
  subtitle: scale(22 / fontRatio),
  title: scale(24 / fontRatio),
  huge: scale(32 / fontRatio),
  icon: scale(40 / fontRatio),
}

const accentText = {
  fontFamily: fonts.bold,
  textAlignVertical: 'center',
  textTransform: 'uppercase'
}

const accentTextBig = {
  ...accentText,
  fontSize: scale(30 / fontRatio),
}

const accentTextGiant = {
  ...accentText,
  fontSize: sizes.icon,
}

const accentTextHuge = {
  ...accentText,
  fontSize: sizes.huge,
}

const accentTextSmall = {
  ...accentText,
  fontSize: sizes.small
}

const title = {
  color: Colors.purple,
  marginVertical: Spacing.large
}

const label = {
  fontSize: sizes.small,
  textTransform: 'uppercase'
}

export default {
  accentOrange: {
    ...accentTextSmall,
    color: Colors.orange
  },
  accentPurpleBig: {
    ...accentTextBig,
    color: Colors.purple
  },
  accentPurpleGiant: {
    ...accentTextGiant,
    color: Colors.purple
  },
  accentPurpleHuge: {
    ...accentTextHuge,
    color: Colors.purple
  },
  mainText: {
    fontFamily: fonts.main,
    fontSize: sizes.base
  },
  label: {
    ...label
  },
  labelBold: {
    color: Colors.greyDark,
    fontWeight: 'bold',
    ...label
  },
  labelLight: {
    color: Colors.grey,
    fontSize: sizes.footnote,
  },
  subtitle: {
    fontSize: sizes.subtitle,
    ...title
  },
  title: {
    alignSelf: 'center',
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: sizes.title,
    marginHorizontal: Spacing.base,
    ...title
  },
  titleWithoutMargin: {
    alignSelf: 'center',
    color: Colors.purple,
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: sizes.title,
  }
}
