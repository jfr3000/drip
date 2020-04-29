import Colors from './colors'
import Spacing from './spacing'

export const fonts = {
  main: 'Jost-400-Book',
  bold : 'Jost-700-Bold',
}

export const sizes = {
  tiny: 7,
  small: 14,
  base: 18,
  subtitle: 22,
  title: 24,
  huge: 40
}

const title = {
  color: Colors.purple,
  marginVertical: Spacing.large
}

const accentText = {
  fontFamily: fonts.bold,
  textAlignVertical: 'center',
  textTransform: 'uppercase'
}

const accentTextBig = {
  ...accentText,
  fontSize: 30,
}

const accentTextGiant = {
  ...accentText,
  fontSize: 50,
}

const accentTextHuge = {
  ...accentText,
  fontSize: sizes.huge,
}

const accentTextSmall = {
  ...accentText,
  fontSize: sizes.small
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
  }
}
