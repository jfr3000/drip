import { Platform } from 'react-native'
import { scale } from 'react-native-size-matters'

import Colors from './colors'
import Spacing from './spacing'

export const fonts = {
  main: Platform.OS === 'ios' ? 'Jost-Book' : 'Jost-400-Book',
  bold : Platform.OS === 'ios' ? 'Jost-Bold' : 'Jost-700-Bold',
}

export const sizes = {
  tiny: scale(7),
  footnote: scale(10),
  small: scale(13),
  base: scale(16),
  subtitle: scale(22),
  title: scale(24),
  huge: scale(32),
  icon: scale(40),
}

const accentText = {
  fontFamily: fonts.bold,
  textAlignVertical: 'center',
  textTransform: 'uppercase'
}

const accentTextBig = {
  ...accentText,
  fontSize: scale(30),
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
