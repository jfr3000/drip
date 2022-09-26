import React from 'react'
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import PropTypes from 'prop-types'

import CloseIcon from './close-icon'

import { Sizes, Spacing } from '../../styles'

const AppModal = ({ children, onClose }) => (
  <Modal
    animationType="fade"
    onRequestClose={onClose}
    transparent={true}
    visible={true}
  >
    <TouchableOpacity onPress={onClose} style={styles.blackBackground} />
    <View style={styles.modalWindow}>
      <View style={styles.headerContainer}>
        <CloseIcon onClose={onClose} />
      </View>
      {children}
    </View>
  </Modal>
)

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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: Spacing.base,
    paddingHorizontal: Spacing.base,
    position: 'absolute',
    width: '100%',
    zIndex: 3, // works on ios
    elevation: 3, // works on android
  },
  modalWindow: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: Sizes.huge * 2,
    paddingVertical: Spacing.large * 2,
    position: 'absolute',
    maxHeight: Dimensions.get('window').height * 0.7,
    zIndex: 2, // works on ios
    elevation: 2, // works on android
    minWidth: '80%',
  },
})

export default AppModal
