import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import AppText from '../common/app-text'

import { connect } from 'react-redux'
import { navigate } from '../../slices/navigation'

import { Colors, Fonts, Sizes } from '../../styles'

const Logo = ({ navigate }) => {
  return (
    <TouchableOpacity onPress={() => navigate('Home')}>
      <AppText style={styles.logo}>drip.</AppText>
    </TouchableOpacity>
  )
}

Logo.propTypes = {
  navigate: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  logo: {
    color: Colors.turquoiseDark,
    fontFamily: Fonts.bold,
    fontSize: Sizes.title,
  },
})

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (page) => dispatch(navigate(page)),
  }
}

export default connect(null, mapDispatchToProps)(Logo)
