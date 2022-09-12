import React from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

import { Colors } from '../../styles'

function LoadingMoreView({ end }) {
  return (
    <View style={styles.loadingContainer}>
      {!end && <ActivityIndicator size={'large'} color={Colors.orange} />}
    </View>
  )
}

LoadingMoreView.propTypes = {
  end: PropTypes.bool,
}

const styles = StyleSheet.create({
  loadingContainer: {
    height: '100%',
    backgroundColor: Colors.turquoiseLight,
    justifyContent: 'center',
  },
})

export default LoadingMoreView
