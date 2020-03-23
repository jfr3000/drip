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

export default {
  mainText: {
    fontFamily: fonts.main,
    fontSize: sizes.mainMedium
  },
  underline: { textDecorationLine: 'underline' },
  titleSmall: {
    color: Colors.purple,
    fontSize: sizes.titleSmall,
    marginVertical: Spacing.base
  }
}
