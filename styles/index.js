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
    margin: 15,
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
    textAlignVertical: 'center'
  },
  radioButton: {
    fontSize: 18,
    margin: 8,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  symptomEditView: {
    justifyContent: 'space-between',
    marginHorizontal: 15
  },
  symptomEditRow: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  symptomViewRowInline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
    height: 50
  },
  cycleDayDateView: {
    justifyContent: 'center',
    backgroundColor: 'steelblue'
  },
  cycleDayNumberView: {
    justifyContent: 'center',
    backgroundColor: 'skyblue',
    marginBottom: 15,
    paddingVertical: 15
  },
  homeButtons: {
    marginHorizontal: 15
  },
  homeButton: {
    marginBottom: 15
  },
  temperatureTextInput: {
    fontSize: 20,
    color: 'black'
  },
  temperatureTextInputSuggestion: {
    color: '#939393'
  },
  actionButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 50
  },
  symptomEditButton: {
    width: 130
  },
  radioButtonRow: {
    marginTop: 15,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  stats: {
    fontSize: 18,
    margin: 30,
    textAlign: 'left',
    textAlignVertical: 'center'
  },
  settingsSegment: {
    backgroundColor: 'lightgrey',
    padding: 10,
    marginTop: 10,
  },
  settingsSegmentTitle: {
    fontWeight: 'bold'
  },
  settingsButton: {
    backgroundColor: '#351c4d',
    padding: 10,
    alignItems: 'center',
    margin: 10
  },
  settingsButtonText: {
    color: 'white'
  },
  warning: {
    color: 'red'
  }
})