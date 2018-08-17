import { StyleSheet } from 'react-native'

export const primaryColor = '#ff7e5f'
export const secondaryColor = '#351c4d'
export const fontOnPrimaryColor = 'white'

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
    fontSize: 18,
    fontWeight: 'bold',
    color: fontOnPrimaryColor,
    textAlign: 'center',
  },
  cycleDayNumber: {
    fontSize: 15,
    color: fontOnPrimaryColor,
    textAlign: 'center',
    marginLeft: 15
  },
  symptomDayView: {
    fontSize: 20,
    textAlignVertical: 'center'
  },
  symptomBoxImage: {
    width: 50,
    height: 50
  },
  radioButton: {
    fontSize: 18,
    margin: 8,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  symptomBoxesView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
  },
  symptomBox: {
    borderColor: secondaryColor,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20%',
    marginHorizontal: 1,
    minWidth: 100,
    minHeight: 100,
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
    backgroundColor: primaryColor,
    paddingVertical: 18,
    paddingHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  navigationArrow: {
    fontSize: 60,
    color: fontOnPrimaryColor
  },
  homeButtons: {
    marginHorizontal: 15
  },
  homeButton: {
    marginBottom: 15
  },
  temperatureTextInput: {
    width: 80,
    textAlign: 'center',
    fontSize: 20
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
  menuLabel: {
    fontSize: 15,
    color: fontOnPrimaryColor
  },
})

export const iconStyles = {
  navigationArrow: {
    size: 45,
    color: fontOnPrimaryColor
  }
}