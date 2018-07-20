import React, { Component } from 'react'
import {
  View,
  Button,
  Text,
  Switch
} from 'react-native'
import RadioForm from 'react-native-simple-radio-button'
import { saveCervix } from '../db'
import styles from '../styles/index'
import {
  cervixPosition as positionLabels,
  cervixConsistency as consistencyLabels
} from '../labels/labels'
import computeSensiplanValue from '../lib/sensiplan-cervix'

export default class Cervix extends Component {
  constructor(props) {
    super(props)
    this.cycleDay = props.cycleDay
    this.showView = props.showView

    let currentPositionValue = this.cycleDay.cervix && this.cycleDay.cervix.position
    if (typeof currentPositionValue !== 'number') {
      currentPositionValue = -1
    }
    let currentConsistencyValue = this.cycleDay.cervix && this.cycleDay.cervix.consistency
    if (typeof currentConsistencyValue !== 'number') {
      currentConsistencyValue = -1
    }

    this.state = {
      currentPositionValue,
      currentConsistencyValue,
      computeSensiplanValue,
      exclude: this.cycleDay.cervix ? this.cycleDay.cervix.exclude : false
    }

  }

  render() {
    const cervixPositionRadioProps = [
      {label: positionLabels[0], value: 0 },
      {label: positionLabels[1], value: 1 },
      {label: positionLabels[2], value: 2 }
    ]
    const cervixConsistencyRadioProps = [
      {label: consistencyLabels[0], value: 0 },
      {label: consistencyLabels[1], value: 1 }
    ]
    return(
      <View style={ styles.symptomEditView }>
        <View style={ styles.symptomEditSplitSymptomsAndLastRowButtons }>
          <View style={ styles.symptomEditListedSymptomView }>

            <View style={{flex: 1}}>
              <Text style={styles.symptomDayView}>Cervix</Text>
            </View>

            <View style={{flex: 1}}>
              <Text style={styles.symptomDayView}>Position</Text>
            </View>

            <View style={{flex: 1}}>
              <RadioForm
                radio_props={cervixPositionRadioProps}
                initial={this.state.currentPositionValue}
                formHorizontal={true}
                labelHorizontal={false}
                labelStyle={styles.radioButton}
                onPress={(itemValue) => {
                  this.setState({currentPositionValue: itemValue})
                }}
              />
            </View>

            <View style={{flex: 1}}>
              <Text style={styles.symptomDayView}>Consistency</Text>
            </View>

            <View style={{flex: 1}}>
              <RadioForm
                radio_props={cervixConsistencyRadioProps}
                initial={this.state.currentConsistencyValue}
                formHorizontal={true}
                labelHorizontal={false}
                labelStyle={styles.radioButton}
                onPress={(itemValue) => {
                  this.setState({currentConsistencyValue: itemValue})
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
                saveCervix(this.cycleDay)
                this.showView('dayView')
              }}
              title="Delete">
            </Button>
          </View>

          <View style={ styles.singleButtonView }>
            <Button
              onPress={() => {
                saveCervix(this.cycleDay, {
                  position: this.state.currentPositionValue,
                  consistency: this.state.currentConsistencyValue,
                  computedNfp: computeSensiplanValue(this.state.currentPositionValue, this.state.currentConsistencyValue),
                  exclude: this.state.exclude
                })
                this.showView('dayView')
              }}
              disabled={ this.state.currentPositionValue === -1 || this.state.currentConsistencyValue === -1 }
              title="Save">
            </Button>
          </View>

        </View>

      </View>
    )
  }
}
