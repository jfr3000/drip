import React, { Component } from 'react'
import {
  View, TouchableOpacity, Text
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styles, {iconStyles} from '../../../styles'

export default class ActionButtonFooter extends Component {
  render() {
    const {
      cycleDay,
      saveAction,
      saveDisabled,
      navigate,
      autoShowDayView = true}
      = this.props
    const navigateToOverView = () => navigate('CycleDay', {cycleDay})
    const saveButton = {
      title: 'Save',
      action: () => {
        saveAction()
        if (autoShowDayView) navigateToOverView()
      },
      disabledCondition: saveDisabled,
      icon: 'content-save-outline'
    }
    const textStyle = saveButton.disabledCondition ? styles.menuTextInActive : styles.menuText
    const iconStyle = saveButton.disabledCondition ?
      Object.assign({}, iconStyles.menuIcon, iconStyles.menuIconInactive) :
      iconStyles.menuIcon

    return (
      <View style={styles.menu}>
        <TouchableOpacity
          onPress={saveButton.action}
          style={styles.menuItem}
          disabled={saveButton.disabledCondition}
          key={'save'}
        >
          <Icon name={saveButton.icon} {...iconStyle} />
          <Text style={textStyle}>
            {saveButton.title}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}