import Colors from './colors'
import Spacing from './spacing'

export const fonts = {
  main: 'Jost-400-Book',
  bold : 'Jost-700-Bold',
}

export const sizes = {
  base: 18,
  subtitle: 22,
  title: 24
}

export default {
  mainText: {
    fontFamily: fonts.main,
    fontSize: sizes.base
  },
  title: {
    color: Colors.purple,
    marginVertical: Spacing.large
  }
}
