import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'

import { Colors } from '../../styles'
import { STATUSBAR_HEIGHT } from '../../config'

const AppStatusBar = () => (
  <View style={styles.statusBar}>
    <SafeAreaView>
      <StatusBar
        backgroundColor={Colors.purple}
        barStyle="light-content"
        translucent
      />
    </SafeAreaView>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    backgroundColor: Colors.purple,
    height: STATUSBAR_HEIGHT,
  }
})

export default AppStatusBar
