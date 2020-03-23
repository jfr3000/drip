import Colors from './colors'
import Spacing from './spacing'

export default {
  bottomBorder: {
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: Colors.grey,
    paddingBottom: Spacing.base
  },
  centerItems: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  rowContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}