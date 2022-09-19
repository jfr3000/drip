import Colors from './colors'
import Spacing from './spacing'

export default {
  box: {
    borderColor: Colors.orange,
    borderRadius: 5,
    borderWidth: 1,
    marginTop: Spacing.small,
    marginRight: Spacing.small,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
  },
  boxActive: {
    backgroundColor: Colors.orange,
  },
  centerItems: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  pageContainer: {
    backgroundColor: Colors.turquoiseLight,
    flex: 1,
  },
  rowContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectGroupContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: Spacing.small,
  },
  segmentContainer: {
    marginHorizontal: Spacing.base,
    marginBottom: Spacing.base,
  },
}
