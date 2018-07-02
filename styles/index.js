import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    margin: 30,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  dateHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  cycleDayNumber: {
    fontSize: 18,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  symptomDayView: {
    fontSize: 20,
    margin: 30,
    textAlign: 'left',
    textAlignVertical: 'center'
  },
  radioButton: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  singleButtonView: {
    flex: 1,
    margin: 5
  },
  itemsInRowView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  itemsInRowSeparatedView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  symptomEditView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  symptomEditSplitSymptomsAndLastRowButtons: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  symptomEditListedSymptomView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  cycleDayOuterView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  cycleDayDateView: {
    justifyContent: 'center',
    backgroundColor: 'steelblue'
  },
  cycleDayNumberView: {
    justifyContent: 'center',
    backgroundColor: 'skyblue',
    padding: 10
  },
  cycleDaySymptomsView: {
    flex: 8,
    justifyContent: 'center'
  },
  homeContainerView: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  homeButtonsView: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: 5
  }
})