import React from 'react'
import {
  View,
  Button,
} from 'react-native'
import { saveSymptom } from '../../db'

const dayView = 'DayView'

export default function (showView) {
  return function ({ symptom, cycleDay, saveAction, saveDisabled}) {
    const buttons = [
      {
        title: 'Cancel',
        action: () => showView(dayView)
      },
      {
        title: 'Delete',
        action: () => {
          saveSymptom(symptom, cycleDay)
          showView(dayView)
        }
      }, {
        title: 'Save',
        action: async () => {
          await saveAction()
          showView(dayView)
        },
        disabledCondition: saveDisabled
      }
    ]

    return buttons.map(({ title, action, disabledCondition }, i) => {
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
    })
  }
}