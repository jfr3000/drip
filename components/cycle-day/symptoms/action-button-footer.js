import React, { Component } from 'react'
import {
  View, TouchableOpacity, Text} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styles, {iconStyles} from '../../../styles'
import {sharedDialogs as labels} from '../../../i18n/en/cycle-day'


export default class ActionButtonFooter extends Component {
  render() {
    const {
      currentSymptomValue,
    }
      = this.props
    const buttons = [
      {
        title: labels.delete,
        action: () => {
        },
        disabledCondition: (!currentSymptomValue ||
          (Object.keys(currentSymptomValue).length === 0 && currentSymptomValue.constructor === Object) ||
          (Object.values(currentSymptomValue).every(x => !x) && currentSymptomValue.constructor === Object)
        ),
        icon: 'delete-outline'
      }
    ]
    return (
      <View style={styles.menu}>
        {buttons.map(({ title, action, icon }, i) => {
          const textStyle = [styles.menuText]
          return (
            <TouchableOpacity
              onPress={action}
              style={styles.actionButtonItem}
              key={i.toString()}
            >
              <Icon name={icon} {...iconStyles.menuIcon} />
              <Text style={textStyle}>
                {title.toLowerCase()}
              </Text>
            </TouchableOpacity>

          )
        })}
      </View>
    )
  }
}
