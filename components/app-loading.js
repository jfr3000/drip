import React from 'react'

import { View } from 'react-native'

import AppText from './app-text'
import { shared } from '../i18n/en/labels'

const AppLoadingView = () => {
  return (
    <View flex={1}>
      <View  style={{flex:1, justifyContent: 'center'}}>
        <AppText style={{alignSelf: 'center'}}>{shared.loading}</AppText>
      </View>
    </View>
  )
}

export default AppLoadingView