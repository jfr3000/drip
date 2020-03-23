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

const title = {
  color: Colors.purple,
  marginHorizontal: Spacing.base,
  marginVertical: Spacing.large
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
  pageTitle: {
    alignSelf: 'center',
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: sizes.titleMedium,
    ...title
  },
  titleSmall: {
    fontSize: sizes.titleSmall,
    ...title
  },
  underline: { textDecorationLine: 'underline' }
}
