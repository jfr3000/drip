import React, { Component } from 'react'
import {
  View,
  Button,
} from 'react-native'
import { saveSymptom } from '../../../db'
import styles from '../../../styles'

export default class ActionButtonFooter extends Component {
  render() {
    const { symptom, cycleDay, saveAction, saveDisabled, navigate} = this.props
    const navigateToOverView = () => navigate('CycleDay', cycleDay)
    const buttons = [
      {
        title: 'Cancel',
        action: () => navigateToOverView()
      },
      {
        title: 'Delete',
        action: () => {
          saveSymptom(symptom, cycleDay)
          navigateToOverView()
        },
        disabledCondition: !cycleDay[symptom]
      }, {
        title: 'Save',
        action: () => {
          saveAction()
          navigateToOverView()
        },
        disabledCondition: saveDisabled
      }
    ]

    return (
      <View style={styles.actionButtonRow}>
        {buttons.map(({ title, action, disabledCondition }, i) => {
          const style = { flex: 1, marginHorizontal: 10 }
          if (i === 0) style.marginLeft = 0
          if (i === buttons.length - 1) style.marginRight = 0
          return (
            <View style={style} key={i}>
              <Button
                onPress={action}
                disabled={disabledCondition}
                title={title}>
              </Button>
            </View >
          )
        })}
      </View>
    )
  }
}