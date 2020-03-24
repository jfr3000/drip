import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import AppIcon from '../common/app-icon'
import AppText from '../common/app-text'
import Segment from '../common/segment'

import { connect } from 'react-redux'
import { navigate } from '../../slices/navigation'

import { Colors, Containers, Sizes } from '../../styles/redesign'

const MenuItem = ({ item, last, navigate }) => {
  return (
    <Segment last={last}>
      <TouchableOpacity
        style={styles.container}
        key={item.name}
        onPress={() => navigate(item.component)}
      >
        <View>
          <AppText style={styles.title}>{item.name}</AppText>
          {item.text.length > 0 && <AppText>{item.text}</AppText>}
        </View>
        <AppIcon name='chevron-right' color={Colors.orange}/>
      </TouchableOpacity>
    </Segment>
  )
}

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  last: PropTypes.bool.isRequired,
  navigate: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    ...Containers.rowContainer
  },
  title: {
    color: Colors.purple,
    fontSize: Sizes.subtitle
  }
})

const mapDispatchToProps = (dispatch) => {
  return({
    navigate: (page) => dispatch(navigate(page)),
  })
}

export default connect(
  null,
  mapDispatchToProps
)(MenuItem)