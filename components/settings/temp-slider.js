import React, { Component } from 'react'
import { View } from 'react-native'
import Slider from '@ptomasroos/react-native-multi-slider'
import AppText from '../app-text'
import {
  scaleObservable,
  saveTempScale,
} from '../../local-storage'
import { secondaryColor } from '../../styles/index'
import { settings as labels } from '../labels'
import config from '../../config'
import alertError from './alert-error'

export default class TempSlider extends Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({}, scaleObservable.value)
  }

  onValuesChange = (values) => {
    this.setState({
      min: values[0],
      max: values[1]
    })
  }

  onValuesChangeFinish = (values) => {
    this.setState({
      min: values[0],
      max: values[1]
    })
    try {
      saveTempScale(this.state)
    } catch(err) {
      alertError(labels.tempScale.saveError)
    }
  }

  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <AppText>{`${labels.tempScale.min} ${this.state.min}`}</AppText>
        <AppText>{`${labels.tempScale.max} ${this.state.max}`}</AppText>
        <Slider
          values={[this.state.min, this.state.max]}
          min={config.temperatureScale.min}
          max={config.temperatureScale.max}
          step={0.5}
          onValuesChange={this.onValuesChange}
          onValuesChangeFinish={this.onValuesChangeFinish}
          selectedStyle={{
            backgroundColor: 'darkgrey',
          }}
          unselectedStyle={{
            backgroundColor: 'silver',
          }}
          trackStyle={{
            height: 10,
          }}
          markerStyle={{
            backgroundColor: secondaryColor,
            height: 20,
            width: 20,
            borderRadius: 100,
            marginTop: 10
          }}
        />
      </View>
    )
  }
}