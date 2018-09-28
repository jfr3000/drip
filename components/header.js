import React, { Component } from 'react'
import {
  View,
  Text,
  Dimensions
} from 'react-native'
import styles, { iconStyles } from '../styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { formatDateForViewHeader } from '../components/cycle-day/labels/format'


export default class Header extends Component {
  render() {
    const middle = Dimensions.get('window').width / 2
    return (
      this.props.isCycleDayOverView ?
        <View style={[styles.header, styles.headerCycleDay]}>
          <View style={styles.accentCircle} left={middle - styles.accentCircle.width / 2}/>
          <Icon
            name='arrow-left-drop-circle'
            {...iconStyles.navigationArrow}
            onPress={() => this.props.goToCycleDay('before')}
          />
          <View>
            <Text style={styles.dateHeader}>
              {formatDateForViewHeader(this.props.date)}
            </Text>
            {this.props.cycleDayNumber &&
              <Text style={styles.cycleDayNumber} >
                Cycle day {this.props.cycleDayNumber}
              </Text>}
          </View >
          <Icon
            name='arrow-right-drop-circle'
            {...iconStyles.navigationArrow}
            onPress={() => this.props.goToCycleDay('after')}
          />
        </View >
        : this.props.isSymptomView ?
          <View style={[styles.header, styles.headerSymptom]}>
            <View style={styles.accentCircle} left={middle - styles.accentCircle.width / 2}/>
            <Icon
              name='keyboard-backspace'
              {...iconStyles.symptomHeaderIcons}
              onPress={() => this.props.goBack()}

            />
            <View>
              <Text style={styles.dateHeader}>
                {this.props.title}
              </Text>
            </View >
            <Icon
              name='information-outline'
              {...iconStyles.symptomHeaderIcons}
            />
          </View>
          :
          <View style={styles.header}>
            <View style={styles.accentCircle} />
            <Text style={styles.headerText}>
              {this.props.title}
            </Text>
          </View >
    )
  }
}