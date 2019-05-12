import { Component } from 'react'
import { BackHandler } from 'react-native'
import { saveSymptom } from '../../../db'

export default class SymptomView extends Component {
  constructor(props) {
    super()
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPress.bind(this))
    this.symptomName = props.symptomName
    this.date = props.date
  }

  saveSymptomEntry(entry) {
    saveSymptom(this.symptomName, this.date, entry)
  }

  deleteSymptomEntry() {
    saveSymptom(this.symptomName, this.date)
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }
}