import Colors from './colors'
import Spacing from './spacing'

const fonts = {
  main: 'Jost-400-Book',
  bold : 'Jost-700-Bold',
}

const sizes = {
  mainMedium: 18,
  mainLarge: 20,
  titleSmall: 22,
  titleMedium: 24,
  titleLarge: 28
}

const button = {
  paddingHorizontal: Spacing.large,
  paddingVertical: Spacing.base,
  textTransform: 'uppercase'
}

export default {
  buttonTextBold: {
    fontFamily: fonts.bold,
    ...button
  },
  buttonTextRegular: {
    fontFamily: fonts.main,
    ...button
  },
  mainText: {
    fontFamily: fonts.main,
    fontSize: sizes.mainMedium
  },
  titleSmall: {
    color: Colors.purple,
    fontSize: sizes.titleSmall,
    marginVertical: Spacing.base
  },
  underline: { textDecorationLine: 'underline' }
}
