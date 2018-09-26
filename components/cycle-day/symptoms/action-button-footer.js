import React, { Component } from 'react'
import {
  View, TouchableOpacity, Text, Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { saveSymptom } from '../../../db'
import styles, {iconStyles} from '../../../styles'
import {sharedDialogs as labels} from '../labels/labels'

export default class ActionButtonFooter extends Component {
  render() {
    const {
      symptom,
      cycleDay,
      saveAction,
      saveDisabled,
      navigate,
      autoShowDayView = true}
      = this.props
    const navigateToOverView = () => navigate('CycleDay', {cycleDay})
    const buttons = [
      {
        title: labels.unset,
        action: () => {
          Alert.alert(
            labels.areYouSureTitle,
            labels.areYouSureToUnset,
            [{
              text: labels.cancel,
              style: 'cancel'
            }, {
              text: labels.reallyUnsetData,
              onPress: () => {
                saveSymptom(symptom, cycleDay)
                navigateToOverView()
              }
            }]
          )
        },
        disabledCondition: !cycleDay[symptom],
        icon: 'delete-outline'
      }, {
        title: labels.save,
        action: () => {
          saveAction()
          if (autoShowDayView) navigateToOverView()
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