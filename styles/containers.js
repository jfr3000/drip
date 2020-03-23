import Colors from './colors'
import Spacing from './spacing'

export default {
  bottomBorder: {
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: Colors.greySuperLight,
    paddingBottom: Spacing.base
  },
  centerItems: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  marginBottom: { marginBottom: Spacing.base },
  segmentContainer: { marginHorizontal: Spacing.base }
}