import React, { Component } from 'react'
import {
  View, TouchableOpacity, Text
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { saveSymptom } from '../../../db'
import styles, {iconStyles} from '../../../styles'

export default class ActionButtonFooter extends Component {
  render() {
    const { symptom, cycleDay, saveAction, saveDisabled, navigate} = this.props
    const navigateToOverView = () => navigate('CycleDay', {cycleDay})
    const buttons = [
      {
        title: 'Cancel',
        action: () => navigateToOverView(),
        icon: 'cancel'
      },
      {
        title: 'Delete',
        action: () => {
          saveSymptom(symptom, cycleDay)
          navigateToOverView()
        },
        disabledCondition: !cycleDay[symptom],
        icon: 'delete-outline'
      }, {
        title: 'Save',
        action: () => {
          saveAction()
          navigateToOverView()
        },
        disabledCondition: saveDisabled,
        icon: 'content-save-outline'
      }
    ]

    return (
      <View style={styles.menu}>
        {buttons.map(({ title, action, disabledCondition, icon }, i) => {
          const textStyle = disabledCondition ? styles.menuTextInActive : styles.menuText
          const iconStyle = disabledCondition ?
            Object.assign({}, iconStyles.menuIcon, iconStyles.menuIconInactive) :
            iconStyles.menuIcon

          return (
            <TouchableOpacity
              onPress={action}
              style={styles.menuItem}
              disabled={disabledCondition}
              key={i.toString()}
            >
              <Icon name={icon} {...iconStyle} />
              <Text style={textStyle}>
                {title}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
}