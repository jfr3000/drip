import React from 'react'
import { Modal, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

const AppModal = ({ children, onClose }) => {
  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      transparent={true}
      visible={true}
    >
      <TouchableOpacity onPress={onClose} style={styles.blackBackground} />
      {children}
    </Modal>
  )
}

AppModal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
}

const styles = StyleSheet.create({
  blackBackground: {
    backgroundColor: 'black',
    flex: 1,
    opacity: 0.5,
  },
})

export default AppModal
