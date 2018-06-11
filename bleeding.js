import React, { Component } from 'react'
import {
  View,
  Button,
  Text,
  Switch
} from 'react-native'
import RadioForm from 'react-native-simple-radio-button'
import styles from './styles'
import { saveBleeding } from './db'
import { formatDateForViewHeader } from './format'
import { bleeding as labels } from './labels'
import getCycleDay from './get-cycle-day'

export default class Bleeding extends Component {
  constructor(props) {
    super(props)
    const cycleDay = props.navigation.state.params.cycleDay
    let bleedingValue = cycleDay.bleeding && cycleDay.bleeding.value
    if (! (typeof bleedingValue === 'number') ){
      bleedingValue = -1
    }
    this.state = {
      cycleDay,
      currentValue: bleedingValue,
      exclude: cycleDay.bleeding ? cycleDay.bleeding.exclude : false
    }
  }

  // TODO display cycle day
  render() {
    const navigate = this.props.navigation.navigate
    const day = this.state.cycleDay
    const bleedingRadioProps = [
      {label: labels[0], value: 0 },
      {label: labels[1], value: 1 },
      {label: labels[2], value: 2 },
      {label: labels[3], value: 3 },
    ]
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{formatDateForViewHeader(day.date)}</Text>
        <Text>Cycle day {getCycleDay()}</Text>
        <Text>Bleeding</Text>
        <RadioForm
          radio_props={bleedingRadioProps}
          initial={this.state.currentValue}
          formHorizontal={true}
          labelHorizontal={false}
          onPress={(itemValue) => {
            this.setState({ currentValue: itemValue })
          }}
        />
        <Text>Exclude</Text>
        <Switch
          onValueChange={(val) => {
            this.setState({ exclude: val })
          }}
          value={this.state.exclude} />
        <Button
          onPress={() => {
            navigate('dayView', { cycleDay: day })
          }}
          title="Cancel">
        </Button>
        <Button
          onPress={() => {
            saveBleeding(day)
            navigate('dayView', { cycleDay: day })
          }}
          title="Delete entry">
        </Button>
        <Button
          onPress={() => {
            saveBleeding(day, {
              value: this.state.currentValue,
              exclude: this.state.exclude
            })
            navigate('dayView', { cycleDay: day })
          }}
          disabled={ this.state.currentValue === -1 }
          title="Save">
        </Button>
      </View>
    )
  }
}