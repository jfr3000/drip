import { Component } from 'react'
import { BackHandler } from 'react-native'

export default class SymptomView extends Component {
  constructor() {
    super()
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.save.bind(this))
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }
}