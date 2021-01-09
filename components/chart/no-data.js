import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

import AppText from '../common/app-text'
import Button from '../common/button'

import { connect } from 'react-redux'
import { navigate } from '../../slices/navigation'

import { Containers } from '../../styles'
import { shared } from '../../i18n/en/labels'

const NoData = ({ navigate }) => {
  return (
    <View style={styles.container}>
      <AppText>{shared.noDataWarning}</AppText>
      <Button isCTA onPress={() => {navigate('CycleDay')}}>
        {shared.noDataButtonText}
      </Button>
    </View>
  )
}

NoData.propTypes = {
  navigate: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    ...Containers.centerItems
  }
})

const mapDispatchToProps = (dispatch) => {
  return({
    navigate: (page) => dispatch(navigate(page)),
  })
}

export default connect(
  null,
  mapDispatchToProps,
)(NoData)