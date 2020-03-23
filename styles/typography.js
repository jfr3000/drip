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

const title = {
  color: Colors.purple,
  marginVertical: Spacing.large
}

export default {
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
