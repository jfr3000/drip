import Colors from './colors'
import Spacing from './spacing'

const fonts = {
  main: 'Jost-400-Book',
  bold : 'Jost-700-Bold',
}

export const sizes = {
  base: 18,
  subtitle: 22,
  title: 24
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
    fontSize: sizes.base
  },
  pageTitle: {
    alignSelf: 'center',
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: sizes.title,
    marginHorizontal: Spacing.base,
  },
  title: {
    color: Colors.purple,
    marginVertical: Spacing.large
  },
  underline: { textDecorationLine: 'underline' }
}
