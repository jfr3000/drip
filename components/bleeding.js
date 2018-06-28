import React, { Component } from 'react'
import {
  View,
  Button,
  Text,
  Switch
} from 'react-native'
import RadioForm from 'react-native-simple-radio-button'
import styles from '../styles'
import { saveBleeding } from '../db'
import { bleeding as labels } from '../labels'

export default class Bleeding extends Component {
  constructor(props) {
    super(props)
    this.cycleDay = props.cycleDay
    this.showView = props.showView
    let bleedingValue = this.cycleDay.bleeding && this.cycleDay.bleeding.value
    if (! (typeof bleedingValue === 'number') ){
      bleedingValue = -1
    }
    this.state = {
      currentValue: bleedingValue,
      exclude: this.cycleDay.bleeding ? this.cycleDay.bleeding.exclude : false
    }
  }

  render() {
    const bleedingRadioProps = [
      {label: labels[0], value: 0 },
      {label: labels[1], value: 1 },
      {label: labels[2], value: 2 },
      {label: labels[3], value: 3 },
    ]
    return (
      <View style={ styles.symptomEditView }>
        <View style={ styles.symptomEditSplitSymptomsAndLastRowButtons }>
          <View style={ styles.symptomEditListedSymptomView }>
            <View style={{flex: 1}}>
              <Text style={styles.symptomDayView}>Bleeding</Text>
            </View>
            <View style={{flex: 1}}>
              <RadioForm
                radio_props={bleedingRadioProps}
                initial={this.state.currentValue}
                formHorizontal={true}
                labelHorizontal={false}
                labelStyle={styles.radioButton}
                onPress={(itemValue) => {
                  this.setState({currentValue: itemValue})
                }}
              />
            </View>
          </View>
          <View style={ styles.itemsInRowSeparatedView }>
            <View style={ styles.singleButtonView }>
              <Text style={ styles.symptomDayView }>Exclude</Text>
            </View>
            <View style={ styles.singleButtonView }>
              <Switch
                onValueChange={(val) => {
                  this.setState({exclude: val})
                }}
                value={this.state.exclude}
              />
            </View>
          </View>
        </View>
        <View style={ styles.itemsInRowSeparatedView }>
          <View style={ styles.singleButtonView }>
            <Button
              onPress={() => this.showView('dayView')}
              title="Cancel">
            </Button>
          </View>
          <View style={ styles.singleButtonView }>
            <Button
              onPress={() => {
                saveBleeding(this.cycleDay)
                this.showView('dayView')
              }}
              title="Delete">
            </Button>
          </View>
          <View style={ styles.singleButtonView }>
            <Button
              onPress={() => {
                saveBleeding(this.cycleDay, {
                  value: this.state.currentValue,
                  exclude: this.state.exclude
                })
                this.showView('dayView')
              }}
              disabled={ this.state.currentValue === -1 }
              title="Save">
            </Button>
          </View>
        </View>
      </View>
    )
  }
}