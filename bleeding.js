import React, { Component } from 'react'
import {
  View,
  Button,
  Text,
  Picker,
  Switch
} from 'react-native'
import styles from './styles'
import { saveBleeding } from './db'
import { formatDateForViewHeader } from './format'
import { bleeding as labels } from './labels'
import getCycleDay from './get-cycle-day'

export default class Bleeding extends Component {
  constructor(props) {
    super(props)
    const cycleDay = props.navigation.state.params.cycleDay
    this.state = {
      cycleDay,
      currentValue: Number((cycleDay.bleeding && cycleDay.bleeding.value) || 0).toString(),
      exclude: cycleDay.bleeding ? cycleDay.bleeding.exclude : false
    }
  }

  // TODO display cycle day
  render() {
    const navigate = this.props.navigation.navigate
    const day = this.state.cycleDay
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{formatDateForViewHeader(day.date)}</Text>
        <Text>Cycle day {getCycleDay()}</Text>
        <Text>Bleeding</Text>
        <Picker
          selectedValue={this.state.currentValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue) => {
            this.setState({ currentValue: itemValue })
          }}>
          <Picker.Item label={labels[0]} value="0" />
          <Picker.Item label={labels[1]} value="1" />
          <Picker.Item label={labels[2]} value="2" />
          <Picker.Item label={labels[3]} value="3" />
        </Picker>
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
              value: Number(this.state.currentValue),
              exclude: this.state.exclude
            })
            navigate('dayView', { cycleDay: day })
          }}
          title="Save">
        </Button>
      </View>
    )
  }
}