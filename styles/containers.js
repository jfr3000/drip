import Colors from './colors'
import Spacing from './spacing'

export default {
  bottomBorder: {
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: Colors.greyLight,
    paddingBottom: Spacing.base
  },
  centerItems: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  greyBorder: {
    borderColor: Colors.greyLight,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  marginBottom: { marginBottom: Spacing.base },
  orangeButton: {
    backgroundColor: Colors.orange,
    borderRadius: 25
  },
  page: {
    backgroundColor: Colors.greenSuperLight,
    flex: 1
  },
  segmentContainer: { marginHorizontal: Spacing.base }
}